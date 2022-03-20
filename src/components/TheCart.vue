<script>
import { computed, watch, ref } from 'vue';
import useStore from '@/stores';

export default {
  emits: ['handleCart'],
  setup(props, context) {
    const { cartStore } = useStore();
    const {
      cartData,
      handleGetCart,
      handleDeleteCart,
      handleClearCart,
      handleUpdateCart,
    } = cartStore;
    const cart = {};

    function moneyFormat(num, qty) {
      let number = num;
      if (qty !== undefined) number *= qty;
      return num !== undefined ? Number(number.toFixed(1)).toLocaleString() : 0;
    }

    const deliveryFee = ref(60);
    const cartTotalPrice = computed(() => moneyFormat(cartData.totalPrice));

    watch(
      () => cartData.cart,
      (newValue) => {
        if (newValue.length > 0) handleGetCart();
      },
    );
    if (cartData.totalPrice >= 1000) {
      deliveryFee.value = 0;
    }

    const cartFinalPrice = computed(() => moneyFormat(cartData.totalPrice + deliveryFee.value));

    function handleCloseCart(event) {
      if (event.target.id === 'checkout') {
        context.attrs.handle(false);
      }
    }

    return {
      windowWidth: window.innerWidth,
      cartList: computed(() => cartData.list),
      isOpenCart: computed(() => cartData.isOpenCart),
      cartTotalPrice,
      cartFinalPrice,
      handleDeleteCart,
      handleClearCart,
      handleUpdateCart,
      moneyFormat,
      deliveryFee,
      cart,
      handleCloseCart,
    };
  },
};
</script>

<template>
  <vue-final-modal
    v-bind="$attrs"
    v-slot="{ handleCart }"
    classes="bg-secondary-900 bg-opacity-50 backdrop-blur-[2px]"
    content-class="hidden"
    id="chec-div"
    >
      <div
        class="translate-x-0 transform
        transition-all duration-700 overflow-y-auto overflow-x-hidden
        flex flex-col items-end justify-end lg:flex-row
        ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
        id="checkout"
        @click="handleCloseCart" @keydown="handleCloseCart"
      >
        <div
          class="h-auto overflow-y-auto overflow-x-hidden bg-white
          px-4 py-4 md:w-8/12 md:px-6 md:py-8 lg:h-screen lg:w-1/2 lg:px-8 lg:py-14"
          id="scroll"
        >
          <div class="flex justify-between items-center">
            <h2 class="pt-3 text-3xl font-medium text-secondary-800 lg:text-4xl">購物車內容</h2>
            <button class="btn btn-ghost"
            @click="$emit('handleCart', handleCart)" @keydown.esc="handleCart">
              <i class="bi bi-x-lg text-2xl"></i>
            </button>
          </div>
          <ul>
            <li v-for="cart in cartList" :key="cart.id"
            class="items-stretch border-t border-secondary-50 py-8 md:flex md:py-10 lg:py-8">
              <div class="w-full md:w-4/12 2xl:w-1/4">
                <img
                  :src="cart.product.imageUrl"
                  :alt="cart.product.title"
                  class="h-full w-full object-cover object-center"
                />
              </div>
              <div class="flex flex-col justify-center md:w-8/12 md:pl-3 2xl:w-3/4">
                <p class="badge badge-outline badge-md
                text-secondary-800 md:pt-0">{{ cart.product.category }}</p>
                <div class="flex w-full items-center gap-4 pt-1">
                  <p class="text-base font-medium
                  text-secondary-800">{{ cart.product.title }}</p>
                  <select
                    aria-label="Select quantity"
                    class="mr-6 border border-secondary-200
                    ml-auto focus:outline-none w-1/4 rounded"
                    v-model="cart.qty"
                    @change="handleUpdateCart(cart.id, cart.qty)"
                  >
                    <option v-for="num in 20" :value="num" :key="'項目' + num">
                      {{ num }}
                    </option>
                  </select>
                  <button
                    type="button"
                    class="
                    text-primary-700 border-primary-600
                    hover:bg-primary-600 hover:text-primary-100
                    hover:border-primary-600
                    btn btn-outline rounded
                  " @click="handleDeleteCart(cart.id)"
                  >
                    刪除
                  </button>
                </div>
                <ul class="pt-5 space-y-6">
                  <li class="flex items-center justify-between">
                  <p class="text-sm">
                    單價
                  </p>
                  <p class="text-sm font-black leading-none text-secondary-800">
                    NT${{ moneyFormat(cart.product.price) }}
                  </p>
                  </li>
                  <li class="flex items-center justify-between">
                    <p class="text-sm">
                      單一品項總價
                    </p>
                    <p class="text-base font-black leading-none text-secondary-800">
                      NT${{ moneyFormat(cart.product.price, cart.qty) }}
                    </p>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div class="flex justify-end">
            <button
            @click="handleClearCart"
            v-if="cartList.length > 0"
            class="btn btn-outline
            hover:text-secondary-100 hover:bg-secondary-700
            rounded border-secondary-700
            hover:border-transparent transition duration-300 ease-in-out
            ">刪除全部品項</button>
          </div>
        </div>
        <div class="h-full w-full bg-secondary-100 md:w-8/12 lg:w-96">
          <div
            class="flex h-auto flex-col justify-between
            overflow-y-auto px-4 py-6 md:px-7 md:py-10
            lg:h-screen lg:px-8 lg:py-20"
          >
            <div>
              <h2 class="text-3xl font-medium leading-9 text-secondary-800 lg:text-4xl">合計</h2>
              <ul class="space-y-6 pt-12">
                <li class="flex items-center justify-between">
                  <p class="text-base leading-none text-secondary-800">小計</p>
                  <p class="text-base leading-none text-secondary-800">${{ cartTotalPrice }}</p>
                </li>
                <li class="flex items-center justify-between">
                  <p class="text-base leading-none text-secondary-800">運費</p>
                  <p class="text-base leading-none text-secondary-800">
                    {{ deliveryFee === 0 ? '滿千免運' : `${deliveryFee}` }}
                  </p>
                </li>
                <li class="flex items-center justify-between" v-if="cart">
                  <p class="text-base leading-none text-secondary-800">折扣</p>
                  <p class="text-base leading-none text-secondary-800">$35</p>
                </li>
              </ul>
            </div>
            <div>
              <div class="flex items-center justify-between pb-6 pt-20 lg:pt-5">
                <p class="text-2xl leading-normal text-secondary-800">總計</p>
                <p class="text-right text-2xl font-bold leading-normal text-secondary-800">
                  ${{ cartFinalPrice }}
                </p>
              </div>
              <button
                onclick="checkoutHandler1(true)"
                class="
                w-full border btn border-secondary-800 bg-secondary-800
                text-base leading-none text-secondary-50
              ">
                前往結賬
              </button>
            </div>
          </div>
        </div>
      </div>
  </vue-final-modal>
</template>
