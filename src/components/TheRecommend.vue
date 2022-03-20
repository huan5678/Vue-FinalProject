<script>
import { onMounted, computed } from 'vue';
import useStore from '@/stores';
import CollectionCard from '@/components/CollectionCard.vue';

export default {
  components: { CollectionCard },
  setup() {
    const { productStore } = useStore();
    const {
      productList, productCategory, handleGetProductAll, isLoading,
    } = productStore;
    onMounted(() => {
      handleGetProductAll();
    });
    return {
      productList: computed(() => productList.products),
      productCategory: computed(() => productCategory),
      isLoading: computed(() => isLoading),
    };
  },
};
</script>

<template>
  <section class="container">
    <AppTitle level="2" class="mb-12">
      推薦給您
    </AppTitle>
    <ul class="grid grid-cols-4 gap-4">
      <li
        class=""
        v-for="product in productList"
        :key="product.id"
      >
        <div v-if="product.recommend">
          <CollectionCard :product="product" />
        </div>
      </li>
    </ul>
  </section>
</template>
