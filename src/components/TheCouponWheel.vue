<script>
import { ref, onMounted } from 'vue';
import useStore from '@/stores';

export default {
  setup(){
    const wheel = ref(null);
    const { adminDataStore } = useStore();
    const { adminData, handleGetDataList } = adminDataStore;

    onMounted(() => {
      adminData.selectedTarget = 'coupon';
      handleGetDataList();
    })

    const items = computed(()=>adminData.dataList);

    function launchWheel(){
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
  <AppRoulette ref="wheel" :items="items" @click="launchWheel" />
</template>
