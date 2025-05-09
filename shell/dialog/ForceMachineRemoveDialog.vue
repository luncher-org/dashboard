<script>
import { mapGetters } from 'vuex';
import { exceptionToErrorsArray } from '@shell/utils/error';
import { alternateLabel } from '@shell/utils/platform';
import AsyncButton from '@shell/components/AsyncButton';
import { Banner } from '@components/Banner';
import { Card } from '@components/Card';
import CopyToClipboardText from '@shell/components/CopyToClipboardText';

export default {
  emits: ['close'],

  components: {
    AsyncButton,
    Banner,
    Card,
    CopyToClipboardText
  },

  props: {
    machine: {
      type:    Object,
      default: () => {
        return {};
      }
    }
  },

  data() {
    return { errors: [], confirmName: '' };
  },

  computed: {
    ...mapGetters({ t: 'i18n/t' }),

    nameToMatch() {
      return this.machine?.spec?.infrastructureRef?.name;
    },

    deleteDisabled() {
      const confirmFailed = this.confirmName !== this.nameToMatch;

      return this.preventDelete || confirmFailed;
    },

    protip() {
      return this.t('promptRemove.protip', { alternateLabel });
    },
  },

  methods: {
    close() {
      this.confirmName = '';
      this.errors = [];
      this.$emit('close');
    },

    async remove(buttonDone) {
      try {
        await this.machine.forceMachineRemove();
        buttonDone(true);
        this.close();
      } catch (e) {
        this.errors = exceptionToErrorsArray(e);
        buttonDone(false);
      }
    }
  }
};
</script>

<template>
  <Card
    class="prompt-restore"
    :show-highlight-border="false"
  >
    <template #title>
      <h4 class="text-default-text">
        {{ t('promptForceRemove.modalTitle') }}
      </h4>
    </template>
    <template #body>
      <div class="pl-10 pr-10">
        <span
          v-clean-html="t('promptForceRemove.removeWarning', { nameToMatch }, true)"
        />
        <div class="mt-10 mb-10">
          {{ t('promptForceRemove.confirmName') }}
        </div>
        <div class="mb-10">
          <CopyToClipboardText
            :aria-label="t('promptForceRemove.ariaLabel')"
            :text="nameToMatch"
          />
        </div>
        <input
          id="confirm"
          v-model="confirmName"
          type="text"
        >
        <div class="text-info mt-20">
          {{ protip }}
        </div>
        <Banner
          v-for="(error, i) in errors"
          :key="i"
          class=""
          color="error"
          :label="error"
        />
      </div>
    </template>
    <template #actions>
      <button
        class="btn role-secondary mr-10"
        @click="close"
      >
        {{ t('generic.cancel') }}
      </button>
      <AsyncButton
        mode="delete"
        class="btn bg-error ml-10"
        :disabled="deleteDisabled"
        @click="remove"
      />
    </template>
  </Card>
</template>

<style lang='scss' scoped>
  .actions {
    text-align: right;
  }
</style>
