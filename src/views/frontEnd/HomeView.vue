<script>
import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';
// import useStore from '@/stores';
import TheHero from '@/components/TheHero.vue';

export default {
  components: {
    TheHero,
  },
  setup() {
    // const router = useRouter();

    // const {  } = useStore();

    onMounted(() => {});
    return {

    };
  },
};
</script>
<template>
  <TheHero />
</template>
