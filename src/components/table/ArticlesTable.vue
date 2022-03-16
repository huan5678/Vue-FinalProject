<script>
import { computed, ref } from 'vue';
import useStore from '@/stores';

export default {
  setup() {
    const { adminDataStore } = useStore();
    const { adminData, handleGetDataList, handleSelectFunction } = adminDataStore;
    const tempProduct = ref({
      title: '',
      author: '',
      isPublic: false,
      content: '',
      description: '',
      create_at: '',
      is_enabled: '',
      image: '',
      tag: [],
    });

    function openModal(selected, item) {
      adminData.isOpenModal = true;
      handleSelectFunction(selected, item);
    }

    return {
      handleGetDataList,
      openModal,
      tempProduct,
      adminData: computed(() => adminData),
    };
  },
};
</script>
<template>
  <table class="mb-4 bg-gray-50 rounded table-auto">
    <thead class="bg-gray-800">
      <tr class="text-white">
        <td width="200" class="p-4 text-lg whitespace-nowrap">文章標題</td>
        <td width="250" class="p-4 text-lg text-right whitespace-nowrap">副標題</td>
        <td width="250" class="p-4 text-lg text-right whitespace-nowrap">標籤</td>
        <td width="250" class="p-4 text-lg text-center whitespace-nowrap">是否公開</td>
        <td colspan="3" width="400" class="p-4 text-lg text-center whitespace-nowrap">功能</td>
      </tr>
    </thead>
    <tbody>
      <tr
        class="hover:bg-gray-200 border-b border-gray-300"
        v-for="item in adminData.dataList"
        :key="item.id"
      >
        <td class="py-2 px-4 whitespace-nowrap">{{ item.title }}</td>
        <td class="py-2 px-4 text-right whitespace-nowrap">{{ item.description }}</td>
        <td class="py-2 px-4 text-right whitespace-nowrap">{{ item.tag }}</td>
        <td
          class="py-2 px-4 text-center whitespace-nowrap"
          :class="item.isPublic ? 'text-secondary-300' : 'text-primary-600'"
        >
          {{ item.isPublic ? '公開' : '未公開' }}
        </td>
        <td class="py-2 px-4 text-center whitespace-nowrap">
          <button
            type="button"
            class="py-2 px-4 text-primary-500 hover:text-primary-50 hover:bg-primary-600
            rounded border border-primary-500 hover:shadow
            hover:shadow-primary-400 transition duration-200"
            @click="openModal('getArticleDetail', item)"
          >
            查看內容
          </button>
        </td>
        <td class="py-2 px-4 text-center whitespace-nowrap">
          <button
            type="button"
            class="py-2 px-4 text-secondary-50 bg-secondary-400 hover:bg-secondary-500
            rounded hover:shadow
            hover:shadow-secondary-400 transition duration-200"
            @click="openModal('articleEdit', item)"
          >
            修改內容
          </button>
        </td>
        <td class="py-2 px-4 text-center whitespace-nowrap">
          <button
            type="button"
            class="py-2 px-4 text-secondary-400 hover:text-white hover:bg-secondary-500 rounded
            border border-secondary-300 hover:border-transparent hover:shadow
            hover:shadow-secondary-400 transition duration-200"
            @click="openModal('productDelete', item)"
          >
            刪除文章
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex justify-between items-center">
    <p>目前有{{ adminData.dataList.length }}篇文章</p>
    <button
      type="button"
      class="py-2 px-4 text-primary-500 hover:text-primary-50 hover:bg-primary-600
        rounded border border-primary-500 hover:shadow
        hover:shadow-primary-400 transition duration-200"
      @click="openModal('articleCreate', tempProduct)"
    >
      新增文章
    </button>
  </div>
</template>
