<script>
import heroBanner01 from '@/assets/heroBanner01.jpg';
import heroBanner02 from '@/assets/heroBanner02.jpg';
import heroBanner03 from '@/assets/heroBanner03.jpg';
import heroBanner04 from '@/assets/heroBanner04.jpg';
import BannerLogo from '@/components/BannerLogo.vue';
import { ref } from 'vue';

export default {
  components: {
    BannerLogo,
  },
  setup() {
    const Banners = ref([
      heroBanner01, heroBanner02, heroBanner03, heroBanner04,
    ]);
    const backgroundImg = ref('');

    return {
      backgroundImg,
      Banners,
    };
  },
};
</script>

<template>
  <section class="min-h-[90vh] relative">
    <div class="absolute w-full h-full
    bg-cover bg-center bg-no-repeat
    duration-1000 transition-all heroAnimate
    "
    v-for="img in Banners" :key="img"
    :style="{ backgroundImage: `url(${img})` }"></div>
    <div class="container flex justify-end items-center h-[90vh] bg-secondary-900/40">
      <h1 class="text-primary-600 text-6xl mr-12 relative">
        <BannerLogo
        class="absolute text-primary-500 top-0 left-0 -translate-x-1/2 -translate-y-full" />
        喝酒是一種最 <span class="font-serif text-7xl">Chill</span> 的態度
      </h1>
    </div>
  </section>
</template>
