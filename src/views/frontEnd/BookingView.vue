<script>
import {
  reactive,
  ref,
  onMounted,
  computed,
  watch,
} from 'vue';
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
    const {
      datesData,
      handleGetBookingDataAll,
      handleCreateBookingData,
    } = bookingStore;
    const isOpenLoading = computed(() => datesData.isLoading);
    const phoneRegex = /09\d{2}-?\d{3}-?\d{3}/;
    const schema = Yup.object().shape({
      userName: Yup.string().trim().required('請輸入姓名'),
      userEmail: Yup.string().trim().email('請輸入正確的Email信箱').required('請輸入Email'),
      userPhone: Yup.string()
        .test('phone', '請輸入正確的10碼手機號碼(09...)', (value) => phoneRegex.test(value))
        .required('請輸入電話號碼'),
    });

    const bookingDate = ref({});
    const userRemark = ref('');
    const selectedDate = ref();

    const message = reactive({
      title: '成功',
      content: '送出預定',
      icon: 'info',
    });

    const selectedDates = ref([]);

    function handleDateSet(date, Fn) {
      let time = date;
      if (Fn === 'Add') {
        time = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      }
      const idx = selectedDates.value.findIndex((dates) => dates === time);
      if (idx === -1) {
        if (Fn === 'Add') {
          selectedDates.value.push(time);
        }
      }
      if (Fn === 'Remove') {
        selectedDates.value.splice(idx, 1);
      }
    }

    watch(isOpenLoading, (newVal) => {
      if (newVal) {
        handleSweetAlert(message);
      } else {
        setTimeout(() => {
          closeToast();
        }, 5000);
      }
    });

    function handleSubmit(data, actions) {
      const bookingData = {
        data: {
          name: data.userName,
          email: data.userEmail,
          tel: data.userPhone,
          address: data.userAddress,
          message: userRemark.value,
          dates: selectedDates,
        },
      };
      handleCreateBookingData(bookingData);
      userRemark.value = '';
      actions.resetForm();
    }

    onMounted(() => {
      handleGetBookingDataAll();
    });

    return {
      bookingImage01,
      bookingImage02,
      handleSubmit,
      schema,
      userRemark,
      bookingDate,
      selectedDate,
      selectedDates,
      handleDateSet,
      dateList: computed(() => datesData.bookingList),
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
              :validationSchema="schema"
              class="space-y-2 font-light order-1 md:order-none md:w-2/3 form-control h-full"
              @submit="handleSubmit"
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
                class="form-style textarea w-full"
                v-model="userRemark"
                rows="4"
                placeholder="是否有其他需求"
              ></textarea>
              <button
                type="submit"
                class="w-full text-xl font-normal text-secondary-50
                bg-secondary-300 hover:bg-primary-700
                rounded border-none btn"
                :class="
                selectedDates.length === 0 ?
                'opacity-30 cursor-not-allowed hover:bg-secondary-300': ''"
                :disable="selectedDates.length === 0"
              >
                送出預約
              </button>
            </Form>
            <div class="flex-auto space-y-2 w-full h-full
            max-w-screen-md md:order-none order-0">
              <h3 :class="selectedDates.length === 0 ? 'opacity-0': 'opacity-100'"
                class="text-lg font-normal text-center
            transition-all duration-500">選擇預定日期</h3>
              <div class="flex gap-2 flex-wrap">
                <button v-for="date in selectedDates"
                :key="date"
                type="button"
                class="btn gap-4"
                @click="handleDateSet(date, 'Remove')">
                {{ date }}
                <i class="bi bi-x-lg text-xl" />
                </button>
              </div>
              <vue-cal
              activeView="month"
              xsmall
              :selectedDate="selectedDate"
              today-button
              locale="zh-hk"
              :time="false"
              :disableViews="['years', 'year', 'day']"
              :minDate="new Date()"
              @cellClick="selectedDate = $event; handleDateSet($event, 'Add')"
              >
              <template v-slot:arrow-prev>
                <div class="tooltip tooltip-right" data-tip="上個月">
                  <i aria-hidden="true"
                  class="bi bi-arrow-left-square-fill
                  text-2xl text-primary-400 hover:text-primary-600
                  transition duration-500" />
                </div>
              </template>
              <template v-slot:arrow-next>
                <div class="tooltip tooltip-left" data-tip="下個月">
                  <i aria-hidden="true"
                  class="bi bi-arrow-right-square-fill
                  text-2xl text-primary-400 hover:text-primary-600
                  transition duration-500" />
                </div>
              </template>
              <template v-slot:today-button>
                <div class="tooltip" data-tip="返回今天">
                  <button type="button"
                  class="btn btn-square btn-ghost
                  hover:bg-transparent
                  ">
                    <i class="bi bi-at text-2xl" />
                  </button>
                </div>
              </template>
              </vue-cal>
            </div>
          </div>
        </div>
        <button type="button" class="btn" @click="handleOpenLoading">Click Toast</button>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.vuecal {
  @apply border-none rounded overflow-hidden
}
.vuecal__cell-content {
  @apply p-2
}
.vuecal__menu, .vuecal__cell-events-count {
  @apply bg-primary-400 text-primary-100
}
.vuecal__title-bar {
  @apply bg-primary-200
}
.vuecal__cell--today, .vuecal__cell--current {
  @apply bg-primary-500 text-primary-50
}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  @apply bg-primary-200
}
.vuecal__cell--selected:before {
  @apply border-primary-500
}
.vuecal__event-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 4px 0 8px;
}
.vuecal__no-event {
  @apply text-secondary-700
}
</style>
