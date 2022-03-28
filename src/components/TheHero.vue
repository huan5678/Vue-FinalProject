<script>
import { useRouter } from 'vue-router';
import heroBanner01 from '@/assets/heroBanner01.jpg';
import heroBanner02 from '@/assets/heroBanner02.jpg';
import heroBanner03 from '@/assets/heroBanner03.jpg';
import heroBanner04 from '@/assets/heroBanner04.jpg';
import ScrollMouse from '@/components/ScrollMouse.vue';

import { ref, onMounted } from 'vue';

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

    onMounted(() => {
      const hero = document.getElementById('hero');
      const header = document.getElementById('header');
      // console.log(header.offsetHeight);
      // console.log(hero.offsetHeight);
      hero.style.marginTop = `${header.offsetHeight}px`;
      console.log(hero.style);
    });

    const handleAnimateCtrl = function (img) {
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
      handleAnimateCtrl,
      active,
      preActive,
      handleGoProducts,
    };
  },
};
</script>

<template>
  <section id="hero" class="overflow-hidden relative min-h-[90vh] bg-secondary-900">
    <div class="before:block absolute before:absolute
    w-full before:w-full h-full before:h-full
    bg-center bg-no-repeat before:bg-gradient-to-b
    from-secondary-900/50 to-secondary-900/90 opacity-0
    "
    v-for="(img, idx) in Banners" :key="img"
    :class="{ heroAnimate: active === idx || preActive === idx-1 }"
    :style="handleAnimateCtrl(img)" />
    <div class="container flex relative flex-col justify-center items-center h-[90vh]">
      <SvgLoader name="bannerLogo"
      class="
      text-primary-500 scale-50 md:scale-75
      lg:scale-110" />
      <h1 class="p-2 pt-7 mb-9 font-serif
      rfs:text-5xl font-bold tracking-[.5rem]
      text-primary-400">
        喝酒是一種生活的態度
      </h1>
      <button type="button"
      class="py-4 px-8 text-lg font-thin tracking-wider text-primary-300
      hover:text-secondary-800 hover:bg-primary-400 border border-primary-300
      transition-all duration-300"
      @click="handleGoProducts">發現更多美好</button>
      <div
      :class="{'hidden' : scroll}">
        <ScrollMouse />
      </div>
    </div>
  </section>
</template>
