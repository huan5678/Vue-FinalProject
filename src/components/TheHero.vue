<script>
import { useRoute, useRouter } from 'vue-router';
import heroBanner01 from '@/assets/heroBanner01.jpg';
import heroBanner02 from '@/assets/heroBanner02.jpg';
import heroBanner03 from '@/assets/heroBanner03.jpg';
import heroBanner04 from '@/assets/heroBanner04.jpg';
import heroBanner05 from '@/assets/heroBanner05.jpg';
import ScrollMouse from '@/components/ScrollMouse.vue';

import { ref, onMounted } from 'vue';

export default {
  components: {
    ScrollMouse,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const Banners = ref([
      heroBanner01, heroBanner02, heroBanner03, heroBanner04, heroBanner05,
    ]);
    const animationDuration = 8;

    const scroll = ref(false);
    const active = ref(0);
    const preActive = ref(0);

    const handleAnimateCtrl = function (img) {
      return {
        backgroundImage: `url(${img})`,
        animationDuration: `${animationDuration}s`,
      };
    };

    onMounted(() => {
      if (route.name === 'home') {
        const hero = document.getElementById('hero');
        const header = document.getElementById('header');
        hero.style.height = `${hero.offsetHeight + header.offsetHeight}px`;
        hero.style.transform = `translateY(-${header.offsetHeight}px)`;
        window.addEventListener('scroll', () => {
          scroll.value = (window.scrollY > (hero.offsetHeight / 4));
        });
      }
    });

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
  <section id="hero" class="relative min-h-screen bg-secondary-900
  transition-all duration-500">
    <div class="before:block absolute before:absolute
    w-full before:w-full h-full before:h-full
    bg-center bg-no-repeat before:bg-gradient-to-b
    from-secondary-900/50 to-secondary-900/90 opacity-0
    "
    v-for="(img, idx) in Banners" :key="img"
    :class="{ heroAnimate: active === idx+1 || preActive === idx-1 }"
    :style="handleAnimateCtrl(img)" />
    <div data-aos="fade-zoom-in" data-aos-easing="ease-in-back"
    data-aos-delay="300" data-aos-duration="1000" data-aos-once="true"
    class="container flex relative flex-col justify-center items-center h-screen">
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
      <div class="transition-all duration-500"
      :class="{'opacity-0' : scroll}">
        <ScrollMouse />
      </div>
    </div>
  </section>
</template>
