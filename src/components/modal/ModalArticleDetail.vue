<script>
import { computed, ref } from 'vue';
import useStore from '@/stores';
import useHelper from '@/helpers';
import ModalCardTitle from './ModalCardTitle.vue';

export default {
  components: { ModalCardTitle },
  props: { products: Object },
  setup(props, context) {
    const { adminDataStore } = useStore();
    const { functionSelected, adminData } = adminDataStore;
    const { getDate } = useHelper();

    function closeModal() {
      context.attrs.handleOpenModal(false);
    }
    const tagList = ref({
      whisky: '威士忌',
      gin: '琴酒',
      vodka: '伏特加',
      tequila: '龍舌蘭',
      rum: '蘭姆酒',
      brandy: '白蘭地',
    });

    return {
      selectType: computed(() => functionSelected.selected),
      articleData: computed(() => adminData.tempProduct),
      tagList,
      handleOpenModal: context.attrs.handleOpenModal,
      closeModal,
      getDate,
    };
  },
};
</script>

<template>
  <section class="flex overflow-hidden flex-col pb-4 space-y-4 bg-gray-50 rounded-md">
    <ModalCardTitle
      title="文章詳細內容"
      className="bg-primary-600"
      :close-modal="handleOpenModal"
    />
    <div class="flex justify-between p-4">
      <div class="p-2 divide-y">
        <span class="block text-sm">文章標籤</span>
        <h2 class="text-2xl font-medium">{{articleData?.title}}</h2>
      </div>
      <div class="p-2 divide-y">
        <span class="block text-sm">文章副標題</span>
        <h2 class="text-2xl font-medium">{{articleData?.description}}</h2>
      </div>
      <div class="p-2 divide-y">
        <span class="block text-sm">文章作者</span>
        <h2 class="text-2xl font-medium">{{articleData?.author}}</h2>
      </div>
      <div class="p-2 divide-y">
        <span class="block text-sm">文章標籤</span>
        <h2 class="text-2xl font-medium">{{ tagList[articleData?.tag]}}</h2>
      </div>
    </div>
    <div class="flex flex-col p-4">
      <h2 class="text-2xl font-medium">文章圖片</h2>
      <img :src="articleData?.image" class="max-h-48 object" :alt="articleDate?.title">
    </div>
    <div class="flex justify-between p-4">
      <div class="p-2 divide-y">
        <h2 class="text-2xl text-medium">文章內文</h2>
        <p class="">{{articleData?.content}}</p>
      </div>
    </div>
    <div class="flex justify-between p-4">
      <div class="p-2 divide-y">
        <span class="block text-sm">文章是否公開</span>
        <label for="toggle" class="flex items-center mb-4">
        <input type="checkbox"
        class="rounded"
        id="toggle"
        :checked="articleData?.isPublic"
        disabled>
        <span class="ml-3 text-sm font-medium text-gray-900">
          {{ articleData?.isPublic === true ? '公開' : '未公開' }}
        </span>
        </label>
      </div>
      <div class="p-2 divide-y">
        <span class="block text-sm">文章新增日期</span>
        <h2 class="text-2xl font-medium">{{ getDate(articleData?.created_at) }}</h2>
      </div>
    </div>
  </section>
</template>
