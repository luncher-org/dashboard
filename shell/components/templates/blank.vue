<script>
import Brand from '@shell/mixins/brand';
import Inactivity from '@shell/components/Inactivity';

export default {
  components: { Inactivity },
  mixins:     [Brand],
};
</script>

<template>
  <main
    class="main-layout"
    :aria-label="t('layouts.blank')"
  >
    <router-view :key="$route.path" />

    <Inactivity />
  </main>
</template>

<style lang="scss" scoped>
</style>
