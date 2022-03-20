<script>
export default {
  setup(props, context) {
    return {
      product: context.att.product,
    };
  },
};
</script>
<template>
  <div class="max-w-xs mx-auto overflow-hidden bg-secondary-100
  rounded-lg shadow-lg dark:bg-secondary-800">
      <div class="px-4 py-2">
          <h3 class="text-3xl font-bold text-secondary-800 uppercase dark:text-secondary-100">
            {{ product.title }}
          </h3>
          <p class="mt-1 text-sm text-secondary-600 dark:text-secondary-400">
            {{ product.content }}</p>
      </div>

      <img class="object-cover w-full h-48 mt-2"
      :src="product.imageUrl"
      alt="NIKE AIR">

      <div class="flex items-center justify-between px-4 py-2 bg-secondary-900">
          <h1 class="text-lg font-bold text-secondary-100">${{ product.price }}</h1>
          <button class="btn btn-sm font-light text-secondary-900 bg-secondary-100
          hover:bg-secondary-200 focus:bg-secondary-400 focus:outline-none">
            加入購物車
          </button>
      </div>
  </div>
</template>
