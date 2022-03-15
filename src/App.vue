<script>
import { ModalsContainer } from 'vue-final-modal';

export default {
  name: 'App',
  components: {
    ModalsContainer,
  },
  watch: {
    $route(to) {
      const nowTitle = `${to.meta.title}` || 'ChillBar 秋吧';
      document.title = nowTitle;
    },
  },
};
</script>
<template>
    <router-view />
    <modals-container></modals-container>
</template>
