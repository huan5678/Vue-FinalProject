<script>
import TheHeader from '@/components/TheHeader.vue';
import { onBeforeMount } from 'vue';
import useStore from '@/stores';

export default {
  name: 'BackEndView',
  components: { TheHeader },
  setup() {
    const { adminStore } = useStore();
    const { handleCheckUser, handleGetToken } = adminStore;

    onBeforeMount(() => {
      handleGetToken();
      handleCheckUser();
    });
  },
};
</script>
<template>
  <TheHeader />
    <router-view v-slot="{ Component }">
      <transition name="fade">
          <component :is="Component" />
      </transition>
    </router-view>
</template>
