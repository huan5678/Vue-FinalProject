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
  props: ['title', 'limit', 'click'],
  setup(props) {
    const { productStore } = useStore();
    const {
      productList, productCategory, handleGetProductAll, isLoading,
    } = productStore;
    onMounted(() => {
      handleGetProductAll();
    });

    const recommendArr = computed(() => productList.products);
    const result = computed(() => recommendArr.value.filter((item) => item.recommend));

    function handleRandomList(array) {
      let currentIdx = array.length;
      let tempValue;
      let randomIndex;
      const resultArray = array.slice(0);

      while (currentIdx !== 0) {
        randomIndex = Math.floor(Math.random() * currentIdx);
        currentIdx -= 1;
        tempValue = resultArray[currentIdx];
        resultArray[currentIdx] = resultArray[randomIndex];
        resultArray[randomIndex] = tempValue;
      }
      return resultArray;
    }

    return {
      productList: computed(() => result.value),
      productCategory: computed(() => productCategory),
      isLoading: computed(() => isLoading),
      modules: [Autoplay],
      titles: props.title,
      limits: props.limit,
      isClick: props.click,
      handleRandomList,
    };
  },
};
</script>

<template>
  <section class="bg-secondary-700">
    <div class="container py-12">
      <AppTitle level="2" class="mb-12">
        {{ titles }}
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
      class="items-stretch"
      v-for="product in handleRandomList(productList).splice(0, limits)"
      :key="product.id"
      >
        <CollectionCard :click="isClick" :product="product" />
      </swiper-slide>
      </swiper>
    </div>
  </section>
</template>
