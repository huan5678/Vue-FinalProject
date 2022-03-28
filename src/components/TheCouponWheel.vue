<script>
import { ref } from 'vue';

export default {
  setup() {
    const wheel = ref(null);

    const items = [
      {
        id: 1,
        name: '老闆請你喝一杯',
        htmlContent: '老闆請你喝一杯',
        textColor: '#151625',
        background: '#f59f13',
      },
      {
        id: 2,
        name: '滿千打8折',
        htmlContent: '滿千打8折',
        textColor: '#fde7c4',
        background: '#151625',
      },
      {
        id: 3,
        name: '你最棒了',
        htmlContent: '你最棒了',
        textColor: '#151625',
        background: '#f59f13',
      },
      {
        id: 4,
        name: '神秘驚喜大禮包',
        htmlContent: '神秘驚喜大禮包',
        textColor: '#fde7c4',
        background: '#151625',
      },
    ];

    function launchWheel() {
      wheel.value.launchWheel();
    }

    return {
      items,
      wheel,
      launchWheel,
    };
  },
};
</script>

<template>
  <button
    type="button"
    class="group fixed right-4 bottom-16 gap-2 bg-primary-700 hover:bg-primary-500
    border-none btn btn-circle"
  >
    <i
      class="text-xl transition-all duration-700
      ease-in-out group-hover:scale-125 bi
      bi-postcard-heart"
    ></i>
  </button>
  <AppRoulette ref="wheel" :items="items" @click="launchWheel" />
</template>
