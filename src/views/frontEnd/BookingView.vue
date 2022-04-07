<script>
import { reactive, ref } from 'vue';
import { zhTW } from 'date-fns/locale';
import Datepicker from '@vuepic/vue-datepicker';

import '@vuepic/vue-datepicker/dist/main.css';
import bookingImage01 from '@/assets/images/bookingImage01.jpg';
import bookingImage02 from '@/assets/images/bookingImage02.jpg';
import useHelper from '@/helpers';

export default {
  components: { Datepicker },
  setup() {
    const { handleSweetAlert, closeToast } = useHelper();
    const isOpenLoading = ref(false);
    const date = ref();

    const data = reactive({
      title: '成功',
      content: '送出預定',
      icon: 'info',
    });

    function handleOpenLoading() {
      handleSweetAlert(data);
      isOpenLoading.value = true;
      setTimeout(() => {
        isOpenLoading.value = false;
        closeToast();
      }, 5000);
    }

    return {
      bookingImage01,
      bookingImage02,
      data,
      handleOpenLoading,
      isOpenLoading,
      date,
      zhTW,
    };
  },
};
</script>

<template>
  <section class="min-h-screen bg-center bg-cover"
  :style="{ backgroundImage: `url(${bookingImage01})` }">
    <AppLoading :openLoading="isOpenLoading" />
    <button type="button" class="btn" @click="handleOpenLoading">Click Toast</button>
    <Datepicker v-model="date"
    :minDate="new Date()"
    dark
    menuClassName="dp-menu"
    calendarCellClassName="dp-primary"
    multiDates
    :format-locale="zhTW"
    format="E"
    />
  </section>
</template>
<style lang="scss">
.dp-menu {
  box-shadow: 0 0 .5rem #f8bc5a;
}
.dp-primary {
  &:hover {
    background-color: #f8bc5a;
    border-radius: 50%;
    color: #eaeaed;
  }
}
.dp__active_date.dp-primary {
  background-color: #dd8f11;
  border-radius: 50%;
  color: #eaeaed;
}

.dp__today.dp-primary{
  border: 1px solid #dd8f11;
}
</style>
