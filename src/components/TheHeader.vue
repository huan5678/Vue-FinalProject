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

    window.onscroll = () => {
      scroll.current = window.scrollY;
    };

    const header = ref(null);
    watch(() => scroll.current, (newVal, oldVal) => {
      if (route.name !== 'home' && window.innerWidth > 540) {
        header.value.classList.add('bg-secondary-900');
        return;
      }
      if (scroll.current !== 0) {
        if (oldVal < newVal) {
          // console.log('header out');
          header.value.classList.remove('bg-secondary-900');
          scroll.showHeader = false;
        } else if (oldVal > newVal) {
          // console.log('header in');
          scroll.showHeader = true;
          header.value.classList.add('bg-secondary-900/80');
        }
      } else {
        // console.log('scroll = 0');
        scroll.showHeader = true;
        header.value.classList.remove('bg-secondary-900/80');
        header.value.classList.add('bg-secondary-900');
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

    onMounted(() => {
      if (route.name !== 'home') {
        header.value.classList.remove('bg-secondary-900/80');
        header.value.classList.remove('fixed');
        header.value.classList.remove('top-0');
        header.value.classList.remove('left-0');
        header.value.classList.add('bg-secondary-900');
        return;
      }
      handleGetCart();
    });

    return {
      route,
      handleIsLogout,
      cartList: computed(() => cartData.list),
      openCart,
      handleCart,
      scroll,
      header,
    };
  },
};
</script>
<template>
  <section ref="header" class="
  w-full z-10 transition-all duration-500"
  :class="scroll.showHeader ? 'translate-y-0' : '-translate-y-full' "
  >
    <nav class="container flex justify-between items-center p-3">
      <a href="/">
        <SvgLoader name="bannerLogo"
          class="w-full h-9 text-primary-500" />
        <h2 class="hidden text-primary-500">ChillBar秋吧</h2>
      </a>
      <ul class="flex gap-4 justify-between items-center"
      v-if="route.name !== 'product-detail'">
        <li v-if="route.name !== 'dashboard'">
          <AppLink to="product"> 產品列表 </AppLink>
        </li>
        <li v-if="route.name !== 'dashboard'">
          <AppLink to="about"> 關於我們 </AppLink>
        </li>
        <li class="relative" v-if="route.name !== 'dashboard'">
          <span class="absolute top-0 right-0 rfs:text-xs
          text-primary-50 bg-primary-500 badge
          " v-show="cartList.length > 0">{{ cartList.length }}</span>
          <button class="btn btn-md btn-ghost" type="button"
          @click="handleCart(true)" @keydown="true">
            <i class="text-xl text-secondary-300 bi bi-bag-heart">
            </i>
          </button>
        </li>
        <!-- <li>
          <AppLink to="http://google.com">Google</AppLink>
        </li> -->
      </ul>
      <div class="flex gap-4 justify-center items-center" v-if="route.name === 'dashboard'">
        <button
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
