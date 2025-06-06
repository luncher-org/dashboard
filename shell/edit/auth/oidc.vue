<script>
import Loading from '@shell/components/Loading';
import CreateEditView from '@shell/mixins/create-edit-view';
import AuthConfig from '@shell/mixins/auth-config';
import CruResource from '@shell/components/CruResource';
import AllowedPrincipals from '@shell/components/auth/AllowedPrincipals';
import FileSelector from '@shell/components/form/FileSelector';
import { Banner } from '@components/Banner';
import AuthBanner from '@shell/components/auth/AuthBanner';
import AuthProviderWarningBanners from '@shell/edit/auth/AuthProviderWarningBanners';
import AdvancedSection from '@shell/components/AdvancedSection.vue';
import ArrayList from '@shell/components/form/ArrayList';
import { LabeledInput } from '@components/Form/LabeledInput';
import { RadioGroup } from '@components/Form/Radio';
import { Checkbox } from '@components/Form/Checkbox';
import { BASE_SCOPES } from '@shell/store/auth';
import CopyToClipboardText from '@shell/components/CopyToClipboardText.vue';

export default {
  components: {
    Banner,
    Loading,
    CruResource,
    AllowedPrincipals,
    FileSelector,
    AuthBanner,
    AuthProviderWarningBanners,
    AdvancedSection,
    ArrayList,
    LabeledInput,
    RadioGroup,
    Checkbox,
    CopyToClipboardText,
  },

  mixins: [CreateEditView, AuthConfig],

  data() {
    return {
      customEndpoint: {
        value:  false,
        labels: [
          this.t('authConfig.oidc.customEndpoint.standard'),
          this.t('authConfig.oidc.customEndpoint.custom'),
        ],
        options: [
          false,
          true
        ]
      },
      oidcUrls: {
        url:              null,
        realm:            null,
        jwksUrl:          null,
        tokenEndpoint:    null,
        userInfoEndpoint: null,
      },
      // TODO #13457: this is duplicated due wrong format
      oidcScope: []
    };
  },

  computed: {
    tArgs() {
      return {
        baseUrl:  this.serverSetting,
        provider: this.displayName,
        username: this.principal.loginName || this.principal.name,
      };
    },

    toSave() {
      return {
        enabled:    true,
        oidcConfig: this.model
      };
    },

    validationPassed() {
      if ( this.model.enabled && !this.editConfig ) {
        return true;
      }

      const { clientId, clientSecret } = this.model;
      const isMissingAuthEndpoint = (this.requiresAuthEndpoint && !this.model.authEndpoint);
      const isMissingScopes = !this.requiredScopes.every((scope) => this.oidcScope.includes(scope));

      if (isMissingAuthEndpoint || isMissingScopes) {
        return false;
      }

      if (this.isAmazonCognito) {
        const { issuer } = this.model;

        return !!(clientId && clientSecret && issuer);
      } else if ( !this.customEndpoint.value ) {
        const { url, realm } = this.oidcUrls;

        return !!(clientId && clientSecret && url && realm);
      } else {
        const { rancherUrl, issuer } = this.model;

        return !!(clientId && clientSecret && rancherUrl && issuer);
      }
    },

    requiresAuthEndpoint() {
      return ['genericoidc', 'keycloakoidc'].includes(this.model.id);
    },

    /**
     * TODO #13457: Refactor scopes to be an array of terms
     * Return valid scopes
     * The scopes for given auth provider (model.id) have format of ['scope1 scope2 scope3']
     */
    requiredScopes() {
      return this.model.id ? (BASE_SCOPES[this.model.id] || []) ? (BASE_SCOPES[this.model.id] || [])[0].split(' ') : [] : [];
    },

    requiresCert() {
      // We assume all do, apart from the ones here, which do not
      return !(['cognito'].includes(this.model.id));
    },

    supportsGroupSearch() {
      // We assume all do, apart from the ones here, which do not
      return !(['cognito'].includes(this.model.id));
    },

    isAmazonCognito() {
      return this.model?.id === 'cognito';
    }
  },

  watch: {
    'oidcUrls.url'() {
      this.updateEndpoints();
    },

    'oidcUrls.realm'() {
      this.updateEndpoints();
    },

    'model.enabled'(neu) {
      // TODO #13457: Refactor scopes to be an array of terms
      // Cover case where oidc gets disabled and we return to the edit screen with a reset model
      if (!neu) {
        this.oidcUrls = {
          url:              null,
          realm:            null,
          jwksUrl:          null,
          tokenEndpoint:    null,
          userInfoEndpoint: null,
        };
        this.customEndpoint.value = false;
        // TODO #13457: Refactor scopes to be an array of terms
        this.oidcScope = this.model?.scope?.split(' ');
      } else {
        // TODO #13457: Refactor scopes to be an array of terms
        this.oidcScope = this.model?.scope?.split(' ');
      }
    },

    editConfig(neu, old) {
      // Cover use case where user edits existing oidc (oidcUrls aren't persisted, so if we have issuer set custom endpoints to true)
      if (!old && neu) {
        this.customEndpoint.value = !this.oidcUrls.url && !!this.model.issuer;
      }
    }
  },

  methods: {
    updateEndpoints() {
      const isKeycloak = this.model.id === 'keycloakoidc';

      if (!this.oidcUrls.url) {
        this.model.issuer = '';
        if (isKeycloak) {
          this.model.authEndpoint = '';
        }

        return;
      }

      const url = this.oidcUrls.url.replaceAll(' ', '');
      const realmsPath = 'realms';

      this.model.issuer = `${ url }/${ realmsPath }/${ this.oidcUrls.realm || '' }`;

      if ( isKeycloak ) {
        this.model.authEndpoint = `${ this.model.issuer || '' }/protocol/openid-connect/auth`;
      }
    },

    updateScope() {
      this.model.scope = this.oidcScope.join(' ');
    }
  }
};
</script>

<template>
  <Loading v-if="$fetchState.pending" />
  <div v-else>
    <CruResource
      :cancel-event="true"
      :done-route="doneRoute"
      :mode="mode"
      :resource="model"
      :subtypes="[]"
      :validation-passed="validationPassed"
      :finish-button-mode="model.enabled ? 'edit' : 'enable'"
      :can-yaml="false"
      :errors="errors"
      :show-cancel="showCancel"
      @error="e=>errors = e"
      @finish="save"
      @cancel="cancel"
    >
      <template v-if="model.enabled && !isEnabling && !editConfig">
        <AuthBanner
          :t-args="tArgs"
          :disable="disable"
          :edit="goToEdit"
        >
          <template #rows>
            <tr><td>{{ t(`authConfig.oidc.rancherUrl`) }}: </td><td>{{ model.rancherUrl }}</td></tr>
            <tr><td>{{ t(`authConfig.oidc.clientId`) }}: </td><td>{{ model.clientId }}</td></tr>
            <tr><td>{{ t(`authConfig.oidc.issuer`) }}: </td><td>{{ model.issuer }}</td></tr>
            <tr v-if="model.authEndpoint">
              <td>{{ t(`authConfig.oidc.authEndpoint`) }}: </td><td>{{ model.authEndpoint }}</td>
            </tr>
          </template>
        </AuthBanner>

        <hr role="none">

        <AllowedPrincipals
          :provider="NAME"
          :auth-config="model"
          :mode="mode"
        />
      </template>

      <template v-else>
        <AuthProviderWarningBanners
          v-if="!model.enabled"
          :t-args="tArgs"
        />

        <h3>{{ t(`authConfig.oidc.${NAME}`) }}</h3>

        <Banner
          v-if="!model.enabled && isAmazonCognito"
          color="info"
          class="mb-20 mt-0"
          data-testid="oidc-cognito-banner"
        >
          <div>
            <div
              v-clean-html="t('authConfig.oidc.cognitoHelp', {}, true)"
            />
            <div class="mt-10">
              <CopyToClipboardText
                :plain="true"
                :text="model.rancherUrl"
              />
            </div>
          </div>
        </Banner>

        <!-- Auth credentials -->
        <div class="row mb-20">
          <div class="col span-6">
            <LabeledInput
              v-model:value="model.clientId"
              :label="t(`authConfig.oidc.clientId`)"
              :mode="mode"
              required
              data-testid="oidc-client-id"
            />
          </div>
          <div class="col span-6">
            <LabeledInput
              v-model:value="model.clientSecret"
              :label="t(`authConfig.oidc.clientSecret`)"
              :mode="mode"
              required
              data-testid="oidc-client-secret"
            />
          </div>
        </div>

        <!-- Key/Certificate -->
        <div
          v-if="requiresCert"
          class="row mb-20"
        >
          <div class="col span-6">
            <LabeledInput
              v-model:value="model.privateKey"
              :label="t(`authConfig.oidc.key.label`)"
              :placeholder="t(`authConfig.oidc.key.placeholder`)"
              :mode="mode"
              type="multiline"
            />
            <FileSelector
              class="role-tertiary add mt-5"
              :label="t('generic.readFromFile')"
              :mode="mode"
              @selected="model.privateKey = $event"
            />
          </div>
          <div class="col span-6">
            <LabeledInput
              v-model:value="model.certificate"
              :label="t(`authConfig.oidc.cert.label`)"
              :placeholder="t(`authConfig.oidc.cert.placeholder`)"
              :mode="mode"
              type="multiline"
            />
            <FileSelector
              class="role-tertiary add mt-5"
              :label="t('generic.readFromFile')"
              :mode="mode"
              @selected="model.certificate = $event"
            />
          </div>
        </div>

        <!-- Allow group search -->
        <div
          v-if="supportsGroupSearch"
          class="row mb-20"
        >
          <div class="col span-6">
            <Checkbox
              v-model:value="model.groupSearchEnabled"
              data-testid="input-group-search"
              :label="t('authConfig.oidc.groupSearch.label')"
              :tooltip="t('authConfig.oidc.groupSearch.tooltip')"
              :mode="mode"
            />
          </div>
        </div>

        <!-- Scopes -->
        <div class="row mb-20">
          <div class="col span-6">
            <ArrayList
              v-model:value="oidcScope"
              :mode="mode"
              :title="t('authConfig.oidc.scope.label')"
              :value-placeholder="t('authConfig.oidc.scope.placeholder')"
              :protip="t('authConfig.oidc.scope.protip', {}, true)"
              @update:value="updateScope"
            />
          </div>
        </div>

        <template v-if="!isAmazonCognito">
          <!-- Generated vs Specific Endpoints -->
          <div class="row mb-20">
            <div class="col span-6">
              <RadioGroup
                v-model:value="customEndpoint.value"
                name="customEndpoint"
                label-key="authConfig.oidc.customEndpoint.label"
                :labels="customEndpoint.labels"
                :options="customEndpoint.options"
                data-testid="oidc-custom-endpoint"
              >
                <template #label>
                  <h4>{{ t('authConfig.oidc.customEndpoint.label') }}</h4>
                </template>
              </RadioGroup>
            </div>
          </div>

          <!-- Generated endpoints -->
          <div class="row mb-20">
            <div class="col span-6">
              <LabeledInput
                v-model:value="oidcUrls.url"
                :label="t(`authConfig.oidc.url`)"
                :mode="mode"
                :required="!customEndpoint.value"
                :disabled="customEndpoint.value"
                data-testid="oidc-url"
              />
            </div>
            <div class="col span-6">
              <LabeledInput
                v-model:value="oidcUrls.realm"
                :label="t(`authConfig.oidc.realm`)"
                :mode="mode"
                :required="!customEndpoint.value"
                :disabled="customEndpoint.value"
                data-testid="oidc-realm"
              />
            </div>
          </div>

          <!-- Specific Endpoints -->
          <div class="row mb-20">
            <div class="col span-6">
              <LabeledInput
                v-model:value="model.rancherUrl"
                :label="t(`authConfig.oidc.rancherUrl`)"
                :mode="mode"
                required
                :disabled="!customEndpoint.value"
                data-testid="oidc-rancher-url"
              />
            </div>
          </div>

          <div class="row mb-20">
            <div class="col span-6">
              <LabeledInput
                v-model:value="model.issuer"
                :label="t(`authConfig.oidc.issuer`)"
                :mode="mode"
                required
                :disabled="!customEndpoint.value"
                data-testid="oidc-issuer"
              />
            </div>
            <div class="col span-6">
              <LabeledInput
                v-model:value="model.authEndpoint"
                :label="t(`authConfig.oidc.authEndpoint`)"
                :mode="mode"
                :disabled="!customEndpoint.value"
                :required="requiresAuthEndpoint"
                data-testid="oidc-auth-endpoint"
              />
            </div>
          </div>

          <!-- Advanced section -->
          <AdvancedSection :mode="mode">
            <div class="row mb-20">
              <div class="col span-6">
                <LabeledInput
                  v-model:value="model.jwksUrl"
                  :label="t(`authConfig.oidc.jwksUrl`)"
                  :mode="mode"
                  :disabled="!customEndpoint.value"
                />
              </div>
              <div class="col span-6">
                <LabeledInput
                  v-model:value="model.tokenEndpoint"
                  :label="t(`authConfig.oidc.tokenEndpoint`)"
                  :mode="mode"
                  :disabled="!customEndpoint.value"
                />
              </div>
            </div>

            <div class="row mb-20">
              <div class="col span-6">
                <LabeledInput
                  v-model:value="model.userInfoEndpoint"
                  :label="t(`authConfig.oidc.userInfoEndpoint`)"
                  :mode="mode"
                  :disabled="!customEndpoint.value"
                />
              </div>
              <div class="col span-6">
                <LabeledInput
                  v-model:value="model.acrValue"
                  :label="t(`authConfig.oidc.acrValue`)"
                  :mode="mode"
                  :disabled="!customEndpoint.value"
                />
              </div>
            </div>
          </AdvancedSection>
        </template>

        <template v-if="isAmazonCognito">
          <h3>{{ t(`authConfig.oidc.cognitoIssuer`) }}</h3>
          <div class="row mb-20">
            <div class="col span-6">
              <LabeledInput
                v-model:value="model.issuer"
                :label="t(`authConfig.oidc.issuer`)"
                :mode="mode"
                required
                data-testid="oidc-issuer"
              />
            </div>
          </div>
        </template>
      </template>
    </CruResource>
  </div>
</template>

<style lang="scss" scoped>
  .banner {
    display: block;

    &:deep() code {
      padding: 0 3px;
      margin: 0 3px;
    }
  }
</style>
