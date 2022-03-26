<script>
import TheHeader from '@/components/TheHeader.vue';
import { onMounted } from 'vue';
import useStore from '@/stores';

export default {
  name: 'BackEndView',
  components: { TheHeader },
  setup() {
    const { adminStore } = useStore();
    const { handleCheckUser, handleGetToken } = adminStore;

    onMounted(() => {
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
