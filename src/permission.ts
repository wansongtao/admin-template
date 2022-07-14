import router from '@/router/index';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';

NProgress.configure({showSpinner: false});

const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  NProgress.start();

  if (to.meta?.title) {
    document.title = to.meta.title as string;
  } else {
    document.title = import.meta.env.VITE_TITLE;
  }

  const hasToken = getToken<string>();

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});