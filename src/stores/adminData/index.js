import { reactive, inject } from 'vue';
import { defineStore } from 'pinia';
import { useAdminStore } from '@/stores/admin';

export const useAdminDataStore = defineStore('adminData', () => {
  const axios = inject('axios');
  const baseUrl = process.env.VUE_APP_API_URL;
  const apiPath = process.env.VUE_APP_API_PATH;

  const adminData = reactive({
    selectedTarget: 'product',
    selectedTargetIndex: 0,
    dataList: [],
    pagination: {},
    currentPage: 1,
    category: null,
    tempProduct: {},
    isOpenModal: false,
  });

  const functionSelected = reactive({
    selected: '',
  });

  function handleResetTempProduct() {
    adminData.tempProduct = {};
  }

  function handleSelectFunction(selected, item) {
    functionSelected.selected = selected;
    adminData.tempProduct = item;
  }

  function handleControlModal(boolean = false) {
    adminData.isOpenModal = boolean;
  }

  const adminStore = useAdminStore();

  /*
  GET products/all, products, orders, coupons, articles, article/{id}
  POST product, order/{id}, coupon, article
  PUT product/{id}, order/{id}, coupon/{id}, article/{id}
  DELETE product/{id}, orders/all, coupons/{id}, article/{id}
  */

  function handleGetDataAll() {
    let target = adminData.selectedTarget;
    switch (target) {
      case 'product':
        target = 'products/all';
        break;
      case 'order':
        target = 'orders';
        break;
      case 'coupon':
        target = 'coupons';
        break;
      case 'article':
        target = 'articles';
        break;
      default:
        target = 'products';
        break;
    }
    axios
      .get(`${baseUrl}api/${apiPath}/admin/${adminData.selectedTarget}`, {
        token: adminStore.token,
      })
      .then((res) => {
        // console.log(res.data);
        adminData.dataList = res.data[`${target}`];
      })
      .catch((err) => {
        console.dir(err);
      });
  }
  // GET products/all, products, orders, coupons, articles, article/{id}
  function handleGetDataList(page = adminData.currentPage, category = adminData.category) {
    let target = adminData.selectedTarget;
    switch (target) {
      case 'product':
        target = 'products';
        break;
      case 'order':
        target = 'orders';
        break;
      case 'coupon':
        target = 'coupons';
        break;
      case 'article':
        target = 'articles';
        break;
      default:
        target = 'products';
        break;
    }
    let productCategory = category;
    if (category === null) {
      productCategory = '';
    }
    axios
      .get(
        `${baseUrl}api/${apiPath}/admin/${target}/${
          target !== 'product' ? `?page=${page}` : ''
        }${productCategory}`,
        {
          token: adminStore.token,
        },
      )
      .then((res) => {
        // console.log(res.data);
        adminData.dataList = res.data[`${target}`];
        adminData.pagination = res.data.pagination;
      })
      .catch((err) => {
        console.dir(err);
      });
  }

  function handleEditData(id, data) {
    axios
      .put(`${baseUrl}api/${apiPath}/admin/${adminData.selectedTarget}/${id}`, data, {
        token: adminStore.token,
      })
      .then(() => {
        handleGetDataList();
      })
      .catch((err) => {
        console.dir(err);
      });
  }

  function handleDeleteData(id = null) {
    let target = adminData.selectedTarget;
    switch (target) {
      case 'order':
        target = 'orders/all';
        break;
      case 'coupon':
        target = 'coupon';
        break;
      default:
        target = 'products';
        break;
    }
    axios
      .delete(`${baseUrl}api/${apiPath}/admin/${target}/${id}`, { token: adminStore.token })
      .then(() => {
        handleGetDataList();
      })
      .catch((err) => {
        console.dir(err);
      });
  }

  function handleCreateData(data) {
    axios
      .post(`${baseUrl}api/${apiPath}/admin/${adminData.selectedTarget}`, data, {
        token: adminStore.token,
      })
      .then(() => {
        handleGetDataList(adminData.currentPage);
      })
      .catch((err) => {
        console.dir(err);
      });
  }

  function handleImageUpload(file) {
    const formData = new FormData();
    formData.append('file-to-upload', file);
    return axios.post(`${baseUrl}api/${apiPath}/admin/upload`, formData, {
      token: adminStore.token,
    });
  }

  return {
    adminData,
    functionSelected,
    handleControlModal,
    handleCreateData,
    handleGetDataAll,
    handleGetDataList,
    handleEditData,
    handleDeleteData,
    handleImageUpload,
    handleSelectFunction,
    handleResetTempProduct,
  };
});
export default useAdminDataStore;
