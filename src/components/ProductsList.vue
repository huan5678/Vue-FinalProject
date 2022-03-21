<script>
import useStore from '@/stores';
import { onMounted, computed, ref } from 'vue';
import ProductCard from './ProductCard.vue';

export default {
  components: {
    ProductCard,
  },
  setup() {
    const { productStore } = useStore();
    const {
      productList, handleGetProductList, productCategory, handleGetProductAll, isLoading,
    } = productStore;
    const selectCategory = ref('All');
    onMounted(() => {
      handleGetProductAll();
    });

    function handleCategoryChange(value) {
      selectCategory.value = value;
      if (value === 'All') {
        handleGetProductAll();
      } else {
        handleGetProductList(value);
      }
    }

    return {
      selectCategory,
      productList: computed(() => productList.products),
      productCategory: computed(() => productCategory),
      handleCategoryChange,
      isLoading: computed(() => isLoading),
    };
  },
};
</script>

<template>
  <section class="container py-6">
    <AppTitle level="1" class="mb-6">
      產品列表
    </AppTitle>
    <div class="flex justify-start items-center mb-6">
      <div class="tabs">
        <a class="tab tab-lifted transition-all duration-500
        "
        :class="{
          'hover:border-primary-600': selectCategory !== category.category,
          'hover:text-primary-500': selectCategory !== category.category,
          'tab-active': selectCategory === category.category,
          'text-primary-600 hover:text-primary-500': selectCategory === category.category,
        }"
        @click="handleCategoryChange(category.category)"
        @keydown="category"
        v-for="category in productCategory"
        :key="category.title">
          {{ category.title }}
        </a>
      </div>
    </div>
    <ul class="grid grid-cols-4 gap-4">
      <li
        class=""
        v-for="product in productList"
        :key="product.id"
      >
        <ProductCard :product="product" />
      </li>
    </ul>
  </section>
</template>
