<script>
import heroBanner01 from '@/assets/heroBanner01.jpg';
import heroBanner02 from '@/assets/heroBanner02.jpg';
import heroBanner03 from '@/assets/heroBanner03.jpg';
import heroBanner04 from '@/assets/heroBanner04.jpg';
import ScrollMouse from '@/components/ScrollMouse.vue';

import { ref } from 'vue';

export default {
  components: {
    ScrollMouse,
  },
  setup() {
    const Banners = ref([
      heroBanner01, heroBanner02, heroBanner03, heroBanner04,
    ]);
    const animationDuration = 20;

    const scroll = ref(false);
    const active = ref(0);
    const preActive = ref(0);

    window.addEventListener('scroll', () => {
      scroll.value = (window.scrollY > 0);
    });

    const animationCtrl = function (img) {
      return {
        backgroundImage: `url(${img})`,
        animationDuration: `${animationDuration}s`,
      };
    };

    setInterval(() => {
      preActive.value = active.value;
      active.value = (active.value + 1 + Banners.value.length) % Banners.value.length;
    }, (animationDuration / 2) * 1000);

    return {
      Banners,
      scroll,
      animationCtrl,
      active,
      preActive,
    };
  },
};
</script>

<template>
  <section class="min-h-[90vh] relative bg-secondary-900">
    <div class="absolute w-full h-full
    bg-center bg-no-repeat bg-[length:150%_auto]
    before:bg-secondary-900/60 before:block before:absolute
    before:w-full before:h-full opacity-0
    "
    v-for="(img, idx) in Banners" :key="img"
    :class="{ heroAnimate: active === idx+1 || preActive === idx }"
    :style="animationCtrl(img, idx)" />
    <div class="container flex justify-end items-center h-[90vh] relative">
      <h1 class="text-primary-500 text-5xl mr-12 relative font-medium pt-7 p-2">
        喝酒是一種生活的態度
        <SvgLoader name="bannerLogo"
        class="absolute top-0 left-0 -translate-x-1/2 -translate-y-full scale-[1.75]
        text-primary-500" />
      </h1>
      <div
      :class="{'hidden' : scroll}"
      class="absolute w-full h-full bottom-0 left-0
      translate-x-1/2 translate-y-[85%]
      ">
        <ScrollMouse />
      </div>
    </div>
  </section>
</template>
