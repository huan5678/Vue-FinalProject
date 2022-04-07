<script>
import { reactive, ref } from 'vue';
import { zhTW } from 'date-fns/locale';
import Datepicker from 'vue3-datepicker';

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

    const dateStye = {
      '--vdp-bg-color': '#ffffff',
      '--vdp-text-color': '#151625',
      '--vdp-box-shadow': '0 4px 10px 0 rgba(128, 144, 160, 0.1), 0 0 1px 0 rgba(128, 144, 160, 0.81)',
      '--vdp-border-radius': '.25rem',
      '--vdp-heading-size': '2.5em',
      '--vdp-heading-weight': 'bold',
      '--vdp-heading-hover-color': '#eaeaed',
      '--vdp-arrow-color': 'currentColor',
      '--vdp-elem-color': '#191a2d',
      '--vdp-disabled-color': '#aaabb7',
      '--vdp-hover-color': '#ffffff',
      '--vdp-hover-bg-color': '#dd8f11',
      '--vdp-selected-color': '#ffffff',
      '--vdp-selected-bg-color': '#f59f13',
      '--vdp-elem-font-size': '0.8em',
      '--vdp-elem-border-radius': '50%',
      '--vdp-divider-color': '#6a6b81',
    };

    return {
      bookingImage01,
      bookingImage02,
      data,
      handleOpenLoading,
      isOpenLoading,
      date,
      zhTW,
      dateStye,
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
    :lowerLimit="new Date()"
    :locale="zhTW"
    inputFormat="MM月dd日E"
    :style="dateStye"
    />
  </section>
</template>
