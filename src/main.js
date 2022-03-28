import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { vfmPlugin } from 'vue-final-modal';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSweetalert2 from 'vue-sweetalert2';
import CKEditor from '@ckeditor/ckeditor5-vue';
import { Roulette } from 'vue3-roulette';

import App from '@/App.vue';
import router from '@/router';
import svgLoader from '@/utils/SvgLoader.vue';
import AlertModal from '@/components/AlertModal.vue';
import AppTitle from '@/utils/AppTitle.vue';

import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.scss';

const app = createApp(App);

const pinia = createPinia();

app.use(VueSweetalert2);
app.provide('Swal', app.config.globalProperties.$swal);

app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);
app.use(pinia);
app.use(router);
app.use(vfmPlugin);
app.use(CKEditor);

const requireAll = (requireContext) => requireContext.keys().forEach(requireContext);
const req = require.context('@/assets/svg', true, /\.svg$/);
requireAll(req);

app.component('SvgLoader', svgLoader);
app.component('AlertModal', AlertModal);
app.component('AppTitle', AppTitle);
app.component('AppRoulette', Roulette);

app.mount('#app');
