<script>
import useStore from '@/stores';
import { onMounted, computed, watch } from 'vue';
import OrderForm from '@/components/OrderForm.vue';
import CheckStep from '@/components/CheckStep.vue';

export default {
  components: {
    OrderForm,
    CheckStep,
  },
  setup() {
    const { cartStore } = useStore();
    const {
      cartData,
      handleGetCart,
      handleDeleteCart,
      handleClearCart,
      handleUpdateCart,
    } = cartStore;

    function moneyFormat(num, qty) {
      let number = num;
      if (qty !== undefined) number *= qty;
      return num !== undefined ? Number(number.toFixed(1)).toLocaleString() : 0;
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
      cartList: computed(() => cartData.list),
      cartTotalPrice: computed(() => moneyFormat(cartData.totalPrice)),
      cartFinalPrice: computed(() => moneyFormat(cartData.finalPrice)),
      handleDeleteCart,
      handleClearCart,
      handleUpdateCart,
      moneyFormat,
    };
  },
};
</script>

<template>
  <section class="py-8 bg-gray-200">
    <CheckStep active="1" />
    <div class="container">
      <div class="flex flex-wrap lg:flex-nowrap
      justify-between gap-4">
        <div class="flex flex-col justify-between
        pb-4 lg:pt-14 lg:pb-20 border-b border-secondary-500
        lg:border-0
        w-full md:w-2/3 flex-auto">
          <h1 class="py-4 text-center font-medium text-2xl">訂單內容</h1>
          <ul id="list" class="space-y-4 overflow-y-auto max-h-[50vh]">
            <li v-for="cart in cartList" :key="cart.id"
            class="flex justify-between gap-4 px-4
            items-center border-b pb-4 border-secondary-200">
              <div class="flex gap-4">
                <img
                  class="object-cover w-20 h-20"
                  :src="cart.product.imageUrl"
                  :alt="cart.product.title"
                />
                <div class="space-y-4">
                  <h3 class="text-xl font-medium">{{ cart.product.title }}</h3>
                  <span class="font-mono block tracking-wider">數量：{{ cart.qty }}</span>
                </div>
              </div>
              <span class="font-mono tracking-widest">
                NT${{ moneyFormat(cart.product.price, cart.qty) }}
              </span>
            </li>
          </ul>
          <div class="text-right pt-4">
            <p v-if="cartList.length === 0"
            class="text-center text-2xl text-secondary-500">
              您的購物車是空的
            </p>
            <p class="text-2xl font-medium tracking-widest" v-show="cartList.length > 0">
              總金額
            </p>
            <p class="text-xl font-mono font-extralight" v-show="cartList.length > 0">
              NT${{ cartFinalPrice }}
            </p>
          </div>
        </div>
        <div class="lg:divider lg:divider-horizontal"></div>
        <OrderForm />
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
  .divider-horizontal {
    &:before {
      width: 1px;
    }
    &:after {
      width: 1px;
    }
  }
</style>
