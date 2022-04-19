<script>
import {
  computed,
  ref,
  onMounted,
  reactive,
  onActivated,
  onBeforeMount,
} from 'vue';
import { useRoute } from 'vue-router';

import useStore from '@/stores';
import AppLink from '@/utils/AppLink.vue';

export default {
  components: { AppLink },
  setup() {
    const { productStore, cartStore } = useStore();
    const { handleAddCart } = cartStore;
    const { productList, handleGetProductDetail } = productStore;
    const route = useRoute();
    const qty = ref(0);
    const productImage = reactive({
      mainImage: '',
      imageArray: [],
    });

    function handleImage(obj) {
      productImage.mainImage = '';
      productImage.imageArray.length = 0;
      productImage.mainImage = obj.value.imageUrl;
      if (obj.value.imagesUrl) {
        obj.value.imagesUrl.forEach((url) => productImage.imageArray.push(url));
      }
    }

    onBeforeMount(() => {
      handleGetProductDetail(route.params.id);
      const products = computed(() => productList.productDetail);
      console.log('before mount id=', route.params.id);
      handleImage(products);
      console.log('before mount =', products);
      console.log(productImage);
    });

    onMounted(() => {
      // handleGetProductDetail(route.params.id);
      const products = computed(() => productList.productDetail);
      handleImage(products);
      console.log('mounted = ', products);
      console.log('mounted');
      console.log(productImage);
    });

    onActivated(() => {
      handleGetProductDetail(route.params.id);
      const products = computed(() => productList.productDetail);
      handleImage(products);
      console.log('activated id=', route.params.id);
      console.log('activated');
      console.log(productImage);
    });

    function handleUpdateCart(id, num) {
      handleAddCart(id, num);
    }

    function handleImageCtrl(url) {
      productImage.mainImage = url;
    }

    return {
      qty,
      products: computed(() => productList.productDetail),
      handleAddCart,
      isLoading: computed(() => cartStore.isLoading),
      handleUpdateCart,
      handleImageCtrl,
      productImage,
    };
  },
};
</script>

<template>
  <section
    class="pb-4 bg-gray-50"
  >
  <div class="container flex flex-col space-y-4">
    <AppLink to="/product" class="flex items-center gap-3 p-3 text-secondary-700">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147
        2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1
        0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
      </svg>
    回上一頁
    </AppLink>
    <div class="flex gap-8 p-4">
      <div class="flex flex-col space-y-2 md:w-1/2">
        <div class="flex gap-4">
          <img
            class="object-scale-down w-3/4"
            :src="productImage.mainImage ? productImage.mainImage : products.imageUrl"
            :alt="products.title"
          />
          <div class="flex flex-col gap-2">
            <img
              v-for="img in products.imagesUrl"
              :key="img"
              class="object-cover flex-auto max-h-[25%] cursor-pointer"
              @click="handleImageCtrl(img)"
              @keypress="handleImageCtrl(img)"
              :src="img"
              :alt="products.title"
            />
          </div>
        </div>
      </div>
      <div class="flex-auto space-y-8 md:w-1/2">
        <div class="flex items-center gap-4">
          <h2 class="mb-2 text-xl font-bold">
            {{ products.title }}
            <span
              class="px-2 py-1 ml-2 text-sm text-white rounded bg-primary-400"
            >
              {{ products.category }}
            </span>
          </h2>
        </div>

        <ul class="space-y-4">
          <li>商品描述：{{ products.description }}</li>
          <li>商品內容：{{ products.content }}</li>
          <li>
            {{ products.price }}
            <span class="pl-1 text-gray-400 line-through">
              {{ products.origin_price }}
            </span>
            個 / 元
          </li>
          <li class="flex flex-col justify-between gap-4">
            <select v-model="qty" class="w-1/2 form-style">
              <option value="0" selected disabled>請選擇訂購數量</option>
              <option v-for="i in 20" :value="i" :key="i + products.id">
                {{ i }}
              </option>
            </select>
            <button
              class="flex items-center justify-center w-full py-3 transition duration-300 border rounded border-secondary-700"
              @click="handleUpdateCart(products.id, qty)"
              :disabled="qty === 0"
              :class="
                qty === 0
                  ? 'bg-secondary-700 text-gray-50 opacity-40 cursor-not-allowed'
                  : 'bg-secondary-500 text-gray-50 hover:bg-secondary-700'
              "
            >
              <svg
                class="w-5 h-5 mr-3 -ml-1 text-primary-50 animate-spin"
                :class="isLoading === products.id ? '' : 'hidden'"
                :disabled="isLoading === products.id"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962
                  7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>

              加入購物車
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </section>
</template>
