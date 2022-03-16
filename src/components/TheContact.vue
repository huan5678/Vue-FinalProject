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
        <p class="text-sm font-normal text-secondary-400">
          不要錯過第一手最新消息
        </p>

        <p class="mt-2 text-3xl font-thin text-secondary-600 sm:text-4xl">
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

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="flex-shrink-0 w-4 h-4 ml-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </form>
      </div>
    </aside>
</template>
