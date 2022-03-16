<script>
import useStore from '@/stores';
import { onMounted, computed, watch } from 'vue';

export default {
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
  <section class="pt-12 pb-20 bg-gray-100">
    <h2 class="mb-8 text-2xl text-center">購物車</h2>
    <table class="container">
      <thead class="border-b-2 border-secondary-700">
        <tr>
          <th class="w-4/12 text-xl font-normal text-left">品項</th>
          <th class="w-2/12 text-xl font-normal text-right">單價</th>
          <th class="w-2/12 text-xl font-normal text-right">數量</th>
          <th class="w-2/12 text-xl font-normal text-right">金額</th>
          <th class="w-2/12"></th>
        </tr>
      </thead>
      <tbody class="mb-5 text-xl font-normal">
        <tr class="border-b" v-for="cart in cartList" :key="cart.id">
          <td class="flex gap-4 items-center py-5">
            <img
              class="object-cover w-20 h-20"
              :src="cart.product.imageUrl"
              :alt="cart.product.title"
            />
            <h3>{{ cart.product.title }}</h3>
          </td>
          <td class="text-right">
            <span class="block text-sm line-through">
              NT${{ moneyFormat(cart.product.origin_price) }}
            </span>
            NT${{ moneyFormat(cart.product.price) }}
          </td>
          <td class="text-right">
            <select
              class="rounded"
              v-model="cart.qty"
              @change="handleUpdateCart(cart.id, cart.qty)"
            >
              <option v-for="i in 20" :value="i" :key="i + cart.product.id">
                {{ i }}
              </option>
            </select>
          </td>
          <td class="text-right">
            <span class="block text-sm line-through">
              NT${{ moneyFormat(cart.product.origin_price, cart.qty) }}
            </span>
            NT${{ moneyFormat(cart.product.price, cart.qty) }}
          </td>
          <td class="text-center">
            <button class="" @click="handleDeleteCart(cart.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 hover:text-primary-500 transition duration-500
                ease-out hover:scale-150"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot class="text-xl">
        <tr>
          <td colSpan="3" class="py-5">
            <button
              class="py-2 px-5 hover:text-white hover:bg-black rounded border border-black
              hover:border-transparent transition duration-300 ease-in-out"
              @click="handleClearCart"
              v-if="cartList.length > 0"
            >
              刪除全部品項
            </button>
            <p v-else class="pt-3 pl-12 text-left text-primary">您的購物車是空的</p>
          </td>
          <td class="text-center" v-show="cartList.length > 0">
            <span class="block text-sm line-through">原始總金額</span>
            總金額
          </td>
          <td class="text-center" v-show="cartList.length > 0">
            <span class="block text-sm line-through"> NT${{ cartTotalPrice }} </span>
            NT${{ cartFinalPrice }}
          </td>
        </tr>
      </tfoot>
    </table>
  </section>
</template>
