<script>
import { reactive, ref } from 'vue';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import VueCal from 'vue-cal';
import 'vue-cal/dist/i18n/zh-hk';
import 'vue-cal/dist/vuecal.css';

import InputField from '@/utils/InputField.vue';
import useStore from '@/stores';
import bookingImage01 from '@/assets/images/bookingImage01.jpg';
import bookingImage02 from '@/assets/images/bookingImage02.jpg';
import useHelper from '@/helpers';

export default {
  components: {
    InputField,
    Form,
    VueCal,
  },
  setup() {
    const { handleSweetAlert, closeToast } = useHelper();
    const { bookingStore } = useStore();
    const { handleCreateBookingData } = bookingStore;
    const isOpenLoading = ref(false);
    const phoneRegex = /09\d{2}-?\d{3}-?\d{3}/;
    const schema = Yup.object().shape({
      userName: Yup.string().trim().required('請輸入姓名'),
      userEmail: Yup.string().trim().email('請輸入正確的Email信箱').required('請輸入Email'),
      userPhone: Yup.string()
        .test('phone', '請輸入正確的10碼手機號碼(09...)', (value) => phoneRegex.test(value))
        .required('請輸入電話號碼'),
    });

    const bookingDate = ref([]);
    const userRemark = ref('');

    const message = reactive({
      title: '成功',
      content: '送出預定',
      icon: 'info',
    });

    function handleSubmit(data) {
      const bookingData = {
        name: data.userName,
        email: data.userEmail,
        tel: data.userPhone,
        address: data.userAddress,
        message: userRemark.value,
      };
      handleCreateBookingData(bookingData);
    }

    function handleOpenLoading() {
      handleSweetAlert(message);
      isOpenLoading.value = true;
      setTimeout(() => {
        isOpenLoading.value = false;
        closeToast();
      }, 5000);
    }

    return {
      bookingImage01,
      bookingImage02,
      handleSubmit,
      schema,
      userRemark,
      handleOpenLoading,
      isOpenLoading,
      bookingDate,
    };
  },
};
</script>

<template>
  <section
    class="relative py-12 min-h-screen bg-fixed bg-center bg-no-repeat bg-cover"
    :style="{
      backgroundImage: `
        linear-gradient(rgba(21,22,37,1), rgba(21,22,37,0), rgba(21,22,37,1)),
        url(${bookingImage01})`,
    }"
  >
    <div class="container">
      <div class="mx-auto card bg-base-100">
        <div class="space-y-4 card-body">
          <AppTitle class="mb-6" level="1">預約訂位</AppTitle>
          <p class="text-xl rfs:text-base text-center">
            想要辦PARTY，生日慶功宴，不想要被人打擾，已經財富自由想包場，歡迎進行預約。
          </p>
          <div class="flex flex-col gap-6 justify-between md:flex-row">
            <Form
              action
              @submit="handleSubmit"
              :validation-schema="schema"
              class="order-1 space-y-2 font-light md:order-none md:w-2/3 form-control"
            >
              <legend>
                <h3 class="text-lg font-normal text-center">請填寫預約資料</h3>
              </legend>
              <div class="flex gap-4 justify-between items-start mb-6">
                <InputField
                  name="userName"
                  type="text"
                  label="訂位人姓名"
                  required
                  placeholder="請輸入姓名"
                />
                <InputField
                  name="userPhone"
                  type="tel"
                  maxlength="10"
                  label="訂位電話"
                  required
                  placeholder="請輸入電話"
                />
              </div>
              <InputField
                name="userEmail"
                type="email"
                label="Email"
                required
                placeholder="請輸入Email"
              />
              <label for="userRemark" class="label">
                <span class="label-text">備註事項</span>
              </label>
              <textarea
                id="userRemark"
                name="userRemark"
                class="w-full form-style input"
                v-model="userRemark"
                rows="4"
                placeholder="是否有其他需求"
              ></textarea>
              <button
                type="submit"
                class="w-full text-xl font-normal text-secondary-50
                bg-secondary-300 hover:bg-primary-700
                rounded border-none btn"
              >
                送出預約
              </button>
            </Form>
            <div class="flex-auto space-y-2 w-full max-w-screen-md md:order-none order-0">
              <vue-cal
              activeView="month"
              xsmall
              locale="zh-hk"
              :time="false"
              :disableViews="['years', 'year', 'day']"
              :minDate="new Date()"
              >
              </vue-cal>
            </div>
          </div>
        </div>
        <button type="button" class="btn" @click="handleOpenLoading">Click Toast</button>
        <button type="button" @click="handleModal" class="btn">Click Modal</button>
      </div>
    </div>
  </section>
  <AppLoading :openLoading="isOpenLoading" />
</template>
