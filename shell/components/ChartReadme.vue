<script>
import Markdown from '@shell/components/Markdown';

export default {
  components: { Markdown },
  props:      {
    versionInfo: {
      type:     Object,
      required: true
    },
    showAppReadme: {
      type:    Boolean,
      default: true
    },
    hideReadmeFirstTitle: {
      type:    Boolean,
      default: true
    }
  },
  data() {
    return {
      appReadmeLoaded: false,
      readmeLoaded:    false,
    };
  },
  computed: {
    appReadme() {
      return this.versionInfo?.appReadme || '';
    },
    readme() {
      return this.versionInfo?.readme || '';
    }
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="chart-readmes">
      <Markdown
        v-if="showAppReadme && appReadme"
        v-model:value="appReadme"
        :class="[hideReadmeFirstTitle ? 'hidden-first-title' : '', 'md', 'md-desc', 'mb-20']"
        @loaded="appReadmeLoaded = true"
      />
      <h1
        v-if="showAppReadme && appReadme && readme && appReadmeLoaded && readmeLoaded"
        class="pt-10"
      >
        {{ t('catalog.install.appReadmeTitle') }}
      </h1>
      <Markdown
        v-if="readme"
        v-model:value="readme"
        class="md md-desc"
        :class="[hideReadmeFirstTitle ? 'hidden-first-title' : '', 'md', 'md-desc']"
        @loaded="readmeLoaded = true"
      />
    </div>
    <div />
  </div>
</template>

<style lang="scss" scoped>
  .chart-readmes {
    & > h1 {
       border-top: var(--header-border-size) solid var(--header-border);
    }
  }
  .md {
    overflow: auto;
    max-width: 100%;
    line-height: 1.6;

    :deep() {
      * + H1,
      * + H2,
      * + H3,
      * + H4,
      * + H5,
      * + H6 {
        margin-top: 20px;
      }
    }

    :deep() code {
      font-size: 13.5px;
      white-space: break-spaces;
      word-wrap: break-word;
      padding-left: 5px;
      padding-right: 5px;
      border: 0;
    }

    :deep() pre {
      white-space: break-spaces;
      word-break: break-word;
    }

    :deep() p {
      margin-bottom: 0.5em;
    }
  }
  .hidden-first-title {
    :deep() > h1:first-of-type {
      display: none;
    }
  }

</style>
