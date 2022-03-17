<script>
import { ref } from 'vue';

export default {
  setup() {
    const showAlert = ref(true);
    const handleCloseAlert = function () {
      showAlert.value = false;
    };
    return {
      showAlert,
      handleCloseAlert,
    };
  },
};
</script>

<template>
<div class="fixed w-full bottom-0" v-if="showAlert">
  <div class="py-3 px-2 w-full
    flex justify-center items-center gap-6
  text-white bg-primary-400/70">
    <div class="container mx-auto whitespace-nowrap w-full overflow-hidden"
    >
      <p class="text-sm font-medium text-left sm:text-center
      inline-block
      " v-for="item in 4" :key="item"
      >
        <span class="mx-2">禁止酒駕</span>
        <SvgLoader name="dontDrunkDrive" class="inline h-8 w-8 mx-2" />
        <span class="mx-2">酒後不開車</span>
        <span class="mx-2">安全有保障</span>
        <span class="mx-2">未滿18歲請勿飲酒</span>
        <span class="mx-2">飲酒過量</span>
        <span class="mx-2">有害健康</span>
      </p>
    </div>

    <button
      aria-label="Close"
      class="transition rounded-lg
      bg-primary-700/30 hover:bg-primary-900/40 py-1 px-3"
      @click="handleCloseAlert"
    >
      <i class="bi bi-x-lg rfs:text-lg"></i>
    </button>
  </div>
</div>
</template>
<style scoped>
p{
  animation: marquee 8s linear infinite;
}
@keyframes marquee {
    0%   { transform: translate(0%, 0); }
    100% { transform: translate(-100%, 0); }
}
</style>
