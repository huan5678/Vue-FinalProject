<script>
import { useRouter } from 'vue-router';
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
    const router = useRouter();
    const Banners = ref([
      heroBanner01, heroBanner02, heroBanner03, heroBanner04,
    ]);
    const animationDuration = 10;

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

    function handleGoProducts() {
      router.push('/product');
    }

    return {
      Banners,
      scroll,
      animationCtrl,
      active,
      preActive,
      handleGoProducts,
    };
  },
};
</script>

<template>
  <section class="min-h-[90vh] relative bg-secondary-900 overflow-hidden">
    <div class="absolute w-full h-full
    bg-center bg-no-repeat
    before:bg-secondary-900/60 before:block before:absolute
    before:w-full before:h-full opacity-0
    "
    v-for="(img, idx) in Banners" :key="img"
    :class="{ heroAnimate: active === idx || preActive === idx-1 }"
    :style="animationCtrl(img, idx)" />
    <div class="container flex flex-col justify-center items-center h-[90vh] relative">
      <SvgLoader name="bannerLogo"
      class="
      scale-50 md:scale-75 lg:scale-110
      text-primary-500" />
      <h1 class="text-primary-500 rfs:text-5xl font-extralight pt-7 p-2 mb-9 tracking-[.5rem]">
        喝酒是一種生活的態度
      </h1>
      <button type="button"
      class="rounded border border-primary-300 px-8 py-4
      text-primary-300 font-thin text-lg transition-all duration-300
      hover:bg-primary-400 hover:text-secondary-800"
      @click="handleGoProducts">發現更多美好</button>
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
