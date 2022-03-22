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
      <ul class="flex flex-col justify-between items-center space-y-4 md:flex-row md:space-y-0">
        <li>
          <SvgLoader name="bannerLogo"
            class="w-24 h-8 text-secondary-200" />
        </li>
        <li class="flex flex-col gap-2 items-center rfs:text-base text-secondary-300 lg:flex-row">
          <p class="">本網站僅供個人作品使用，不做任何商業用途</p>
          <span class="hidden order-1 lg:block">-</span>
          <p class="rfs:text-base text-secondary-300">
            ChillBar COPYRIGHT © 2022
          </p>
          <router-link to="admin" class="order-none mx-auto ml-auto
          font-normal tracking-[.1rem] text-secondary-300
          hover:text-secondary-100 hover:bg-secondary-400
          rounded-none border border-secondary-200
          hover:border-secondary-400 hover:shadow hover:shadow-secondary-500
          transition duration-200 ease-in-out lg:order-2
          btn btn-md btn-outline">後台管理</router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>
