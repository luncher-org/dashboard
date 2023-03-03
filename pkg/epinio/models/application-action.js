import Resource from '@shell/plugins/dashboard-store/resource-class';
import Vue from 'vue';
import {
  APPLICATION_ACTION_STATE, APPLICATION_ENV_VAR, APPLICATION_MANIFEST_SOURCE_TYPE, APPLICATION_SOURCE_TYPE, EPINIO_PRODUCT_NAME
} from '../types';
import { epinioExceptionToErrorsArray } from '../utils/errors';

export const APPLICATION_ACTION_TYPE = {
  CREATE_NS:           'create_namespace',
  CREATE:              'create',
  UPDATE_SOURCE:       'updateSource',
  GIT_FETCH:           'gitFetch',
  UPLOAD:              'upload',
  BIND_CONFIGURATIONS: 'bind_configurations',
  BIND_SERVICES:       'bind_services',
  BUILD:               'build',
  DEPLOY:              'deploy',
};

export default class ApplicationActionResource extends Resource {
  // Props ---------------------------------------------------
  run = true;
  state = APPLICATION_ACTION_STATE.PENDING;

  // application; // : EpinioApplication;
  // bindings; // : EpinioAppBindings;
  // type; // : EPINIO_TYPES / string;

  get name() {
    return this.t(`epinio.applications.action.${ this.action }.label`);
  }

  get description() {
    return this.t(`epinio.applications.action.${ this.action }.description`);
  }

  get stateObj() {
    switch (this.state) {
    case APPLICATION_ACTION_STATE.SUCCESS:
      return {
        name:          'succeeded',
        error:         false,
        transitioning: false,
      };
    case APPLICATION_ACTION_STATE.RUNNING:
      return {
        name:          'pending',
        error:         false,
        transitioning: true,
      };
    case APPLICATION_ACTION_STATE.FAIL:
      return {
        name:          'fail',
        error:         true,
        transitioning: false,
        message:       this.stateMessage
      };
    case APPLICATION_ACTION_STATE.PENDING:
    default:
      return {
        name:          'pending',
        error:         false,
        transitioning: false,
      };
    }
  }

  // Private ---------------------------------------------------

  async innerExecute(params) {
    switch (this.action) {
    case APPLICATION_ACTION_TYPE.CREATE_NS:
      await this.createNamespace(params);
      break;
    case APPLICATION_ACTION_TYPE.CREATE:
      await this.create(params);
      break;
    case APPLICATION_ACTION_TYPE.UPDATE_SOURCE:
      await this.updateSource(params);
      break;
    case APPLICATION_ACTION_TYPE.BIND_CONFIGURATIONS:
      await this.bindConfigurations(params);
      break;
    case APPLICATION_ACTION_TYPE.BIND_SERVICES:
      await this.bindServices(params);
      break;
    case APPLICATION_ACTION_TYPE.GIT_FETCH:
      await this.gitFetch(params);
      break;
    case APPLICATION_ACTION_TYPE.UPLOAD:
      await this.upload(params);
      break;
    case APPLICATION_ACTION_TYPE.BUILD:
      await this.build(params);
      break;
    case APPLICATION_ACTION_TYPE.DEPLOY:
      await this.deploy(params);
      break;
    }
  }

  async createNamespace() {
    const ns = await this.$dispatch(`${ EPINIO_PRODUCT_NAME }/createNamespace`, { name: this.application.meta.namespace }, { root: true });

    await ns.create();
  }

  async create() {
    await this.application.create();
  }

  async bindConfigurations() {
    await this.application.updateConfigurations([], this.bindings.configurations);
  }

  async bindServices() {
    await this.application.updateServices([], this.bindings.services);
  }

  async upload({ source }) {
    await this.application.storeArchive(source.archive.tarball);
  }

  async gitFetch({ source }) {
    // Handle github & gitUrl sources
    const rev = !!source.github.commit ? source.github.commit : source.gitUrl.branch;
    const url = !!source.github.url ? source.github.url : source.gitUrl.url;

    return await this.application.gitFetch(url, rev);
  }

  async build({ source }) {
    const { stage } = await this.application.stage(this.application.buildCache.store.blobUid, source.builderImage.value);

    this.application.showStagingLog(stage.id);

    await this.application.waitForStaging(stage.id);
  }

  /**
   * Updates the application information
   * @param {*} params
   */
  async updateSource(params) {
    // // Filter out the EPINIO_APP_DATA env var if it's not a container image
    if (params.source.type !== 'git_hub') {
      this.application.configuration.environment = Object.keys(this.application.configuration.environment).reduce((acc, key) => {
        if (key !== 'EPINIO_APP_DATA') {
          acc[key] = this.application.configuration.environment[key];
        }

        return acc;
      }, {});
    } else {
      const githubEnvVar = {
        usernameOrOrg: params.source.github.usernameOrOrg,
        repo:          params.source.github.repo,
        branch:        params.source.github.branch,
      };

      this.application.configuration.environment = {
        ...this.application.configuration.environment,
        [APPLICATION_ENV_VAR]: JSON.stringify(githubEnvVar)
      };
    }

    await this.application.update();
  }

  async deploy({ source }) {
    const stageId = source.type === APPLICATION_SOURCE_TYPE.ARCHIVE ? this.application.buildCache.stage.stage.id : null;
    const image = source.type === APPLICATION_SOURCE_TYPE.CONTAINER_URL ? source.container.url : this.application.buildCache.stage.image;

    await this.application.deploy(stageId, image, this.createDeployOrigin(source));

    this.application.showAppLog();
  }

  createDeployOrigin(source) {
    switch (source.type) {
    case APPLICATION_SOURCE_TYPE.ARCHIVE:
    case APPLICATION_SOURCE_TYPE.FOLDER:
      return {
        kind: APPLICATION_MANIFEST_SOURCE_TYPE.PATH,
        path: source.archive.fileName
      };
    case APPLICATION_SOURCE_TYPE.CONTAINER_URL:
      return {
        kind:      APPLICATION_MANIFEST_SOURCE_TYPE.CONTAINER,
        container: source.container.url
      };
    case APPLICATION_SOURCE_TYPE.GIT_URL:
      return {
        kind: APPLICATION_MANIFEST_SOURCE_TYPE.GIT,
        git:  {
          revision:   source.gitUrl.branch,
          repository: source.gitUrl.url
        },
      };
    case APPLICATION_SOURCE_TYPE.GIT_HUB:
      return {
        kind: APPLICATION_MANIFEST_SOURCE_TYPE.GIT_HUB,
        git:  {
          revision:   source.github.commit,
          repository: source.github.url,
          branch:     source.github.branch
        },
      };
    }
  }

  // Public ---------------------------------------------------

  async execute(params) {
    try {
      Vue.set(this, 'state', APPLICATION_ACTION_STATE.RUNNING);

      await this.innerExecute(params);

      Vue.set(this, 'state', APPLICATION_ACTION_STATE.SUCCESS);
      Vue.set(this, 'run', false);
    } catch (err) {
      Vue.set(this, 'state', APPLICATION_ACTION_STATE.FAIL);
      Vue.set(this, 'stateMessage', epinioExceptionToErrorsArray(err)[0].toString());

      throw err;
    }
  }
}
