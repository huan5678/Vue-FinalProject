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
  <div class="card rounded bg-secondary-100
  dark:bg-secondary-800 shadow h-full justify-between">
      <div class="py-2 px-4">
          <h3 class="text-3xl font-bold text-secondary-700
          font-serif
          dark:text-secondary-100 uppercase">
            {{ productData.title }}
          </h3>
          <p class="mt-1 text-sm font-serif font-medium
          text-secondary-400 dark:text-secondary-300">
            {{ productData.content }}</p>
      </div>

      <img class="object-cover mt-auto w-full max-h-64"
      :src="productData.imageUrl"
      :alt="productData.title">

      <div class="flex justify-between items-center p-4 bg-secondary-900">
          <span class="text-xl font-light font-mono
          text-secondary-100">${{ productData.price }}</span>
          <button type="button" class="font-light
          text-primary-600 hover:text-primary-200 focus:text-primary-400
          hover:bg-transparent hover:border-primary-200
          rounded-sm
          btn btn-md btn-outline"
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
