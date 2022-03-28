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
  <div class="fixed right-0 bottom-0
  translate-x-1/4 -translate-y-1/4 tooltip" data-tip="驚喜大轉盤">
    <SvgLoader
    name="Roulette"
    class="scale-50 active:scale-75
    transition-all duration-500 ease-[cubic-bezier(0.18,0.89,0.32,1.28)]" />
  </div>
  <AppRoulette ref="wheel" :items="items" @click="launchWheel" />
</template>
