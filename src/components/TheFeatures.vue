<script>
import featureImg01 from '@/assets/featureImg01.jpg';
import featureImg02 from '@/assets/featureImg02.jpg';
import featureImg03 from '@/assets/featureImg03.jpg';
import featureImg04 from '@/assets/featureImg04.jpg';
import featureImg05 from '@/assets/featureImg05.jpg';
import featureImg06 from '@/assets/featureImg06.jpg';

export default {
  setup() {
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
    };
  },
};
</script>

<template>
  <section class="container py-9">
    <h2 class="text-center font-light text-5xl mb-6 pb-4 border-b">六大基酒</h2>
    <a href="#" class="group block">
      <div class="bg-secondary-300/20 odd:bg-secondary-100/10
      dark:bg-secondary-800 border-b
      flex justify-between odd:flex-row-reverse overflow-hidden"
      v-for="item in data" :key="item.title">
        <div class="text-start w-1/2 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            <h2 class="text-3xl font-normal text-primary-600 mb-4
            dark:text-secondary-50 sm:text-4xl">
                <span class="block">
                    {{ item.title }}
                </span>
            </h2>
            <p class="text-secondary-400">
                {{ item.description }}
            </p>
            <div class="lg:mt-0 lg:flex-shrink-0">
                <div class="mt-12 inline-flex rounded-md">
                    <button type="button" class="py-4 px-6
                    text-primary-300 text-center text-base font-normal
                    transition ease-in duration-200 w-full
                    border border-primary-200
                    group-hover:cursor-pointer
                    group-hover:border group-hover:border-primary-600
                    group-hover:text-primary-500"
                    >
                        發現更多
                    </button>
                </div>
            </div>
        </div>
        <img :src="item.imageUrl" :alt="item.title"
        class="h-full max-w-sm aspect-square object-center object-cover"/>
      </div>
    </a>
  </section>
</template>
