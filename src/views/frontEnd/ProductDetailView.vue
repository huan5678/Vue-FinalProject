<script>
import {
  onMounted, computed, ref, watchEffect,
} from 'vue';
import { useRoute } from 'vue-router';

import useStore from '@/stores';
import AppLink from '@/components/AppLink.vue';

export default {
  components: { AppLink },
  setup() {
    const { productStore, cartStore } = useStore();
    const { handleAddCart } = cartStore;
    const { productList, handleGetProductDetail } = productStore;
    const params = useRoute();
    const qty = ref(0);

    onMounted(() => {
      handleGetProductDetail(params.params.id);
    });

    watchEffect(() => {
      if (params.params.id !== undefined) handleGetProductDetail(params.params.id);
    });

    function handleUpdateCart(id, num) {
      handleAddCart(id, num);
    }
    return {
      qty,
      products: computed(() => productList.productDetail),
      handleAddCart,
      isLoading: computed(() => cartStore.isLoading),
      handleUpdateCart,
    };
  },
};
</script>

<template>
    <section
      class="flex overflow-hidden flex-col pb-4 space-y-4 bg-gray-50 rounded-md"
    >
      <AppLink to="/product" class="flex gap-3 items-center p-3 text-secondary-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147
          2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1
          0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
        </svg>
      回上一頁
      </AppLink>
      <div class="flex justify-between p-4">
        <img
          class="max-h-[300px]"
          :src="products.imageUrl"
          :alt="products.title"
        />
        <div class="flex-1 p-4 space-y-8">
          <div class="flex gap-4 items-center">
            <h2 class="mb-2 text-xl font-bold">
              {{ products.title }}
              <span
                class="py-1 px-2 ml-2 text-sm text-white bg-primary-400 rounded"
              >
                {{ products.category }}
              </span>
            </h2>
            <ul class="flex gap-1 items-center">
              <li v-for="(star, idx) in 5" :key="star + new Date()">
                <svg
                  v-show="products.rating > idx"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="w-6 h-6 text-warning-500"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173
                    6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
                    0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83
                    4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                  />
                </svg>
                <svg
                  v-show="products.rating <= idx"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="w-6 h-6 text-gray-400"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389
                    2.256c.386.198.824-.149.746-.592l-.83-4.73
                    3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513
                    0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523
                    3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0
                    0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8
                    2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565
                    0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                  />
                </svg>
              </li>
            </ul>
          </div>

          <ul class="space-y-4">
            <li>商品描述：{{ products.description }}</li>
            <li>商品內容：{{ products.content }}</li>
            <li>
              {{ products.price }}
              <span class="pl-1 text-gray-400 line-through">{{
                products.origin_price
              }}</span>
              個 / 元
            </li>
            <li class="flex flex-col gap-4 justify-between">
              <select v-model="qty" class="w-1/2">
                <option value="0" selected disabled>請選擇訂購數量</option>
                <option v-for="i in 20" :value="i" :key="i + products.id">
                  {{ i }}
                </option>
              </select>
              <button
                class="flex justify-center items-center py-3 w-full rounded
                border transition duration-300 border-danger-700"
                @click="handleUpdateCart(products.id, qty)"
                :disabled="qty === 0"
                :class="
                  qty === 0
                    ? 'bg-danger-700 text-gray-50 opacity-40 cursor-not-allowed'
                    : 'bg-danger-500 text-gray-50 hover:bg-danger-700'
                "
              >
                <svg
                  class="mr-3 -ml-1 w-5 h-5 animate-spin text-danger-50"
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
      <div class="flex overflow-x-auto gap-4">
        <img
          v-for="img in products.imagesUrl"
          :key="img"
          class="object-cover flex-auto w-1/12 max-h-48"
          :src="img"
          :alt="products.title"
        />
      </div>
    </section>
</template>
