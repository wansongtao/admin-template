import { RouteRecordRaw } from 'vue-router';
import layout from '@/layout/index.vue';

const adminRoutes: RouteRecordRaw = {
  path: '/',
  name: 'Admin',
  component: layout,
  redirect: '/onlinestate',
  children: [
    {
      path: 'onlinestate',
      name: 'onLineState',
      component: () => import('@/views/onLineState/index.vue'),
      meta: {
        title: '在线状况',
        icon: 'zaixian'
      },
    },
    {
      path: 'users',
      name: 'User',
      component: () => import('@/views/users/index.vue'),
      meta: {
        title: '人员管理',
        icon: 'renyuanguanli'
      }
    }
  ]
};

export default adminRoutes;
