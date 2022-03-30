import { reactive, ref, inject } from 'vue';
import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', () => {
  const axios = inject('axios');
  const baseUrl = process.env.VUE_APP_API_URL;
  const apiPath = process.env.VUE_APP_API_PATH;
  const productList = reactive({
    products: [],
    pagination: {},
    currentPage: 1,
    productDetail: {},
    selectCategory: '',
  });
  const isLoading = ref('');
  const productCategory = ref([
    {
      title: '全品項',
      category: 'All',
    },
    {
      title: '伏特加',
      category: 'vodka',
    },
    {
      title: '琴酒',
      category: 'gin',
    },
    {
      title: '威士忌',
      category: 'whisky',
    },
    {
      title: '龍舌蘭',
      category: 'tequila',
    },
    {
      title: '蘭姆酒',
      category: 'rum',
    },
    {
      title: '白蘭地',
      category: 'brandy',
    },
  ]);

  function handleGetProductAll() {
    axios
      .get(`${baseUrl}api/${apiPath}/products/all`)
      .then((res) => {
        // console.log(res.data);
        productList.products = res.data.products;
        // res.data.products.forEach((product) => {
        //   if (!productCategory.value.includes(product.category)) {
        //     productCategory.value.push(product.category);
        //   }
        // });
      })
      .catch((err) => {
        console.dir(err);
      });
  }

  function handleGetProductList(category = '', page = productList.currentPage) {
    let selectCategory = category;
    if (category === 'All') {
      selectCategory = '';
    }
    console.log(selectCategory);
    axios
      .get(`${baseUrl}api/${apiPath}/products?page=${page}&category=${selectCategory}`)
      .then((res) => {
        // console.log(res.data);
        productList.products = res.data.products;
        productList.pagination = res.data.pagination;
      })
      .catch((err) => {
        console.dir(err);
      });
  }

  function handleGetProductDetail(id) {
    isLoading.value = id;
    axios(`${baseUrl}api/${apiPath}/product/${id}`)
      .then((res) => {
        // console.log(res.data);
        isLoading.value = '';
        productList.productDetail = res.data.product;
      })
      .catch((err) => {
        console.dir(err);
        isLoading.value = '';
      });
  }

  return {
    productList,
    handleGetProductAll,
    handleGetProductList,
    productCategory,
    handleGetProductDetail,
    isLoading,
  };
});
export default useProductStore;
