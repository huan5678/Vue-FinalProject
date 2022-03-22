<script>
import { ref } from 'vue';

import featureImg01 from '@/assets/featureImg01.jpg';
import featureImg02 from '@/assets/featureImg02.jpg';
import featureImg03 from '@/assets/featureImg03.jpg';
import featureImg04 from '@/assets/featureImg04.jpg';
import featureImg05 from '@/assets/featureImg05.jpg';
import featureImg06 from '@/assets/featureImg06.jpg';

export default {
  setup() {
    const isHovering = ref(0);
    const data = [
      {
        title: '伏特加 VODKA',
        description: '伏特加是一種蒸餾白酒，Vodka 在拉丁文的語意有著「生命之水」的意思 ...',
        category: 'vodka',
        imageUrl: featureImg01,
      },
      {
        title: '琴酒 GIN',
        description: '琴酒的原料是杜松子，Gin 就是緣自於杜松子法語 ( Geninever ) 的發音 ...',
        category: 'gin',
        imageUrl: featureImg02,
      },
      {
        title: '威士忌 WHISKY',
        description: `威士忌主要原料有大麥、裸麥、小麥、玉米，經發酵、
        蒸餾後，儲存於木桶中熟成，不同產區在原料上有所差異 ...`,
        category: 'whisky',
        imageUrl: featureImg03,
      },
      {
        title: '龍舌蘭 TEQUILA',
        description: `最廣為人知的龍舌蘭酒就屬 Tequila 了，
        被視為是墨西哥靈魂的龍舌蘭酒，原料龍舌蘭草是一種長得非常像巨大鳳梨的植物 ...`,
        category: 'tequila',
        imageUrl: featureImg04,
      },
      {
        title: '蘭姆酒 RUM',
        description: '蘭姆酒早期是運用煉糖剩下的糖渣，加水稀釋之後再加入酵母發酵而成 ...',
        category: 'rum',
        imageUrl: featureImg05,
      },
      {
        title: '白蘭地 BRANDY',
        description: '一般我們說的白蘭地是指使用葡萄酒蒸餾而成的，因此帶有葡萄的果香風味 ...',
        category: 'brandy',
        imageUrl: featureImg06,
      },
    ];
    return {
      data,
      isHovering,
    };
  },
};
</script>

<template>
  <section class="container py-9">
    <AppTitle level="2" class="mb-12">
      六大基酒
    </AppTitle>
    <ul class="group">
      <li class="flex overflow-hidden odd:flex-row-reverse
      flex-wrap justify-between odd:text-right bg-secondary-100/20
      odd:bg-secondary-50/10
      border-b cursor-pointer md:flex-nowrap"
      :class="{
        'group-hover:bg-secondary-100/40': isHovering === idx
      }"
      @mouseover="isHovering = idx"
      @mouseout="isHovering = null"
      @focus="isHovering"
      @blur="isHovering"
      v-for="(item, idx) in data" :key="item.title"
      >
        <article class="order-1 py-12 px-4 w-full sm:px-6
        md:order-none md:w-1/2 lg:py-16 lg:px-8">
            <h2 class="mb-4 rfs:text-3xl font-medium
            text-primary-500/70 transition duration-150 ease-in-out"
            :class="{
              'group-hover:text-primary-500': isHovering === idx
            }"
            >
              {{ item.title }}
            </h2>
            <p class="rfs:text-base text-secondary-400/70
            transition duration-150 ease-in-out"
            :class="{
              'group-hover:text-secondary-400': isHovering === idx
            }"
            >
              {{ item.description }}
            </p>
            <div class="lg:flex-shrink-0 lg:mt-0">
                <div class="inline-flex mt-12 rounded-md">
                    <button type="button" class="py-4 px-12
                    w-full text-base font-normal text-center
                    text-primary-300 border border-primary-200
                    transition duration-150 ease-in
                    "
                    :class="
                    {
                      'group-hover-btn': isHovering === idx
                    }"
                    >
                        發現更多
                    </button>
                </div>
            </div>
        </article>
        <img :src="item.imageUrl" :alt="item.title"
        :class=
        "{
          'saturate-[.3]' : isHovering !== idx,
          'saturate-[.9]' : isHovering === idx,
        }"
        class="aspect-video object-cover object-center transition-all
        duration-150 md:aspect-square
        md:max-w-[24rem] md:h-full"/>
      </li>
    </ul>
  </section>
</template>
<style scoped>
  .group-hover-btn {
    @apply group-hover:cursor-pointer
    group-hover:text-primary-500 group-hover:border
    group-hover:border-primary-500 group-hover:shadow-sm
  }
</style>
