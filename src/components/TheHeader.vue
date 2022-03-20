<script>
import { useRoute, useRouter } from 'vue-router';
import {
  onMounted,
  computed,
  watch,
  ref,
} from 'vue';

import useStore from '@/stores';
import AppLink from '@/utils/AppLink.vue';
import TheCart from '@/components/TheCart.vue';

export default {
  components: { AppLink, TheCart },
  setup() {
    const route = useRoute();
    const { adminStore, cartStore } = useStore();
    const { handleSetLogout, handleClearToken } = adminStore;
    const {
      cartData,
      handleGetCart,
    } = cartStore;
    const router = useRouter();
    const openCart = ref(false);

    function handleIsLogout() {
      handleClearToken();
      handleSetLogout();
      router.push('/');
    }

    function checkoutHandler(boolean) {
      const checkout = document.getElementById('checkout');
      const checdiv = document.getElementById('chec-div');
      const vfmContainer = document.querySelector('.vfm__content');
      if (!boolean) {
        checkout.classList.add('translate-x-full');
        checkout.classList.remove('translate-x-0');
        setTimeout(() => {
          checdiv.classList.add('opacity-0');
          vfmContainer.classList.add('hidden');
        }, 300);
        cartData.isOpenCart = boolean;
      } else {
        setTimeout(() => {
          checkout.classList.remove('translate-x-full');
          checkout.classList.add('translate-x-0');
          checdiv.classList.add('opacity-100');
          vfmContainer.classList.remove('hidden');
        }, 300);
        cartData.isOpenCart = !boolean;
      }
    }

    function handleCart(boolean) {
      checkoutHandler(boolean);
      openCart.value = boolean;
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
      openCart,
      handleCart,
    };
  },
};
</script>
<template>
  <section class="bg-secondary-900">
    <nav class="container flex justify-between items-center p-3">
      <a href="/">
        <SvgLoader name="bannerLogo"
          class="w-full h-9 text-primary-500" />
        <h2 class="hidden text-primary-500">ChillBar秋吧</h2>
      </a>
      <ul class="flex gap-4 justify-between items-center" v-if="route.name !== 'product-detail'">
        <li>
          <AppLink to="product"> 產品列表 </AppLink>
        </li>
        <li>
          <AppLink to="about"> 關於我們 </AppLink>
        </li>
        <li class="relative">
          <span class="badge absolute top-0 right-0
          rfs:text-xs text-primary-50 bg-primary-500
          " v-show="cartList.length > 0">{{ cartList.length }}</span>
          <button class="btn btn-md btn-ghost" type="button"
          @click="handleCart(true)" @keydown="true">
            <i class="bi bi-bag-heart text-secondary-300 text-xl">
            </i>
          </button>
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
  <TheCart v-model="openCart" @handleCart="handleCart" :handle="handleCart" />
</template>
