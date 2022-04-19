<script>
import {
  computed,
  ref,
  onMounted,
  onActivated,
} from 'vue';
import { useRoute } from 'vue-router';

import useStore from '@/stores';
import AppLink from '@/utils/AppLink.vue';
import TheRecommend from '@/components/TheRecommend.vue';

export default {
  components: { AppLink, TheRecommend },
  setup() {
    const { productStore, cartStore } = useStore();
    const { handleAddCart } = cartStore;
    const { productList, handleGetProductDetail, handleProductMainImage } = productStore;
    const route = useRoute();
    const qty = ref(0);

    onMounted(() => {
      handleGetProductDetail(route.params.id);
    });

    onActivated(() => {
      handleGetProductDetail(route.params.id);
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
      handleProductMainImage,
      productMainImage: computed(() => productList.productMainImage),
      productImages: computed(() => productList.productImages),
    };
  },
};
</script>

<template>
  <section class="pb-4 bg-gray-50">
    <div class="container flex flex-col space-y-4">
      <div class="tabs">
        <AppLink to="/product" class="tab gap-3">
          <i class="bi bi-arrow-90deg-left" />
          產品列表
        </AppLink>
      </div>
      <div class="flex py-4">
        <div class="flex flex-col gap-2 pr-4 md:w-1/2">
          <div class="w-full min-h-[50vh] bg-no-repeat bg-cover bg-center
          " :style="{ backgroundImage: `url(${productMainImage})`, }" />
          <div class="grid grid-cols-5 gap-2">
            <img v-for="img in productImages" :key="img"
                class="flex-auto object-cover transition duration-300 cursor-pointer"
                :class="img === productMainImage ? '' : 'opacity-75 brightness-75'"
                @mouseover="handleProductMainImage(img)" @focus="handleProductMainImage(img)"
                :src="img" :alt="products.title" />
          </div>
        </div>
        <div class="pl-4 space-y-8 md:w-1/2">
          <div class="flex items-center gap-4">
            <h1 class="text-4xl font-bold">
              {{ products.title }}
            </h1>
            <span class="rounded py-1 px-2 text-secondary-50 text-sm bg-primary-400">
              {{ products.category }}
            </span>
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
              <button class="flex items-center justify-center w-full py-3
              transition duration-300 border rounded border-secondary-700"
                      @click="handleUpdateCart(products.id, qty)" :disabled="qty === 0" :class="
                        qty === 0
                          ? 'bg-secondary-700 text-gray-50 opacity-40 cursor-not-allowed'
                          : 'bg-secondary-500 text-gray-50 hover:bg-secondary-700'
                      ">
                <svg class="w-5 h-5 mr-3 -ml-1 text-primary-50 animate-spin"
                    :class="isLoading === products.id ? '' : 'hidden'"
                    :disabled="isLoading === products.id" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                          stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962
                  7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>

                加入購物車
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <TheRecommend title="你可能還想來點" :click="true"
    class="bg-transparent text-secondary-700" limit="5" />
  </section>
</template>
