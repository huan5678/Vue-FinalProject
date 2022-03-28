<script>
import { reactive, toRef } from 'vue';

export default {
  props: {
    active: String,
  },
  setup(props) {
    // console.log(props.active);
    const data = reactive([
      {
        title: 'STEP1',
        content: '確認訂單',
      },
      {
        title: 'STEP2',
        content: '建立訂單',
      },
      {
        title: 'STEP3',
        content: '完成訂單',
      },
    ]);
    const action = toRef(props, 'active');
    return {
      data,
      action,
    };
  },
};
</script>

<template>
  <div class="container">
    <ul class="flex justify-between gap-4">
      <li v-for="(item, idx) in data" :key="item.title"
      class="p-2 rfs:text-base md:rfs:text-lg font-light text-center flex-grow"
      :class="action === String(idx + 1) ?
      `bg-secondary-500 text-primary-300` : `border-secondary-700 text-secondary-400`">
      <span class="block py-2 px-4 lg:py-4 lg:px-10 border"
      :class="action === String(idx + 1) ?
      `border-primary-300` : `border-secondary-400`"
      >
      <span class="tracking-[.25rem]">{{item.title}}</span><br />{{item.content}}
      </span>
    </li>
  </ul>

  </div>
</template>
