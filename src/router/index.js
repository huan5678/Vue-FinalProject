import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/frontEnd/FrontEndView.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/frontEnd/HomeView.vue'),
        meta: {
          title: 'ChillBar秋吧 - 首頁',
        },
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('@/views/frontEnd/ProductView.vue'),
        meta: {
          title: 'ChillBar秋吧 - 產品頁',
        },
      },
      {
        path: 'detail/:id',
        name: 'product-detail',
        component: () => import('@/views/frontEnd/ProductDetailView.vue'),
        meta: {
          title: 'ChillBar秋吧 - 產品詳細頁',
        },
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/frontEnd/LoginView.vue'),
        meta: {
          title: 'ChillBar秋吧 - 管理者登入',
        },
      },
      {
        path: 'checkout',
        name: 'checkout',
        component: () => import('@/views/frontEnd/CheckoutView.vue'),
        meta: {
          title: 'ChillBar秋吧 - 訂單結帳',
        },
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/frontEnd/AboutUsView.vue'),
        meta: {
          title: 'ChillBar秋吧 - 關於我們',
        },
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/backEnd/BackEndView.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/backEnd/DashboardView.vue'),
        meta: {
          title: 'ChillBar秋吧 - 管理者後台',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
