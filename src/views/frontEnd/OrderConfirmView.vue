<script>
import {
  onMounted,
  computed,
  reactive,
  inject,
  ref,
} from 'vue';
import useStore from '@/stores';
import CheckStep from '@/components/CheckStep.vue';

export default {
  components: {
    CheckStep,
  },
  setup() {
    const {
      orderStore,
    } = useStore();
    const {
      orderResult,
      orderData,
      handleGetOrderData,
    } = orderStore;
    const axios = inject('axios');
    const baseUrl = process.env.VUE_APP_API_URL;
    const apiPath = process.env.VUE_APP_API_PATH;

    function moneyFormat(num, qty) {
      let number = num;
      if (qty !== undefined) number *= qty;
      return num !== undefined ? Number(number.toFixed(1)).toLocaleString() : 0;
    }

    const steps = ref(2);

    const paymentData = reactive(
      {
        success: false,
        order: {},
        total: 0,
        user: {},
      },
    );

    function handlePayment(id) {
      axios.post(`${baseUrl}api/${apiPath}/pay/${id}`)
        .then((res) => {
          paymentData.success = res.data.success;
          paymentData.order = res.data.order;
          paymentData.total = res.data.total;
          paymentData.user = res.data.user;
          steps.value = 3;
          localStorage.removeItem('order_id');
        })
        .catch((err) => console.dir(err));
    }

    onMounted(() => {
      const orderId = localStorage.getItem('order_id');
      if (orderResult.orderId) {
        handleGetOrderData(orderResult.orderId);
      } else {
        handleGetOrderData(orderId);
      }
    });
    return {
      steps,
      moneyFormat,
      handlePayment,
      paymentData,
      confirmData: computed(() => orderData),
    };
  },
};
</script>

<template>
  <section class="py-8 bg-gray-200">
    <CheckStep :active="`${steps}`" />
    <div class="container pt-4">
      <div class="flex flex-wrap gap-4
      justify-between lg:flex-nowrap">
        <div class="flex flex-col flex-auto
        justify-between pb-4 w-full border-b border-secondary-500
        md:w-2/3
        lg:pt-14 lg:pb-20 lg:border-0">
          <h2 class="py-4 text-2xl font-medium text-center">訂單內容</h2>
          <ul id="list" class="overflow-y-auto space-y-4 max-h-[50vh]">
            <li v-for="item in confirmData?.order?.products" :key="item.id"
            class="flex gap-4 justify-between items-center
            px-4 pb-4 border-b border-secondary-200">
              <div class="flex gap-4">
                <img
                  class="object-cover w-20 h-20"
                  :src="item.product.imageUrl"
                  :alt="item.product.title"
                />
                <div class="space-y-4">
                  <h3 class="text-xl font-medium">{{ item.product.title }}</h3>
                  <span class="block font-mono tracking-wider">數量：{{ item.product.qty }}</span>
                </div>
              </div>
              <span class="font-mono tracking-widest">
                NT${{ moneyFormat(item.product.price, item.product.qty) }}
              </span>
            </li>
          </ul>
          <ul class="pt-4 text-right space-y-2">
            <li class="text-xl font-medium tracking-widest">
              總金額
            </li>
            <li class="font-mono text-2xl font-extralight
            border-b border-secondary-200 pb-2">
              NT${{ confirmData.order.total }}
            </li>
            <li class="text-lg font-medium tracking-widest">
              訂單是否完成付款
            </li>
            <li class="text-xl font-medium tracking-widest">
              {{ paymentData.is_paid ? '已完成付款' : '未完成付款' }}
            </li>
          </ul>
        </div>
        <div class="lg:divider lg:divider-horizontal"></div>
        <div class="w-full md:w-1/2 lg:w-1/3">
          <h1 class="py-4 text-2xl font-medium text-center">訂購資訊</h1>
          <ul class="space-y-2 mb-4">
            <li class="flex justify-between items-center gap-2">
              <span>訂購人姓名</span>
              <span>{{ confirmData.order.user.name }}</span>
            </li>
            <li class="flex justify-between items-center gap-2">
              <span>訂購人電話</span>
              <span>{{ confirmData.order.user.tel }}</span>
            </li>
            <li class="flex justify-between items-center gap-2">
              <span>訂購人Email</span>
              <span>{{ confirmData.order.user.email }}</span>
            </li>
            <li class="flex justify-between items-center gap-2">
              <span>寄件地址</span>
              <span>{{ confirmData.order.user.address }}</span>
            </li>
          </ul>
          <button type="button"
          class="btn btn-outline w-full rounded
          border-secondary-700 text-secondary-700
          hover:bg-secondary-700 hover:text-secondary-100
          " :class="{
            'disabled': paymentData.success,
            'cursor-not-allowed': paymentData.success,
            'opacity-30': paymentData.success,
            }"
          @click="handlePayment">信用卡付款</button>
        </div>
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
