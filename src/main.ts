import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import { createPinia } from 'pinia';
import './permission';
// 注册svg图标
import "virtual:svg-icons-register";

const app = createApp(App);
app.use(createPinia());
app.use(router);

app.mount('#app');
