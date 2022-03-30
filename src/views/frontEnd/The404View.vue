<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { router } = useRouter();

    function handleToProduct() {
      router.push('product');
    }
    return {
      handleToProduct,
    };
  },
};
</script>

<template>
  <section class="container flex justify-center items-center min-h-screen">
    <AppTitle level="1" class="mb-12 font-mono">
      404 ERROR NOT FOUND
    </AppTitle>
    <button type="button" @click="handleToProduct"
    class="btn btn-outline">
      瀏覽其他的東西吧 :wink:
    </button>
  </section>
</template>
