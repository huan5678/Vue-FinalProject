<script>
import { ref } from 'vue';

export default {
  setup() {
    const email = ref('');
    const handleSubscribed = function (emailSet) {
      let subscribedEmailArr = [];
      subscribedEmailArr = JSON.parse(localStorage.getItem('subscribedEmail')) || [];
      if (subscribedEmailArr.findIndex(emailSet) === -1) {
        subscribedEmailArr.push(emailSet);
        localStorage.setItem('subscribedEmail', JSON.stringify(subscribedEmailArr));
        email.value = '';
      }
    };
    return {
      email,
      handleSubscribed,
    };
  },
};
</script>

<template>
    <aside class="p-12 bg-secondary-200 sm:p-16 lg:p-24">
      <div class="max-w-xl mx-auto text-center">
        <p class="rfs:text-lg font-normal text-secondary-400">
          不要錯過第一手最新消息
        </p>

        <p class="mt-2 rfs:text-2xl font-thin text-secondary-600 sm:text-4xl">
          現在訂閱電子報由時未晚
        </p>

        <form class="mt-8 sm:flex" @submit.prevent="handleSubscribed(email)">
          <div class="sm:flex-1">
            <label for="email" class="sr-only">Email</label>
            <input
              type="email"
              placeholder="請輸入電子郵件信箱"
              class="form-control w-full p-3 border-2 border-gray-700 rounded-lg"
              v-model="email"
            />
          </div>

          <button
            type="submit"
            class="flex items-center justify-between w-full px-5 py-3 mt-4
            font-medium text-white bg-primary-600 rounded-lg
            sm:w-auto sm:mt-0 sm:ml-4 hover:bg-primary-500"
          >
            訂閱電子報

            <i class="bi bi-envelope-plus text-2xl ml-3"></i>
          </button>
        </form>
      </div>
    </aside>
</template>
