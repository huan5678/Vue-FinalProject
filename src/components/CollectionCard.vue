<script>
import { computed } from 'vue';
import useStore from '@/stores';

export default {
  props: ['product'],
  setup(props) {
    const product = { ...props.product };
    const { cartStore } = useStore();
    const { handleAddCart } = cartStore;
    return {
      handleAddCart,
      productData: product,
      isLoading: computed(() => cartStore.isLoading),
    };
  },
};
</script>
<template>
  <div class="flex flex-col flex-[1_0_0] justify-between
  overflow-hidden mx-auto max-w-xs bg-secondary-100
  dark:bg-secondary-800 rounded-lg shadow-lg">
      <div class="py-2 px-4">
          <h3 class="text-3xl font-bold text-secondary-800 dark:text-secondary-100 uppercase">
            {{ productData.title }}
          </h3>
          <p class="mt-1 text-sm text-secondary-600 dark:text-secondary-400">
            {{ productData.content }}</p>
      </div>

      <img class="object-cover mt-2 w-full max-h-64"
      :src="productData.imageUrl"
      :alt="productData.title">

      <div class="flex justify-between items-center py-2 px-4 bg-secondary-900">
          <h1 class="text-lg font-bold text-secondary-100">${{ productData.price }}</h1>
          <button type="button" class="font-light text-secondary-900
          bg-secondary-100 hover:bg-secondary-200 focus:bg-secondary-400
          focus:outline-none btn btn-sm"
          :class="isLoading === productData.id ? 'bg-gray-300 hover:bg-gray-300' : ''"
          :disabled="isLoading === productData.id"
          @click="handleAddCart(productData.id)"
          >
          <svg
            class="mr-3 -ml-1 w-5 h-5 text-gray-300 animate-spin"
            :class="isLoading === productData.id ? '' : 'hidden'"
            :disabled="isLoading === productData.id"
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
      </div>
  </div>
</template>
