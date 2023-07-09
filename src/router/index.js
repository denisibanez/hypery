import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/app/Layout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/trending',
        name: 'Home',
        component: () => import('../views/app/Home/Home.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
