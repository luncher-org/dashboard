<script>
import { SNAPSHOT } from '@shell/config/types';
import AsyncButton from '@shell/components/AsyncButton';
import { Card } from '@components/Card';
import { Banner } from '@components/Banner';
import { exceptionToErrorsArray } from '@shell/utils/error';

import { sortBy } from '@shell/utils/sort';
import day from 'dayjs';
import { escapeHtml } from '@shell/utils/string';
import { DATE_FORMAT, TIME_FORMAT } from '@shell/store/prefs';
import { set } from '@shell/utils/object';

export default {
  emits: ['close'],

  components: {
    Card,
    AsyncButton,
    Banner,
  },

  props: {
    cluster: {
      type:    Object,
      default: () => {
        return {};
      }
    }
  },

  async fetch() {
    if (!this.$store.getters['isRancher']) {
      // This fetch function is getting snapshots, which are associated
      // with cluster manager. Rancher Desktop doesn't come with cluster
      // manager, so for Rancher Desktop we return nothing.
      return [];
    }

    const etcdBackups = await this.getEtcdBackups();

    if (etcdBackups.length > 0) {
      const backups = sortBy(etcdBackups, ['created']).reverse();
      const name = backups[0].id.split(':');
      const createdDate = backups[0].created;

      this.latestBackup = {
        name: name[0],
        date: this.getFormattedCreatedDate(createdDate)
      };
    }
  },

  data() {
    return { errors: [], latestBackup: null };
  },

  methods: {
    close(buttonDone) {
      if (buttonDone && typeof buttonDone === 'function') {
        buttonDone(true);
      }
      this.$emit('close');
    },

    async getEtcdBackups() {
      let etcdBackups = await this.$store.dispatch('management/findAll', { type: SNAPSHOT });

      etcdBackups = etcdBackups.filter((backup) => backup.clusterId === this.cluster.id);

      return etcdBackups;
    },

    getFormattedCreatedDate(createdDate) {
      const dateFormat = escapeHtml(this.$store.getters['prefs/get'](DATE_FORMAT));
      const timeFormat = escapeHtml( this.$store.getters['prefs/get'](TIME_FORMAT));
      const d = day(createdDate).format(dateFormat);
      const t = day(createdDate).format(timeFormat);

      return `${ d } ${ t }`;
    },

    async apply(buttonDone) {
      try {
        const currentGeneration = this.cluster.spec?.rkeConfig?.rotateEncryptionKeys?.generation || 0;

        // To rotate the encryption keys, increment
        // rkeConfig.rotateEncyrptionKeys.generation in the YAML.
        set(this.cluster, 'spec.rkeConfig.rotateEncryptionKeys.generation', currentGeneration + 1);
        await this.cluster.save();

        this.close(buttonDone);
      } catch (err) {
        this.errors = exceptionToErrorsArray(err);
        buttonDone(false);
      }
    }
  }
};
</script>

<template>
  <Card
    class="prompt-rotate"
    :show-highlight-border="false"
  >
    <template #title>
      <h4
        v-clean-html="t('promptRotateEncryptionKey.title')"
        class="text-default-text"
      />
    </template>

    <template #body>
      <div class="pl-10 pr-10">
        <Banner
          color="warning"
          label-key="promptRotateEncryptionKey.warning"
        />

        <div v-if="!$fetchState.pending">
          <p
            v-if="latestBackup"
            class="pt-10 pb-10"
          >
            {{ t('promptRotateEncryptionKey.description', latestBackup, true) }}
          </p>
          <Banner
            v-else
            color="error"
            label-key="promptRotateEncryptionKey.error"
          />
        </div>
      </div>
    </template>

    <template #actions>
      <div class="buttons">
        <button
          class="btn role-secondary mr-10"
          @click="close"
        >
          {{ t('generic.cancel') }}
        </button>

        <AsyncButton
          mode="rotate"
          :disabled="$fetchState.pending || !latestBackup"
          @click="apply"
        />

        <Banner
          v-for="(err, i) in errors"
          :key="i"
          color="error"
          :label="err"
        />
      </div>
    </template>
  </Card>
</template>
<style lang='scss' scoped>
  .prompt-rotate {
    margin: 0;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
</style>
