import { createApp } from 'vue';

import { createPinia } from 'pinia';

import { vfmPlugin } from 'vue-final-modal';

import VueSweetalert2 from 'vue-sweetalert2';

import CKEditor from '@ckeditor/ckeditor5-vue';

import { Roulette } from 'vue3-roulette';

import { SetupCalendar } from 'v-calendar';

import router from '@/router';

import SvgLoader from '@/utils/SvgLoader.vue';

import AppLoader from '@/utils/AppLoader.vue';

import AlertModal from '@/components/AlertModal.vue';

import AppTitle from '@/utils/AppTitle.vue';

import App from '@/App.vue';

import 'v-calendar/dist/style.css';

import 'aos/dist/aos.css';

import 'sweetalert2/dist/sweetalert2.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css';

import '@/assets/scss/all.scss';

const app = createApp(App);

const pinia = createPinia();

const requireAll = (requireContext) => requireContext.keys().forEach(requireContext);

const req = require.context('@/assets/images/svg', true, /\.svg$/);

requireAll(req);

app.provide('Swal', app.config.globalProperties.$swal);

app.use(VueSweetalert2);

app.use(pinia);

app.use(router);

app.use(vfmPlugin);

app.use(CKEditor);

app.use(SetupCalendar, {});

app.component('SvgLoader', SvgLoader);

app.component('AlertModal', AlertModal);

app.component('AppTitle', AppTitle);

app.component('AppRoulette', Roulette);

app.component('AppLoading', AppLoader);

app.mount('#app');
