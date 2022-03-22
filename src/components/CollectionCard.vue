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
  <div class="overflow-hidden mx-auto max-w-xs bg-secondary-100
  dark:bg-secondary-800 rounded-lg shadow-lg">
      <div class="py-2 px-4">
          <h3 class="text-3xl font-bold text-secondary-800 dark:text-secondary-100 uppercase">
            {{ product.title }}
          </h3>
          <p class="mt-1 text-sm text-secondary-600 dark:text-secondary-400">
            {{ product.content }}</p>
      </div>

      <img class="object-cover mt-2 w-full h-48"
      :src="product.imageUrl"
      alt="NIKE AIR">

      <div class="flex justify-between items-center py-2 px-4 bg-secondary-900">
          <h1 class="text-lg font-bold text-secondary-100">${{ product.price }}</h1>
          <button class="font-light text-secondary-900
          bg-secondary-100 hover:bg-secondary-200 focus:bg-secondary-400
          focus:outline-none btn btn-sm">
            加入購物車
          </button>
      </div>
  </div>
</template>
