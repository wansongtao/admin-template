import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import adminRoutes from './adminRoutes';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  adminRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/notFound.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;