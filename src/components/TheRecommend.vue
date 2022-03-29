<script>
import { onMounted, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper';
import useStore from '@/stores';
import CollectionCard from '@/components/CollectionCard.vue';

export default {
  components: {
    CollectionCard,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const { productStore } = useStore();
    const {
      productList, productCategory, handleGetProductAll, isLoading,
    } = productStore;
    onMounted(() => {
      handleGetProductAll();
    });

    const recommendArr = computed(() => productList.products);
    const result = computed(() => recommendArr.value.filter((item) => item.recommend));

    return {
      productList: computed(() => result.value),
      productCategory: computed(() => productCategory),
      isLoading: computed(() => isLoading),
      modules: [Autoplay],
    };
  },
};
</script>

<template>
  <section class="container pb-6">
    <AppTitle level="2" class="mb-12">
      推薦給您
    </AppTitle>
    <swiper
      class="select-none"
      :loop="true"
      :breakpoints="{
        '640': {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        '768': {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        '1280': {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }"
      :loopFillGroupWithBlank="true"
      :grabCursor="true"
      :modules="modules"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
    >
    <swiper-slide
    class="items-stretch h-auto"
    v-for="product in productList"
    :key="product.id"
    >
      <CollectionCard :product="product" />
    </swiper-slide>
    </swiper>
  </section>
</template>
