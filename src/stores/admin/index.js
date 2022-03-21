import { ref, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAdminStore = defineStore('admin', () => {
  const vueAxios = inject('axios');
  const baseUrl = process.env.VUE_APP_API_URL;
  const token = ref('');
  const expired = ref('');
  const isLoggedIn = ref(false);
  const router = useRouter();
  const params = useRoute();

  function handleCheckUser() {
    axios.defaults.headers.common.Authorization = token.value;
    vueAxios
      .post(`${baseUrl}api/user/check`)
      .then((res) => {
        isLoggedIn.value = res.data.success;
        if (params.name !== 'admin') {
          router.push('admin');
        }
      })
      .catch((err) => {
        console.dir(err);
        isLoggedIn.value = err.response.data.success;
        if (params.name === 'admin') {
          router.push('login');
        }
      });
  }

  function handleGetToken() {
    const cookies = document.cookie.split('; backendToken=');
    const cookie2 = cookies.shift().split(';');
    cookie2.forEach((c) => {
      if (c.trim().startsWith('backendToken=')) {
        token.value = c.trim().split('=')['1'];
      }
    });
    return cookies;
  }

  function handleSetLogin(data) {
    token.value = data.token;
    expired.value = data.expired;
    isLoggedIn.value = true;
    document.cookie = `backendToken=${data.token}; expires=${new Date(data.expired)};`;
  }
  function handleSetLogout() {
    isLoggedIn.value = false;
    token.value = '';
    expired.value = '';
    vueAxios.post(`${baseUrl}api/user/logout`);
  }

  function handleClearToken() {
    document.cookie = `backendToken=; expires=${new Date(0)};`;
  }

  return {
    token,
    expired,
    isLoggedIn,
    handleSetLogin,
    handleSetLogout,
    handleCheckUser,
    handleGetToken,
    handleClearToken,
  };
});
export default useAdminStore;
