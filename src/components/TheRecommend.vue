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
    return {
      productList: computed(() => productList.products),
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
      class="select-none h-full items-stretch"
      :slidesPerView="3"
      :spaceBetween="50"
      :lazy="true"
      :loop="true"
      :modules="modules"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
    >
    <swiper-slide
    v-for="product in productList"
    :key="product.id"
    >
      <CollectionCard v-if="product.recommend" :product="product" />
    </swiper-slide>
    </swiper>
  </section>
</template>
