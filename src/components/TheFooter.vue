<script>

export default {
  setup() {
    return {
    };
  },
};
</script>
<template>
  <section class="pt-4 pb-8 bg-secondary-900">
    <nav class="container flex flex-col justify-center">
      <ul class="flex flex-col justify-between items-center">
        <li>
          <SvgLoader name="bannerLogo"
            class="pb-4 w-36 h-12 text-secondary-200" />
        </li>
        <li class="flex gap-2 items-center rfs:text-base text-secondary-300">
          本網站僅供個人作品使用，不做任何商業用途 -
          <a href="admin" class="tracking-[.1rem] hover:text-secondary-200">後台管理</a>
        </li>
        <li class="flex justify-center items-center">
          <p class="text-secondary-300 rfs:text-base">
            ChillBar COPYRIGHT © 2022
          </p>
        </li>
      </ul>
    </nav>
  </section>
</template>
