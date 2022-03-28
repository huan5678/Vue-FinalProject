import { reactive, inject } from 'vue';
import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', () => {
  const axios = inject('axios');
  const baseUrl = process.env.VUE_APP_API_URL;
  const apiPath = process.env.VUE_APP_API_PATH;
  const orderResult = reactive({
    success: false,
    message: '',
    total: 0,
    create_at: 0,
    orderId: '',
  });
  const orderList = reactive({
    success: false,
    orders: [],
    pagination: {},
    message: [],
  });

  function handleSendOrder(data) {
    axios
      .post(`${baseUrl}api/${apiPath}/order`, {
        data: {
          user: {
            name: data.name,
            email: data.email,
            tel: data.tel,
            address: data.address,
          },
          message: data.message,
        },
      })
      .then((res) => {
        // console.log(res.data);
        orderResult.success = res.data.success;
        orderResult.message = res.data.message;
        orderResult.total = res.data.total;
        orderResult.create_at = res.data.create_at;
        orderResult.orderId = res.data.orderId;
        return res.data.success;
      })
      .catch((err) => {
        console.dir(err);
      });
  }

  function handleGetOrderList() {
    axios
      .get(`${baseUrl}api/${apiPath}/orders`)
      .then((res) => {
        // console.log(res.data);
        orderList.success = res.data.success;
        orderList.orders = res.data.orders;
        orderList.pagination = res.data.pagination;
        orderList.message = res.data.message;
      })
      .catch((err) => {
        console.dir(err);
      });
  }

  return {
    orderResult,
    orderList,
    handleSendOrder,
    handleGetOrderList,
  };
});
export default useOrderStore;
