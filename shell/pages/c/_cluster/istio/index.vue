<script>
import { mapGetters } from 'vuex';
import { SERVICE } from '@shell/config/types';
import Loading from '@shell/components/Loading';
export default {
  components: { Loading },

  async fetch() {
    try {
      this.kialiService = await this.$store.dispatch('cluster/find', { type: SERVICE, id: 'istio-system/kiali' });
    } catch {}
    try {
      this.jaegerService = await this.$store.dispatch('cluster/find', { type: SERVICE, id: 'istio-system/tracing' });
    } catch {}
  },

  data() {
    return { kialiService: null, jaegerService: null };
  },

  computed: {
    ...mapGetters({ theme: 'prefs/theme', t: 'i18n/t' }),

    kialiLogo() {
      // @TODO move to theme css
      return require(`~shell/assets/images/vendor/kiali.svg`);
    },

    kialiUrl() {
      return this.kialiService ? this.kialiService.proxyUrl('http', '20001') : null;
    },

    jaegerLogo() {
      return require(`~shell/assets/images/vendor/jaeger.svg`);
    },

    jaegerUrl() {
      return this.jaegerService ? `${ this.jaegerService.proxyUrl('http', '16686') }/jaeger/search` : null;
    },

    monitoringUrl() {
      return this.$router.resolve({
        name:   'c-cluster-monitoring',
        params: { cluster: this.$route.params.cluster }
      }).href;
    },

    target() {
      return '_blank';
    },

    rel() {
      return 'noopener noreferrer nofollow';
    },
  },

  methods: {
    launchKiali(e) {
      // rancher-monitoring link in Kiali description was clicked
      if (e.srcElement?.tagName === 'A') {
        return;
      }
      this.$refs.kiali.click();
    },
  },
};
</script>

<template>
  <Loading v-if="$fetchState.pending" />
  <div v-else>
    <h1>Overview</h1>
    <h4 v-clean-html="t('istio.poweredBy', {}, true)" />
    <div class="links">
      <div
        :class="{'disabled':!kialiUrl}"
        class="box link-container"
      >
        <span
          class="link-content pull-right"
          @click="launchKiali"
        >
          <div class="link-logo">
            <img :src="kialiLogo">
          </div>
          <div class="link-content">
            <a
              ref="kiali"
              :disabled="!kialiUrl ? true : null"
              :href="kialiUrl"
              :target="target"
              :rel="rel"
              @click.stop
            >
              <t k="istio.links.kiali.label" />
              <i class="icon icon-external-link pull-right" />
            </a>
            <hr role="none">
            <div class="description">
              <span v-clean-html="t('istio.links.kiali.description', {link: monitoringUrl}, true)" />
            </div>
          </div>
        </span>
        <div
          v-if="!kialiUrl"
          class="disabled-msg"
        >
          <span v-clean-html="t('istio.links.disabled', {app: 'Kiali'})" />
        </div>
      </div>
      <div
        :class="{'disabled':!jaegerUrl}"
        class="box link-container"
      >
        <span
          class="link-content pull-right"
          @click="$refs.jaeger.click()"
        >
          <div class="link-logo">
            <img :src="jaegerLogo">
          </div>
          <div class="link-content">
            <a
              ref="jaeger"
              :disabled="!jaegerUrl ? true : null"
              :href="jaegerUrl"
              :target="target"
              :rel="rel"
              @click.stop
            >
              <t k="istio.links.jaeger.label" />
              <i class="icon icon-external-link pull-right" />
            </a>
            <hr role="none">
            <div class="description">
              <span v-clean-html="t('istio.links.jaeger.description', true)" />
            </div>
          </div>
        </span>
        <div
          v-if="!jaegerUrl"
          class="disabled-msg"
        >
          <span v-clean-html="t('istio.links.disabled', {app: 'Jaeger'})" />
        </div>
      </div>
    </div>
  </div>
</template>
