<script>
import { SECRET_TYPES as TYPES } from '@shell/config/secret';
import { MANAGEMENT, NAMESPACE, DEFAULT_WORKSPACE } from '@shell/config/types';
import CreateEditView from '@shell/mixins/create-edit-view';
import NameNsDescription from '@shell/components/form/NameNsDescription';
import { LabeledInput } from '@components/Form/LabeledInput';
import LabeledSelect from '@shell/components/form/LabeledSelect';
import CruResource from '@shell/components/CruResource';
import {
  CLOUD_CREDENTIAL, _CLONE, _CREATE, _EDIT, _FLAGGED
} from '@shell/config/query-params';
import Loading from '@shell/components/Loading';
import Tabbed from '@shell/components/Tabbed';
import Tab from '@shell/components/Tabbed/Tab';
import Labels from '@shell/components/form/Labels';
import { HIDE_SENSITIVE } from '@shell/store/prefs';
import { CAPI } from '@shell/config/labels-annotations';
import { clear, uniq } from '@shell/utils/array';
import { NAME as MANAGER } from '@shell/config/product/manager';
import SelectIconGrid from '@shell/components/SelectIconGrid';
import { sortBy } from '@shell/utils/sort';
import { ucFirst } from '@shell/utils/string';

const creatableTypes = [
  TYPES.OPAQUE,
  TYPES.DOCKER_JSON,
  TYPES.TLS,
  TYPES.SSH,
  TYPES.BASIC,
];

export default {
  name: 'CruSecret',

  emits: ['set-subtype', 'input'],

  components: {
    LabeledInput,
    LabeledSelect,
    Loading,
    NameNsDescription,
    CruResource,
    Tabbed,
    Tab,
    Labels,
    SelectIconGrid
  },

  mixins: [CreateEditView],

  async fetch() {
    if ( this.isCloud ) {
      this.nodeDrivers = await this.$store.dispatch('management/findAll', { type: MANAGEMENT.NODE_DRIVER });
    }
  },

  data() {
    const newCloudCred = this.$route.query[CLOUD_CREDENTIAL] === _FLAGGED;
    const editCloudCred = this.mode === _EDIT && this.value._type === TYPES.CLOUD_CREDENTIAL;
    const cloneCloudCred = this.realMode === _CLONE && this.liveValue._type === TYPES.CLOUD_CREDENTIAL;
    const isCloud = newCloudCred || editCloudCred || cloneCloudCred;

    if ( newCloudCred ) {
      this.value.metadata.namespace = DEFAULT_WORKSPACE;

      this.value.metadata['name'] = '';

      this.value['data'] = {};
    }

    const secretTypes = [
      {
        label: 'Custom',
        value: 'custom'
      },
      {
        label:    'divider',
        disabled: true,
        kind:     'divider'
      }
    ];

    Object.values(TYPES).forEach((t) => {
      secretTypes.push({
        label: t,
        value: t
      });
    });

    return {
      isCloud,
      nodeDrivers:       null,
      secretTypes,
      secretType:        this.value._type,
      initialSecretType: this.value._type
    };
  },

  computed: {
    isCustomSecretCreate() {
      return this.mode === _CREATE && this.$route.query.type === 'custom';
    },
    showCustomSecretType() {
      return this.secretType === 'custom';
    },
    typeKey() {
      if ( this.isCloud ) {
        return 'cloud';
      }

      switch ( this.value._type ) {
      case TYPES.TLS: return 'tls';
      case TYPES.BASIC: return 'basic';
      case TYPES.DOCKER_JSON: return 'registry';
      case TYPES.SSH: return 'ssh';
      }

      return 'generic';
    },

    dataComponent() {
      return require(`@shell/edit/secret/${ this.typeKey }`).default;
    },

    driverName() {
      const driver = this.value.metadata?.annotations?.[CAPI.CREDENTIAL_DRIVER];

      return driver;
    },

    cloudComponent() {
      if (this.$store.getters['type-map/hasCustomCloudCredentialComponent'](this.driverName)) {
        return this.$store.getters['type-map/importCloudCredential'](this.driverName);
      }

      return this.$store.getters['type-map/importCloudCredential']('generic');
    },

    // array of id, label, description, initials for type selection step
    secretSubTypes() {
      const out = [];

      // Cloud credentials
      if ( this.isCloud ) {
        const machineTypes = uniq(this.nodeDrivers
          .filter((x) => x.spec.active)
          .map((x) => x.spec.displayName || x.id)
          .map((x) => this.$store.getters['plugins/credentialDriverFor'](x))
        );

        for ( const id of machineTypes ) {
          let bannerImage, bannerAbbrv;

          try {
            bannerImage = require(`~shell/assets/images/providers/${ id }.svg`);
          } catch (e) {
            bannerImage = null;
            bannerAbbrv = this.initialDisplayFor(id);
          }

          out.push({
            id,
            label: this.typeDisplay(CAPI.CREDENTIAL_DRIVER, id),
            bannerImage,
            bannerAbbrv
          });
        }
      } else {
        // Other kinds
        for ( const id of creatableTypes ) {
          out.push({
            id,
            label:       this.typeDisplay(id),
            bannerAbbrv: this.initialDisplayFor(id),
            description: this.t(`secret.typeDescriptions.'${ id }'.description`),
            docLink:     this.t(`secret.typeDescriptions.'${ id }'.docLink`)
          });
        }

        out.push({
          id:          'custom',
          label:       this.t('secret.customType'),
          bannerAbbrv: this.initialDisplayFor('custom'),
          description: this.t('secret.typeDescriptions.custom.description')
        });
      }

      return sortBy(out, 'label');
    },

    namespaces() {
      return this.$store.getters['cluster/all'](NAMESPACE).map((obj) => {
        return {
          label: obj.nameDisplay,
          value: obj.id,
        };
      });
    },

    hideSensitiveData() {
      return this.$store.getters['prefs/get'](HIDE_SENSITIVE);
    },

    dataLabel() {
      switch (this.value._type) {
      case TYPES.TLS:
        return this.t('secret.certificate.certificate');
      case TYPES.SSH:
        return this.value.supportsSshKnownHosts ? this.t('secret.ssh.keysAndHosts') : this.t('secret.ssh.keys');
      case TYPES.BASIC:
        return this.t('secret.authentication');
      default:
        return this.t('secret.data');
      }
    },

    doneRoute() {
      if ( this.$store.getters['currentProduct'].name === MANAGER ) {
        return 'c-cluster-manager-secret';
      } else {
        return 'c-cluster-product-resource';
      }
    },
  },

  methods: {
    async saveSecret(btnCb) {
      if ( this.errors ) {
        clear(this.errors);
      }

      if ( typeof this.$refs.cloudComponent?.test === 'function' ) {
        try {
          const res = await this.$refs.cloudComponent.test();

          if ( !res || res?.errors) {
            if (res?.errors) {
              this.errors = res.errors;
            } else {
              this.errors = ['Authentication test failed, please check your credentials'];
            }
            btnCb(false);

            return;
          }
        } catch (e) {
          this.errors = [e];
          btnCb(false);

          return;
        }
      }

      return this.save(btnCb);
    },

    selectType(type) {
      let driver;

      if ( this.isCloud ) {
        if ( type === TYPES.CLOUD_CREDENTIAL ) {
          // Clone goes through here
          driver = this.driverName;
        } else {
          driver = type;
          type = TYPES.CLOUD_CREDENTIAL;
        }

        if ( this.mode === _CREATE ) {
          this.value.setAnnotation(CAPI.CREDENTIAL_DRIVER, driver);
        }
      }

      this.value['_type'] = type;
      this.$emit('set-subtype', this.typeDisplay(type, driver));

      this.secretType = type;

      if (this.mode === _CREATE && type === 'custom') {
        this.value['_type'] = '';
      }
    },

    typeDisplay(type, driver) {
      if ( type === CAPI.CREDENTIAL_DRIVER ) {
        return this.$store.getters['i18n/withFallback'](`cluster.provider."${ driver }"`, null, driver);
      } else {
        const fallback = type.replace(/^kubernetes.io\//, '');

        return this.$store.getters['i18n/withFallback'](`secret.types."${ type }"`, null, fallback);
      }
    },

    initialDisplayFor(type) {
      const fallback = (ucFirst(this.typeDisplay(type) || '').replace(/[^A-Z]/g, '') || type).substr(0, 3);

      return this.$store.getters['i18n/withFallback'](`secret.initials."${ type }"`, null, fallback);
    },

    selectCustomType(type) {
      if (type !== 'custom') {
        this.value['_type'] = type;
      }
    }
  },
};
</script>

<template>
  <form class="filled-height">
    <Loading v-if="$fetchState.pending" />
    <CruResource
      v-else
      :mode="mode"
      :validation-passed="true"
      :selected-subtype="value._type"
      :resource="value"
      :errors="errors"
      :done-route="doneRoute"
      :subtypes="secretSubTypes"
      @finish="saveSecret"
      @select-type="selectType"
      @error="e=>errors = e"
    >
      <NameNsDescription
        :value="value"
        :mode="mode"
        :namespaced="!isCloud"
        @update:value="$emit('input', $event)"
      />

      <div
        v-if="isCustomSecretCreate"
        class="row"
      >
        <div class="col span-3">
          <LabeledSelect
            v-model:value="secretType"
            :options="secretTypes"
            :searchable="false"
            :mode="mode"
            :multiple="false"
            :reduce="(e) => e.value"
            label-key="secret.type"
            required
            @update:value="selectCustomType"
          />
        </div>

        <div class="col span-3">
          <LabeledInput
            v-if="showCustomSecretType"
            ref="customType"
            v-model:value="value._type"
            v-focus
            label-key="secret.customType"
            :mode="mode"
            required
          />
        </div>
      </div>

      <div class="spacer" />
      <component
        :is="cloudComponent"
        v-if="isCloud"
        ref="cloudComponent"
        :driver-name="driverName"
        :value="value"
        :mode="mode"
        :hide-sensitive-data="hideSensitiveData"
      />
      <Tabbed
        v-else
        :side-tabs="true"
        :use-hash="useTabbedHash"
        default-tab="data"
      >
        <Tab
          name="data"
          :label="dataLabel"
          :weight="99"
        >
          <component
            :is="dataComponent"
            :value="value"
            :mode="mode"
            :hide-sensitive-data="hideSensitiveData"
          />
        </Tab>
        <Tab
          name="labels"
          label-key="generic.labelsAndAnnotations"
          :weight="-1"
        >
          <Labels
            :value="value"
            :mode="mode"
            @update:value="$emit('input', $event)"
          />
        </Tab>
      </Tabbed>
    </CruResource>
  </form>
</template>

<style lang='scss'>
</style>
