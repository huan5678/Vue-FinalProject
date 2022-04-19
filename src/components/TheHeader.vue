<script>
import { useRoute, useRouter } from 'vue-router';
import {
  onMounted,
  computed,
  watch,
  ref,
  reactive,
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

    const scroll = reactive({
      current: 0,
      prev: 0,
      showHeader: true,
    });

    const isHome = ref(true);

    const openDropdown = ref(false);

    window.onscroll = () => {
      scroll.current = window.scrollY;
    };

    const header = ref(null);
    watch(() => scroll.current, (newVal, oldVal) => {
      if (route.name === 'home') {
        if (scroll.current !== 0) {
          if (oldVal < newVal) {
            scroll.showHeader = false;
          } else if (oldVal > newVal) {
            scroll.showHeader = true;
          }
        } else {
          scroll.showHeader = true;
        }
      }
    });

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

    function checkRoute(routeName) {
      if (routeName === 'home') {
        isHome.value = true;
      } else {
        isHome.value = false;
      }
    }

    watch(route, (newValue) => {
      checkRoute(newValue.name);
    });

    onMounted(() => {
      handleGetCart();
      checkRoute(route.name);
    });

    return {
      route,
      handleIsLogout,
      cartList: computed(() => cartData.list),
      openCart,
      handleCart,
      scroll,
      header,
      openDropdown,
      isHome,
    };
  },
};
</script>
<template>
  <section id="header" ref="header"
  class="z-30 w-full transition-all duration-500"
  :class="{
    'sticky top-0 bg-secondary-900/70': isHome,
    'bg-secondary-700': !isHome,
    'translate-y-0': scroll.showHeader,
    '-translate-y-full': !scroll.showHeader,
  }"
  >
    <nav class="container flex relative
    justify-between items-center py-2 md:static md:py-3">
      <a href="/">
        <SvgLoader name="bannerLogo"
          class="w-28 h-8 text-primary-500" />
        <h2 class="hidden text-primary-500">ChillBar秋吧</h2>
      </a>
        <label for="menuBtn"
        class="md:hidden btn swap
        swap-rotate">
          <input type="checkbox" id="menuBtn" v-model="openDropdown">
          <i class="bi bi-list swap-off"></i>
          <i class="bi bi-x-lg swap-on"></i>
        </label>
        <ul class="flex absolute top-full left-0
        flex-col flex-wrap gap-4
        justify-center items-center
        space-y-4 w-full bg-secondary-900/70 rounded transition-all
        duration-500 md:static md:top-auto
        md:left-auto md:flex-row md:flex-nowrap md:space-y-0 md:w-auto
        md:bg-transparent md:rounded-none md:translate-x-0"
        :class="{'translate-x-[-250%]': !openDropdown}">
          <li class="w-full md:flex-auto md:w-auto"
          v-if="route.name !== 'dashboard'">
            <AppLink to="product"> 產品列表 </AppLink>
          </li>
          <li class="w-full md:flex-auto md:w-auto"
          v-if="route.name !== 'dashboard'">
            <AppLink to="booking"> 預約訂位 </AppLink>
          </li>
          <li class="w-full md:flex-auto md:w-auto"
          v-if="route.name !== 'dashboard'">
            <AppLink to="about"> 關於我們 </AppLink>
          </li>
          <li class="relative w-full md:flex-auto md:w-auto"
          v-if="route.name !== 'dashboard' || route.name !== 'confirm'">
            <span class="absolute top-0 right-0 rfs:text-xs
            text-primary-50 bg-primary-500 badge
            " v-show="cartList.length > 0">{{ cartList.length }}</span>
            <button class="btn btn-md btn-ghost" type="button"
            @click="handleCart(true)" @keydown="true">
              <span class="block text-secondary-300 md:hidden">查看購物車</span>
              <i class="hidden text-xl text-secondary-300 md:block bi bi-bag-heart">
              </i>
            </button>
          </li>
        </ul>
      <div class="flex gap-4 justify-center items-center" v-if="route.name === 'dashboard'">
        <button type="button"
          class="gap-2 rfs:text-base font-normal bg-primary-400 hover:bg-primary-600
          transition duration-300 btn
          btn-xs sm:btn-sm md:btn-md"
          @click="handleIsLogout()"
        >
          <i class="rfs:text-xl bi bi-person-circle"></i>
          管理者登出
        </button>
      </div>
    </nav>
  </section>
  <TheCart v-model="openCart" @handleCart="handleCart" :handle="handleCart" />
</template>
