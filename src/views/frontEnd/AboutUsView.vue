<script>
import { onMounted } from 'vue';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import InputField from '@/utils/InputField.vue';
import aboutImg01 from '@/assets/aboutImg01.jpg';
import aboutImg02 from '@/assets/aboutImg02.jpg';

export default {
  components: {
    Form,
    InputField,
  },
  setup() {
    const phoneRegex = /09\d{2}-?\d{3}-?\d{3}/;
    const schema = Yup.object().shape({
      userName: Yup.string().trim().required('請輸入姓名'),
      userEmail: Yup.string().trim().email('請輸入正確的Email信箱').required('請輸入Email'),
      userPhone: Yup.string()
        .test('phone', '請輸入正確的10碼手機號碼(09...)', (value) => phoneRegex.test(value))
        .required('請輸入電話號碼'),
      userMessage: Yup.string().required('請輸入想要告訴我們的內容'),
    });

    onMounted(() => {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/huan5678/cl0ytngt0000r15oyzq97yje8',
        center: [121.5268814, 25.0500413],
        zoom: 16,
      });
      map.on('load', () => {
        new mapboxgl.Marker({ color: 'red', rotation: 45 })
          .setLngLat([121.5269499, 25.0499477])
          .addTo(map);
      });
      map.on('click', () => {
        new mapboxgl.Popup()
          .setLngLat([121.5269, 25.0502])
          .setHTML('<h2>ChillBar 秋吧</h2>')
          .addTo(map);
      });
    });
    return {
      aboutImg01,
      aboutImg02,
      schema,
    };
  },
};
</script>

<template>
<section class="py-6 relative min-h-screen bg-secondary-900">
  <img :src="aboutImg01"
  class="absolute inset-0 object-cover opacity-50" alt="關於我們" />
  <div class="container z-10">
    <div class="card md:w-[80vw] mx-auto bg-base-100">
      <article class="card-body">
        <AppTitle class="mb-6" level="1">
          關於秋吧
        </AppTitle>
        <div class="flex flex-col md:flex-row justify-between gap-6 mb-2">
          <div class="space-y-2 mb-6 text-secondary-700 mx-auto order-1 md:order-none">
            <h2 class="text-center text-2xl">我們的理念</h2>
            <p class="font-light md:max-w-screen-md">
              <span class="block text-center text-primary-500">
                「
                <span class="font-normal text-primary-500/70">秋日薄暮，用菊花煮竹葉青，人與海棠俱醉</span>
                」</span><br />
              林清玄在《溫一壺月光下酒》中寫到，在秋日薄暮時分，<br />
              來點小酒，人和海棠花皆醉了。<br />
              這樣的場景僅在腦海里一閃而過，就不禁陶醉其中。
            </p>
            <p class="font-light">
              我們致力於打造一個舒適的飲酒場景，<br />
              希望客人在我們店裡只有愜意沒有拘謹。</p>
          </div>
          <figure class="mx-auto">
            <img :src="aboutImg02"
            class="max-w-sm order-0 md:order-none object-cover space-y-2"
            alt="shop" />
          </figure>
        </div>
        <div class="flex flex-col md:flex-row justify-between gap-6">
            <Form
            action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeW8xDki0525stZP18uyb-bgY2Dc0uZpvPk1QjWEKweSQP3CQ/formResponse"
            class="space-y-2 font-light md:w-2/3 order-1 md:order-none"
            :validation-schema="schema">
              <legend>
                <h3 class="text-center font-normal text-lg">與我們聯繫</h3>
              </legend>
              <div class="flex gap-4 justify-between items-start mb-6">
              <InputField
                name="entry.1098885017"
                type="text"
                label="姓名"
                placeholder="請輸入姓名"
              />
              <InputField
                name="entry.420921765"
                type="tel"
                maxlength="10"
                label="電話"
                placeholder="請輸入電話"
              />
            </div>
            <InputField
              name="entry.547693488"
              type="email"
              label="Email"
              placeholder="請輸入Email"
            />
            <div>
              <label
                for="userMessage"
                class="block mb-2"
                >想告訴我們的話</label>
              <textarea
                id="userMessage"
                name="entry.1064200367"
                class="w-full form-control"
                rows="4"
                placeholder="想要告訴我們什麼？"
              ></textarea>
            </div>
            <button
              type="submit"
              class="btn rounded text-xl w-full font-normal text-secondary-50
              border-none bg-secondary-300 hover:bg-primary-700
            "
            >
              送出訊息
            </button>
          </Form>
          <ul class="space-y-2 w-full flex-auto order-0 md:order-none">
            <li>
              <h3 class="text-center text-lg">
              哪裡可以找到我們
              </h3>
            </li>
            <li class="font-light text-lg flex justify-between">
              <span class="block">地址 :</span>
              <span class="block">台北市中山區林森北路107巷55號2樓</span>
            </li>
            <li class="font-light text-lg flex justify-between">
              <span class="block">聯絡電話 :</span>
              <span class="block">0912-345678</span>
            </li>
            <li id="map" class="w-full h-64"></li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</section>
</template>
