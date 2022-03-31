<script>
import useStore from '@/stores';
import {
  onMounted,
  computed,
  ref,
  inject,
} from 'vue';
import ProductCard from './ProductCard.vue';

export default {
  components: {
    ProductCard,
  },
  setup() {
    const { productStore } = useStore();
    const {
      productList, handleGetProductList, productCategory, isLoading,
    } = productStore;

    const baseUrl = process.env.VUE_APP_API_URL;
    const apiPath = process.env.VUE_APP_API_PATH;

    const articles = ref([]);
    const selectCategory = computed({
      get() { return productList.selectCategory; },
      set(val) { productList.selectCategory = val; },
    });

    const axios = inject('axios');

    function handleGetArticleAll() {
      axios.get(`${baseUrl}api/${apiPath}/articles`)
        .then((res) => { articles.value = res.data.articles; })
        .catch((err) => { console.error(err); });
    }

    onMounted(() => {
      handleGetArticleAll();
      handleGetProductList(productList.selectCategory);
    });

    function handleCategoryChange(value) {
      selectCategory.value = value;
      handleGetProductList(value, productList.currentPage);
    }

    function handlePaginationAction(val) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      handleGetProductList(productList.selectCategory, val);
    }

    return {
      selectCategory,
      productList: computed(() => productList.products),
      productCategory: computed(() => productCategory),
      handleCategoryChange,
      isLoading: computed(() => isLoading),
      pagination: computed(() => productList.pagination),
      handlePaginationAction,
      articles,
    };
  },
};
</script>

<template>
  <section class="container py-6 space-y-4">
    <AppTitle level="1">
      產品列表
    </AppTitle>
    <div class="flex justify-center items-center">
      <div class="tabs">
        <a class="transition-all duration-500 tab tab-lifted
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
    <template v-for="article in articles" :key="article.id">
      <div class="p-4" :class="{'hidden': article.tag[0] !== selectCategory}"
      v-show="selectCategory !== 'All' ">
        <div v-show="article.tag[0] === selectCategory">
          <div class="flex gap-4 justify-between">
            <article>
              <h2 class="mb-4 font-serif text-4xl
              font-medium text-primary-400
              border-b">{{article.title}}</h2>
              <div class="space-y-2 font-serif
              text-lg font-light text-secondary-400"
              v-html="article.description" />
            </article>
            <figure>
              <img
              class="aspect-square object-cover"
              width="960"
              height="540"
              :src="article.image"
              :alt="article.title">
            </figure>
          </div>
        </div>
      </div>
    </template>
    <ul class="grid grid-cols-4 gap-4 pb-4 mb-4 border-b">
      <li
        class=""
        v-for="product in productList"
        :key="product.id"
      >
        <ProductCard :product="product" />
      </li>
    </ul>
    <!-- 分頁 -->
    <ul v-if="selectCategory === 'All' || selectCategory === ''"
    class="flex gap-4 justify-center items-center pb-12 mx-auto">
      <li>
        <button
          type="button"
          class="py-1 px-2 text-secondary-300 disabled:text-secondary-300 disabled:bg-secondary-100
          rounded border
          border-secondary-300 disabled:border-secondary-100"
          :class="!pagination?.has_pre ?
          '' : 'hover:bg-secondary-400 hover:border-secondary-400 hover:text-white' "
          :disabled="!pagination?.has_pre"
          @click="handlePaginationAction(pagination?.current_page - 1)"
        >
          <i class="bi bi-arrow-left"></i>
        </button>
      </li>
      <li
      v-for="page in pagination?.total_pages"
      :key="page + new Date().getMilliseconds()">
        <button
          type="button"
          class="py-1 px-3 rounded"
          :class="
            page === pagination?.current_page ?
            `border-secondary-600 text-secondary-500
            border` :
            `text-secondary-300 hover:text-secondary-600
            `
          "
          @click="handlePaginationAction(page)"
        >
          {{ page }}
        </button>
      </li>
      <li>
        <button
          type="button"
          class="py-1 px-2 text-secondary-300 disabled:text-secondary-300 disabled:bg-secondary-100
          rounded border
          border-secondary-300 disabled:border-secondary-100"
          :class="!pagination?.has_next ?
          '' : 'hover:bg-secondary-400 hover:border-secondary-400 hover:text-white' "
          :disabled="!pagination?.has_next"
          @click="handlePaginationAction(pagination?.current_page + 1)"
        >
          <i class="bi bi-arrow-right"></i>
        </button>
      </li>
    </ul>
  </section>
</template>
