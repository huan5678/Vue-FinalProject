<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'FrontEndView',
  components: { TheHeader, TheFooter },
};
</script>

<template>
  <TheHeader />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  <TheFooter />
</template>
