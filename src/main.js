import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { vfmPlugin } from 'vue-final-modal';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import router from './router';
import svgLoader from './components/SvgLoader.vue';

import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.scss';

const app = createApp(App);

const pinia = createPinia();

app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);
app.use(pinia);
app.use(router);
app.use(vfmPlugin);
const requireAll = (requireContext) => requireContext.keys().forEach(requireContext);
const req = require.context('@/assets/svg', true, /\.svg$/);
requireAll(req);

app.component('SvgLoader', svgLoader);

app.mount('#app');
