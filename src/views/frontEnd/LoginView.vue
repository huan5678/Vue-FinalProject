<script>
import {
  ref,
  inject,
  reactive,
  onBeforeMount,
} from 'vue';
import { useRouter } from 'vue-router';
import useStore from '@/stores';

export default {
  setup() {
    const baseUrl = process.env.VUE_APP_API_URL;
    const axios = inject('axios');
    const { adminStore } = useStore();
    const {
      handleSetLogin, handleCheckUser, handleGetToken,
    } = adminStore;
    const router = useRouter();
    const userName = ref('');
    const userPassword = ref('');
    const modalMessage = reactive({
      title: '',
      message: '',
      detail: '',
    });
    const openModal = ref(false);

    function handlerSubmit() {
      const username = userName.value;
      const password = userPassword.value;
      axios.post(`${baseUrl}admin/signin`, { username, password })
        .then((res) => {
          const data = {
            token: res.data.token,
            expired: res.data.expired,
          };
          handleSetLogin(data);
          modalMessage.message = res.data.message;
          modalMessage.title = '登入成功';
          openModal.value = true;
          setTimeout(() => {
            openModal.value = false;
            router.push('/admin');
          }, 3000);
        })
        .catch((err) => {
          console.dir(err);
          modalMessage.message = err.response.data.message;
          modalMessage.detail = err.response.data.error.message;
          modalMessage.title = '登入失敗';
          openModal.value = true;
        });
    }

    const handleCloseModal = function () {
      openModal.value = false;
    };

    onBeforeMount(() => {
      handleGetToken();
      handleCheckUser();
    });

    return {
      userName,
      userPassword,
      handlerSubmit,
      openModal,
      handleCloseModal,
      modalMessage,
    };
  },
};
</script>

<template>
  <main class="flex justify-center items-center h-screen bg-gray-50">
    <div class="container max-w-lg">
      <form class="p-8 space-y-8 bg-white rounded shadow-sm" @submit.prevent="handlerSubmit">
        <legend class="text-3xl font-medium
        tracking-wide text-center text-primary-600">管理者登入</legend>
        <div class="space-y-4">
          <label for="name" class="block font-normal">使用者帳號</label>
          <input
            id="name"
            type="text"
            name="userName"
            placeholder="請輸入帳號Email"
            v-model.trim="userName"
            class="p-2 w-full font-light text-primary-800 invalid:text-primary-600
            focus:text-primary-600 bg-gray-50 rounded
            border invalid:border-primary-600
            focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div class="space-y-4">
          <label for="password" class="block font-normal">使用者密碼</label>
          <input
            id="password"
            type="password"
            class="p-2 w-full font-light text-primary-800
            invalid:text-primary-600 focus:text-primary-600
            bg-gray-50 rounded border
            invalid:border-primary-600 focus:border-primary-500 focus:ring-primary-500"
            v-model="userPassword"
            placeholder="請輸入密碼"
          />
        </div>
        <button
          type="submit"
          class="py-4 w-full text-secondary-50 bg-secondary-400 hover:bg-secondary-600
          rounded-lg
          transition duration-300"
        >
          登入
        </button>
      </form>
    </div>
    <AlertModal v-model="openModal" @handleCloseModal="handleCloseModal">
      <template v-slot:title>{{ modalMessage.title }}</template>
      <p class="mb-2 text-center">{{ modalMessage.message }}</p>
      <p>{{ modalMessage.detail }}</p>
    </AlertModal>
  </main>
</template>
