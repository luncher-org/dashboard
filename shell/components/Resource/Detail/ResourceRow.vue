<script lang="ts">
import SubtleLink from '@shell/components/SubtleLink.vue';
import StateDot from '@shell/components/StateDot/index.vue';
import { StateColor } from '@shell/utils/style';
import { sortBy, sumBy } from 'lodash';
import { RouteLocationRaw } from 'vue-router';
import { computed } from 'vue';
import { useI18n } from '@shell/composables/useI18n';
import { useStore } from 'vuex';

export interface Count {
  label: string;
  count: number;
}

export interface Props {
  label: string;
  to?: RouteLocationRaw;
  color?: StateColor;
  counts?: Count[];
}

export function extractCounts(labels: string[]): Count[] {
  const accumulator: { [k: string]: number} = {};

  labels.forEach((l: string) => {
    accumulator[l] = accumulator[l] || 0;
    accumulator[l]++;
  });

  const counts: Count[] = Object.entries(accumulator).map(([label, count]) => ({ label, count }));

  return sortBy(counts, 'label');
}

</script>

<script setup lang="ts">
const {
  label, to, counts, color
} = defineProps<Props>();

const store = useStore();
const i18n = useI18n(store);

const displayCounts = computed(() => {
  if (!counts) {
    return counts;
  }

  if (counts.length < 3) {
    return counts;
  }

  const [first, ...rest] = counts;
  const otherCount = sumBy(rest, 'count');
  const other = {
    label: i18n.t('generic.other', { count: otherCount }),
    count: otherCount
  };

  return [
    first,
    other
  ];
});
</script>

<template>
  <div class="resource-row">
    <div class="left">
      <SubtleLink
        v-if="to && (counts && counts.length > 0)"
        :to="to"
      >
        {{ label }}
      </SubtleLink>
      <span
        v-else
        class="text-muted"
      >
        {{ label }}
      </span>
    </div>
    <div class="right">
      <div
        v-if="!counts || counts.length == 0"
        class="text-muted"
      >
        &mdash;
      </div>
      <div
        v-else
        class="counts"
      >
        <StateDot
          v-if="color"
          :color="color"
        />
        <span
          v-for="count in displayCounts"
          :key="count.label"
          class="count"
        >
          {{ count.count }} {{ count.label }}<span class="and">&nbsp;+&nbsp;</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resource-row {
    display: flex;
    flex-direction: row;
    align-items: center;

    .right {
      flex-grow: 1;
      text-align: right;
    }

    .counts {
      display: inline-flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }

    .count:last-of-type .and {
      display: none;
    }

    .state-dot {
      margin-right: 10px;
    }
}
</style>
