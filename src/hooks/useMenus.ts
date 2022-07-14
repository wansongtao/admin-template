import { RouteRecordRaw } from 'vue-router';
import adminRoutes from '@/router/adminRoutes';

const useMenus = (): RouteRecordRaw[] => {
  const children = adminRoutes.children;
  if (children === undefined || children.length === 0) {
    return [];
  }

  const menus = children.filter((val) => {
    if (val.meta?.hidden) {
      return false;
    }

    return true;
  });

  const commonPath = adminRoutes.path;

  return menus.map((val) => {
    const title = (val.meta && val.meta.title) || val.name || '';

    return {
      path: `${commonPath}${val.path}`,
      name: val.name,
      meta: {
        title,
        icon: val.meta?.icon
      },
      redirect: '',
      children: val.children
    };
  });
};

export default useMenus;
