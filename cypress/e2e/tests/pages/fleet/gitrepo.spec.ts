import { FleetGitRepoListPagePo, FleetGitRepoCreateEditPo, FleetGitRepoDetailsPo } from '@/cypress/e2e/po/pages/fleet/fleet.cattle.io.gitrepo.po';
import { gitRepoCreateRequest, gitRepoTargetAllClustersRequest } from '@/cypress/e2e/blueprints/fleet/gitrepos';
import { generateFakeClusterDataAndIntercepts } from '@/cypress/e2e/blueprints/nav/fake-cluster';
import PreferencesPagePo from '@/cypress/e2e/po/pages/preferences.po';
import { EXTRA_LONG_TIMEOUT_OPT } from '@/cypress/support/utils/timeouts';
import { HeaderPo } from '@/cypress/e2e/po/components/header.po';
import 'cypress-real-events/support';

const fakeProvClusterId = 'some-fake-cluster-id';
const fakeMgmtClusterId = 'some-fake-mgmt-id';

describe('Git Repo', { testIsolation: 'off', tags: ['@fleet', '@adminUser'] }, () => {
  let adminUsername = '';
  let adminUserId = '';

  describe('Create', () => {
    const gitRepoListPage = new FleetGitRepoListPagePo();
    const gitRepoCreatePage = new FleetGitRepoCreateEditPo();
    const headerPo = new HeaderPo();
    const reposToDelete = [];

    before(() => {
      const repoInfo =
      {
        repoUrl: 'https://github.com/rancher/fleet-examples.git',
        branch:  'master',
        paths:   'simple'
      };

      cy.login();
      // create gitrepo in fleet-default
      cy.createE2EResourceName('git-repo').as('gitRepo');
      cy.get<string>('@gitRepo').then((name) => {
        cy.createRancherResource('v1', 'fleet.cattle.io.gitrepos', gitRepoTargetAllClustersRequest('fleet-default', name, repoInfo.repoUrl, repoInfo.branch, repoInfo.paths)).then(() => {
          reposToDelete.push(`fleet-default/${ name }`);
        });
      });
    });

    beforeEach(() => {
      cy.getRancherResource('v3', 'users?me=true').then((resp: Cypress.Response<any>) => {
        adminUserId = resp.body.data[0].id.trim();
        adminUsername = resp.body.data[0].username.trim();
      });

      cy.createE2EResourceName('git-repo').as('gitRepo');
    });

    it('Should be able to create a git repo', () => {
      // generate a fake cluster that can be usable in fleet
      generateFakeClusterDataAndIntercepts(fakeProvClusterId, fakeMgmtClusterId);

      cy.intercept('POST', '/v1/secrets/fleet-default').as('interceptSecret');
      cy.intercept('POST', '/v1/fleet.cattle.io.gitrepos').as('interceptGitRepo');
      cy.intercept('GET', '/v1/secrets?exclude=metadata.managedFields').as('getSecrets');

      gitRepoCreatePage.goTo();
      gitRepoCreatePage.waitForPage();

      const { name } = gitRepoCreateRequest.metadata;
      const {
        repo, branch, paths, helmRepoURLRegex
      } = gitRepoCreateRequest.spec;

      headerPo.selectWorkspace('fleet-default');

      // Metadata step
      gitRepoCreatePage.resourceDetail().createEditView().nameNsDescription()
        .name()
        .set(name);
      gitRepoCreatePage.resourceDetail().createEditView().nextPage();

      // Repository details step
      gitRepoCreatePage.setGitRepoUrl(repo);
      gitRepoCreatePage.setBranchName(branch);
      gitRepoCreatePage.gitRepoPaths().setValueAtIndex(paths[0], 0, 'Add Path');

      gitRepoCreatePage.resourceDetail().createEditView().nextPage();

      // Target info step
      gitRepoCreatePage.targetCluster().toggle();
      gitRepoCreatePage.targetCluster().clickOption(6);

      gitRepoCreatePage.resourceDetail().createEditView().nextPage();

      // Advanced info step
      gitRepoCreatePage.gitAuthSelectOrCreate().createSSHAuth('test1', 'test1', 'KNOWN_HOSTS');
      gitRepoCreatePage.helmAuthSelectOrCreate().createBasicAuth('test', 'test');
      gitRepoCreatePage.setHelmRepoURLRegex(helmRepoURLRegex);
      // #Percy tests
      gitRepoCreatePage.displaySelfHealingInformationMessage();

      cy.percySnapshot('Self-Healing test');
      gitRepoCreatePage.displayAlwaysKeepInformationMessage();

      cy.percySnapshot('Always Keep Resource test');
      gitRepoCreatePage.displayPollingInvervalTimeInformationMessage();

      cy.percySnapshot('Polling Interval test');
      gitRepoCreatePage.setPollingInterval(13);

      cy.wait('@getSecrets', EXTRA_LONG_TIMEOUT_OPT).its('response.statusCode').should('eq', 200);

      gitRepoCreatePage.resourceDetail().createEditView().create()
        .then(() => {
          reposToDelete.push(`fleet-default/${ name }`);
        });

      let gitSecretName = '';
      let helmSecretName = '';

      // Intercept 2nd interceptSecret call - Git SSH secret creation, see https://docs.cypress.io/api/commands/intercept#Interception-lifecycle
      cy.wait('@interceptSecret').then(({ request, response }) => {
        gitSecretName = response.body.metadata.name;

        expect(request.body.metadata.labels).to.be.an('object').and.to.have.property('fleet.cattle.io/managed').that.equals('true');
        expect(response.statusCode).to.eq(201);
        expect(gitSecretName).not.to.eq('');
        expect(response.body.metadata.labels).to.be.an('object').and.to.have.property('fleet.cattle.io/managed').that.equals('true');
      });

      // Intercept 1st interceptSecret call - Helm secret creation see https://docs.cypress.io/api/commands/intercept#Interception-lifecycle
      cy.wait('@interceptSecret').then(({ request, response }) => {
        helmSecretName = response.body.metadata.name;

        expect(request.body.metadata.labels).to.be.an('object').and.to.have.property('fleet.cattle.io/managed').that.equals('true');
        expect(response.statusCode).to.eq(201);
        expect(helmSecretName).not.to.eq('');
        expect(response.body.metadata.labels).to.be.an('object').and.to.have.property('fleet.cattle.io/managed').that.equals('true');
      });

      cy.wait('@interceptGitRepo').then(({ request, response }) => {
        gitRepoCreateRequest.metadata.labels['fleet.cattle.io/created-by-display-name'] = adminUsername;
        gitRepoCreateRequest.metadata.labels['fleet.cattle.io/created-by-user-id'] = adminUserId;
        gitRepoCreateRequest.spec.helmSecretName = helmSecretName;
        gitRepoCreateRequest.spec.clientSecretName = gitSecretName; // Git SSH credentials
        gitRepoCreateRequest.spec.pollingInterval = '13s';

        expect(response.statusCode).to.eq(201);
        expect(request.body).to.deep.eq(gitRepoCreateRequest);

        gitRepoListPage.waitForPage();

        const prefPage = new PreferencesPagePo();

        // START TESTING https://github.com/rancher/dashboard/issues/9984
        // change language to chinese
        prefPage.goTo();
        prefPage.languageDropdownMenu().checkVisible();
        prefPage.languageDropdownMenu().toggle();
        prefPage.languageDropdownMenu().isOpened();

        cy.intercept({
          method: 'PUT', url: 'v1/userpreferences/*', times: 1
        }).as(`prefUpdateZhHans`);
        prefPage.languageDropdownMenu().clickOption(2);
        cy.wait('@prefUpdateZhHans').then(({ response }) => {
          expect(response?.statusCode).to.eq(200);
          expect(response?.body.data).to.have.property('locale', 'zh-hans');
        });
        prefPage.languageDropdownMenu().isClosed();

        gitRepoListPage.goTo();
        gitRepoListPage.waitForPage();
        gitRepoListPage.list().resourceTable().checkVisible();
        gitRepoListPage.list().resourceTable().sortableTable()
          .checkVisible();
        gitRepoListPage.list().resourceTable().sortableTable()
          .checkLoadingIndicatorNotVisible();
        gitRepoListPage.list().resourceTable().sortableTable()
          .noRowsShouldNotExist();

        // TESTING https://github.com/rancher/dashboard/issues/9984 make sure details page loads fine
        gitRepoListPage.goToDetailsPage('fleet-e2e-test-gitrepo');
        gitRepoCreatePage.mastheadTitle().then((title) => {
          expect(title.replace(/\s+/g, ' ')).to.contain('Git 仓库: fleet-e2e-test-gitrepo');
        });
        // https://github.com/rancher/dashboard/issues/9984 reset lang to EN so that delete action can be performed
        prefPage.goTo();
        prefPage.languageDropdownMenu().checkVisible();
        prefPage.languageDropdownMenu().toggle();
        prefPage.languageDropdownMenu().isOpened();

        cy.intercept('PUT', 'v1/userpreferences/*').as(`prefUpdateEnUs`);
        prefPage.languageDropdownMenu().clickOptionWithLabel('English');
        cy.wait('@prefUpdateEnUs').then(({ response }) => {
          expect(response?.statusCode).to.eq(200);
          expect(response?.body.data).to.have.property('locale', 'en-us'); // Flake: This can sometimes be zh-hans.....?!
        });
        prefPage.languageDropdownMenu().isClosed();
      });
    });

    it('check table headers are available in list and details view', { tags: ['@vai', '@adminUser'] }, function() {
      const workspace = 'fleet-default';

      // go to fleet gitrepo
      gitRepoListPage.goTo();
      gitRepoListPage.waitForPage();
      headerPo.selectWorkspace(workspace);

      // check table headers
      const expectedHeadersListView = ['State', 'Name', 'Repo', 'Target', 'Clusters Ready', 'Resources', 'Age'];

      gitRepoListPage.list().resourceTable().sortableTable()
        .tableHeaderRow()
        .within('.table-header-container .content')
        .each((el, i) => {
          expect(el.text().trim()).to.eq(expectedHeadersListView[i]);
        });

      // go to fleet gitrepo details
      gitRepoListPage.goToDetailsPage(this.gitRepo);

      const gitRepoDetails = new FleetGitRepoDetailsPo(workspace, this.gitRepo);

      gitRepoDetails.waitForPage(null, 'bundles');

      // check table headers
      const expectedHeadersDetailsView = ['State', 'Name', 'Deployments', 'Last Updated', 'Date'];

      gitRepoDetails.bundlesList().sortableTable()
        .tableHeaderRow()
        .within('.table-header-container .content')
        .each((el, i) => {
          expect(el.text().trim()).to.eq(expectedHeadersDetailsView[i]);
        });
    });

    it('check all tabs are available in the details view', function() {
      // testing https://github.com/rancher/dashboard/issues/11155

      const workspace = 'fleet-default';

      const gitRepoDetails = new FleetGitRepoDetailsPo(workspace, this.gitRepo);

      gitRepoListPage.goTo();
      gitRepoListPage.waitForPage();
      headerPo.selectWorkspace(workspace);
      gitRepoListPage.goToDetailsPage(this.gitRepo);
      gitRepoDetails.waitForPage(null, 'bundles');
      gitRepoDetails.gitRepoTabs().allTabs().should('have.length', 4, { timeout: 10000 });
      const tabs = ['Bundles', 'Resources', 'Conditions', 'Recent Events'];

      gitRepoDetails.gitRepoTabs().tabNames().each((el, i) => {
        expect(el).to.eq(tabs[i]);
      });
    });

    // disabling test until it can be updated to account for a fleet change:
    //   - This test creates repos in the fleet-local workspace to test bundles in the upstream cluster
    //   - These bundles never successfully deployed given the fleet-agent failed to deploy (given the server-url in tests is localhost)
    //   - They passed before because fleet reported gitrepo status.resources for bundles that failed to deploy, now it does not and the test fails
    // testing https://github.com/rancher/dashboard/issues/9866
    // it('in git repo details view we should display the correct bundle count', () => {
    //   const basicRepos = [
    //     {
    //       name:   'e2e-git-repo1-test-bundle-count',
    //       repo:   'https://github.com/rancher/fleet-examples.git',
    //       branch: 'master',
    //       path:   'simple'
    //     },
    //     {
    //       name:   'e2e-git-repo2-test-bundle-count',
    //       repo:   'https://github.com/rancher/fleet-examples.git',
    //       branch: 'master',
    //       path:   'single-cluster/helm'
    //     }
    //   ];
    //   const workspace = 'fleet-local';

    //   // generate a fake cluster that can be usable in fleet
    //   generateFakeClusterDataAndIntercepts(fakeProvClusterId, fakeMgmtClusterId);

    //   // create first git-repo in fleet-local
    //   cy.createRancherResource('v1', 'fleet.cattle.io.gitrepos', gitRepoTargetAllClustersRequest(workspace, basicRepos[0].name, basicRepos[0].repo, basicRepos[0].branch, basicRepos[0].path)).then(() => {
    //     reposToDelete.push(`fleet-local/${ basicRepos[0].name }`);
    //   });

    //   // create second git-repo in fleet-local
    //   cy.createRancherResource('v1', 'fleet.cattle.io.gitrepos', gitRepoTargetAllClustersRequest(workspace, basicRepos[1].name, basicRepos[1].repo, basicRepos[1].branch, basicRepos[1].path)).then(() => {
    //     reposToDelete.push(`fleet-local/${ basicRepos[1].name }`);
    //   });

    //   // go to fleet gitrepo
    //   gitRepoListPage.goTo();
    //   gitRepoListPage.waitForPage();
    //   headerPo.selectWorkspace(workspace);

    //   gitRepoListPage.goToDetailsPage(basicRepos[1].name);

    //   const gitRepoDetails = new FleetGitRepoDetailsPo('fleet-local', basicRepos[1].name);

    //   gitRepoDetails.waitForPage();
    //   gitRepoDetails.gitRepoTabs().clickTabWithSelector('[data-testid="bundles"]');
    //   gitRepoDetails.bundlesCount().should('contain', '1');
    // });

    it('check if graph is visible', function() {
      const workspace = 'fleet-default';

      const gitRepoDetails = new FleetGitRepoDetailsPo(workspace, this.gitRepo);

      gitRepoListPage.goTo();
      gitRepoListPage.waitForPage();
      headerPo.selectWorkspace(workspace);
      gitRepoListPage.goToDetailsPage(this.gitRepo);

      gitRepoDetails.waitForPage(null, 'bundles');

      gitRepoDetails.showGraph();
      gitRepoDetails.graph().should('contain', this.gitRepo);
    });

    after(() => {
      reposToDelete.forEach((r) => cy.deleteRancherResource('v1', 'fleet.cattle.io.gitrepo', r));
    });
  });
});
