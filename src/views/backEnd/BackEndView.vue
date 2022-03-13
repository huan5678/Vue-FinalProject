<script>
import TheHeader from '@/components/TheHeader.vue';
import { onBeforeMount, onMounted } from 'vue';
import useStore from '@/stores';
import { useRouter } from 'vue-router';

export default {
  name: 'BackEndView',
  components: { TheHeader },
  setup() {
    const { adminStore } = useStore();
    const { handleCheckUser, handleGetToken, isLoggedIn } = adminStore;
    const router = useRouter();

    onBeforeMount(() => {
      handleGetToken();
      handleCheckUser();
    });
    onMounted(() => {
      if (!isLoggedIn) {
        router.push('/login');
      }
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
