<script>
import { computed } from 'vue';
import { RouterLink, useLink } from 'vue-router';

export default {
  props: {
    ...RouterLink.props,
  },
  setup(props) {
    const {
      route,
      href,
      isActive,
      isExactActive,
      navigate,
    } = useLink(props);
    const isExternalLink = computed(
      () => typeof props.to === 'string' && props.to.startsWith('http'),
    );
    return {
      isExternalLink, href, navigate, isActive, route, isExactActive,
    };
  },
};
</script>

<template>
  <a v-if="isExternalLink" v-bind="$attrs"
  rel="noopener" :href="to" target="_blank">
    <slot />
  </a>
  <router-link
    v-else
    v-bind="$props"
    class="py-2 px-3 text-gray-500 border-b-2 border-transparent
    transition duration-300 ease-in-out font-normal md:font-thin"
    :class="
      isActive
        ? `border-primary-300 text-primary-400 disabled cursor-default`
        : `text-gray-300 hover:border-primary-400 hover:text-primary-400 focus:border-primary-400`
    "
  >
    <slot />
  </router-link>
</template>
