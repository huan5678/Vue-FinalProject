<script>
import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';
// import useStore from '@/stores';
import TheHero from '@/components/TheHero.vue';
import TheContact from '@/components/TheContact.vue';

export default {
  components: {
    TheHero,
    TheContact,
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
  <TheContact />
</template>
