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
        class="flex overflow-x-hidden
        overflow-y-auto flex-col justify-end items-end
        transition-all duration-700 transform translate-x-0 lg:flex-row
        ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
        id="checkout"
        @click="handleCloseCart" @keydown="handleCloseCart"
      >
        <div
          class="overflow-x-hidden overflow-y-auto py-4 px-4
          h-auto bg-white md:py-8 md:px-6 md:w-8/12 lg:py-14 lg:px-8 lg:w-1/2 lg:h-screen"
          id="scroll"
        >
          <div class="flex justify-between items-center">
            <h2 class="pt-3 text-3xl font-medium text-secondary-800 lg:text-4xl">購物車內容</h2>
            <button class="btn btn-ghost"
            @click="$emit('handleCart', handleCart)" @keydown.esc="handleCart">
              <i class="text-2xl bi bi-x-lg"></i>
            </button>
          </div>
          <ul class="py-8 space-y-4
          border-t border-secondary-50">
            <li v-for="cart in cartList" :key="cart.id"
            class="flex gap-4 justify-between items-center pb-4 border-b">
              <button
                type="button"
                class="
                text-primary-700 hover:text-primary-100
                hover:bg-primary-600 rounded
                border-primary-600
                hover:border-primary-600
                btn btn-sm btn-square btn-outline
              " @click="handleDeleteCart(cart.id)"
              >
                <i class="text-xl bi bi-x"></i>
              </button>
              <div class="md:w-1/2 lg:w-1/3">
                <img
                  :src="cart.product.imageUrl"
                  :alt="cart.product.title"
                  class="object-cover object-center"
                />
              </div>
              <div class="flex flex-col flex-auto justify-center">
                <p class="text-secondary-800 select-none md:pt-0
                badge badge-outline badge-md">{{ cart.product.category }}</p>
                <div class="flex gap-4 items-center pt-1">
                  <p class="text-base font-medium
                  text-secondary-800">{{ cart.product.title }}</p>
                  <select
                    aria-label="Select quantity"
                    class="ml-auto w-1/4
                    rounded border border-secondary-200 focus:outline-none"
                    v-model="cart.qty"
                    @change="handleUpdateCart(cart.id, cart.qty)"
                  >
                    <option v-for="num in 20" :value="num" :key="'項目' + num">
                      {{ num }}
                    </option>
                  </select>
                </div>
                <ul class="pt-5 space-y-6">
                  <li class="flex justify-between items-center">
                  <p class="text-sm">
                    單價
                  </p>
                  <p class="text-sm font-black leading-none text-secondary-800">
                    NT${{ moneyFormat(cart.product.price) }}
                  </p>
                  </li>
                  <li class="flex justify-between items-center">
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
            class="hover:text-secondary-100 hover:bg-secondary-700
            rounded border-secondary-700
            hover:border-transparent transition
            duration-300 ease-in-out btn btn-outline
            ">刪除全部品項</button>
          </div>
        </div>
        <div class="w-full h-full bg-secondary-100 md:w-8/12 lg:w-96">
          <div
            class="flex overflow-y-auto flex-col justify-between
            py-6 px-4 h-auto md:py-10 md:px-7
            lg:py-20 lg:px-8 lg:h-screen"
          >
            <div>
              <h2 class="text-3xl font-medium leading-9 text-secondary-800 lg:text-4xl">合計</h2>
              <ul class="pt-12 space-y-6">
                <li class="flex justify-between items-center">
                  <p class="text-base leading-none text-secondary-800">小計</p>
                  <p class="text-base leading-none text-secondary-800">${{ cartTotalPrice }}</p>
                </li>
                <li class="flex justify-between items-center">
                  <p class="text-base leading-none text-secondary-800">運費</p>
                  <p class="text-base leading-none text-secondary-800">
                    {{ deliveryFee === 0 ? '滿千免運' : `${deliveryFee}` }}
                  </p>
                </li>
                <li class="flex justify-between items-center" v-if="cart">
                  <p class="text-base leading-none text-secondary-800">折扣</p>
                  <p class="text-base leading-none text-secondary-800">$35</p>
                </li>
              </ul>
            </div>
            <div>
              <div class="flex justify-between items-center pt-20 pb-6 lg:pt-5">
                <p class="text-2xl leading-normal text-secondary-800">總計</p>
                <p class="text-2xl font-bold leading-normal text-right text-secondary-800">
                  ${{ cartFinalPrice }}
                </p>
              </div>
              <button
                onclick="checkoutHandler1(true)"
                class="
                w-full text-base leading-none text-secondary-50 bg-secondary-800
                border border-secondary-800 btn
              ">
                前往結賬
              </button>
            </div>
          </div>
        </div>
      </div>
  </vue-final-modal>
</template>
