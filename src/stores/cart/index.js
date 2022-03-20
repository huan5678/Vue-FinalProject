import { reactive, ref, inject } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  const axios = inject('axios');
  const baseUrl = process.env.VUE_APP_API_URL;
  const apiPath = process.env.VUE_APP_API_PATH;
  const cartData = reactive({
    data: {},
    message: '',
    list: [],
    totalPrice: 0,
    finalPrice: 0,
    isOpenCart: false,
  });

  const isLoading = ref('');

  function handleGetCart() {
    axios
      .get(`${baseUrl}api/${apiPath}/cart`)
      .then((res) => {
        // console.log(res.data);
        cartData.list = res.data.data.carts;
        cartData.totalPrice = res.data.data.total;
        cartData.finalPrice = res.data.data.final_total;
      })
      .catch((err) => {
        console.dir(err);
      });
  }

  function handleAddCart(id, qty = 1) {
    isLoading.value = id;
    axios
      .post(`${baseUrl}api/${apiPath}/cart`, {
        data: {
          product_id: id,
          qty,
        },
      })
      .then((res) => {
        // console.log(res.data);
        cartData.data = res.data.data;
        cartData.message = res.data.message;
        isLoading.value = '';
        handleGetCart();
      })
      .catch((err) => {
        console.dir(err);
        isLoading.value = '';
      });
  }

  function handleDeleteCart(id) {
    isLoading.value = id;
    axios
      .delete(`${baseUrl}api/${apiPath}/cart/${id}`)
      .then((res) => {
        // console.log(res.data);
        cartData.message = res.data.message;
        isLoading.value = '';
        handleGetCart();
      })
      .catch((err) => {
        console.dir(err);
        isLoading.value = '';
      });
  }

  function handleUpdateCart(id, qty) {
    isLoading.value = id;
    axios
      .put(`${baseUrl}api/${apiPath}/cart/${id}`, {
        data: {
          product_id: id,
          qty,
        },
      })
      .then((res) => {
        // console.log(res.data);
        cartData.message = res.data.message;
        isLoading.value = '';
        handleGetCart();
      })
      .catch((err) => {
        console.dir(err);
        isLoading.value = '';
      });
  }

  function handleClearCart() {
    axios
      .delete(`${baseUrl}api/${apiPath}/carts`)
      .then((res) => {
        // console.log(res.data);
        cartData.message = res.data.message;
        handleGetCart();
      })
      .catch((err) => {
        console.dir(err);
      });
  }

  return {
    cartData,
    isLoading,
    handleAddCart,
    handleGetCart,
    handleDeleteCart,
    handleUpdateCart,
    handleClearCart,
  };
});
export default useCartStore;
