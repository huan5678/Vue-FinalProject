<script>
import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';
// import useStore from '@/stores';
import TheHero from '@/components/TheHero.vue';
import TheContact from '@/components/TheContact.vue';
import TheFeatures from '@/components/TheFeatures.vue';
import WarningSign from '@/components/WarningSign.vue';

export default {
  components: {
    TheHero,
    TheContact,
    TheFeatures,
    WarningSign,
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
  <TheFeatures />
  <TheContact />
  <WarningSign />
</template>
