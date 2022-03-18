<script>
import { useRoute, useRouter } from 'vue-router';
import {
  onMounted,
  computed,
  watch,
  ref,
} from 'vue';

import useStore from '@/stores';
import AppLink from './AppLink.vue';

export default {
  components: { AppLink },
  setup() {
    const route = useRoute();
    const { adminStore, cartStore } = useStore();
    const { handleSetLogout, handleClearToken } = adminStore;
    const {
      cartData,
      handleGetCart,
    } = cartStore;
    const router = useRouter();
    const isOpenCart = ref(false);

    function handleIsLogout() {
      handleClearToken();
      handleSetLogout();
      router.push('/');
    }

    watch(
      () => cartData.cart,
      (newValue) => {
        if (newValue.length > 0) handleGetCart();
      },
    );

    onMounted(() => {
      handleGetCart();
    });

    return {
      route,
      handleIsLogout,
      cartList: computed(() => cartData.list),
      isOpenCart,
    };
  },
};
</script>
<template>
  <section class="bg-secondary-900">
    <nav class="container flex justify-between p-3">
      <a href="/">
        <SvgLoader name="bannerLogo"
          class="w-36 h-12 text-primary-500" />
        <h2 class="hidden text-primary-500">ChillBar秋吧</h2>
      </a>
      <ul class="flex gap-4 justify-between items-center" v-if="route.name !== 'product-detail'">
        <li>
          <AppLink to="product"> 產品列表 </AppLink>
        </li>
        <li>
          <AppLink to="admin"> 後台管理 </AppLink>
        </li>
        <li class="indicator">
          <span class="indicator-item indicator-middle indicator-end badge
          rfs:text-xs text-primary-50 bg-primary-500
          " v-show="cartList.length > 0">{{ cartList.length }}</span>
          <label for="openCart" class="drawer-button btn btn-md btn-ghost">
            <i class="bi bi-bag-heart text-secondary-300 text-xl">
            </i>
          </label>
        </li>
        <!-- <li>
          <AppLink to="http://google.com">Google</AppLink>
        </li> -->
      </ul>
      <div class="flex gap-4 justify-center items-center" v-if="route.name === 'dashboard'">
        <button
          class="font-normal btn btn-xs sm:btn-sm md:btn-md
          bg-primary-400 hover:bg-primary-600 gap-2
          transition duration-300 rfs:text-base"
          @click="handleIsLogout()"
        >
          <i class="bi bi-person-circle rfs:text-xl"></i>
          管理者登出
        </button>
      </div>
    </nav>
  </section>
  <Teleport to="#app">
    <div class="drawer absolute h-screen w-full">
      <div class="drawer-content">
        <label for="openCart"></label>
        <input id="openCart" type="checkbox" v-model="isOpenCart" class="drawer-toggle">
        <div class="drawer drawer-end">
          <div class="drawer-side">
            <label for="openCart" class="drawer-overlay"></label>
            <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
              <!-- Sidebar content here -->
              <li><a>Sidebar Item 1</a></li>
              <li><a>Sidebar Item 2</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
