<script>

export default {
  setup() {
    return {
    };
  },
};
</script>
<template>
  <section class="bg-secondary-900 pt-4 pb-8">
    <nav class="container flex flex-col justify-center">
      <ul class="flex flex-col justify-between items-center">
        <li>
          <SvgLoader name="bannerLogo"
            class="text-secondary-200 h-12 w-36 pb-4" />
        </li>
        <li class="text-lg text-secondary-300 flex items-center gap-2">
          本網站僅供個人作品使用，不做任何商業用途 -
          <a href="admin" class="hover:text-secondary-200 tracking-[.1rem]">後台管理</a>
        </li>
        <li class="flex items-center justify-center">
          <p class="text-secondary-300">
            ChillBar COPYRIGHT © 2022
          </p>
        </li>
      </ul>
    </nav>
  </section>
</template>
