<script>

export default {
  setup() {
    return {
    };
  },
};
</script>
<template>
  <section class="py-4 bg-secondary-900">
    <nav class="container">
      <ul class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <li>
          <SvgLoader name="bannerLogo"
            class="w-24 h-8 text-secondary-200" />
        </li>
        <li class="flex flex-col lg:flex-row gap-2 items-center rfs:text-base text-secondary-300">
          <p class="">本網站僅供個人作品使用，不做任何商業用途</p>
          <span class="hidden lg:block order-1">-</span>
          <p class="rfs:text-base text-secondary-300">
            ChillBar COPYRIGHT © 2022
          </p>
          <a href="admin" class="order-none lg:order-2 mx-auto
          btn btn-md font-normal btn-outline rounded-none
          border border-secondary-200 hover:bg-secondary-400
          hover:border-secondary-400 hover:shadow hover:shadow-secondary-500
          text-secondary-300 transition duration-200 ease-in-out
          tracking-[.1rem] hover:text-secondary-100 ml-auto">後台管理</a>
        </li>
      </ul>
    </nav>
  </section>
</template>
