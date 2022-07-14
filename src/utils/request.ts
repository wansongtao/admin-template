import axios, { AxiosError } from 'axios';
import messageNotice from './message';
import { getToken } from '@/utils/auth';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 15000,
  withCredentials: true
});

instance.interceptors.request.use(
  (config) => {
    // 发送请求前做些什么
    if (getToken<string>() && config.headers) {
      config.headers['authorization'] = `Bearer ${getToken()}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    const data = res.data;

    return data;
  },
  (error: AxiosError) => {
    // 超出 2xx 范围的http状态码都会触发该函数
    messageNotice({
      content: error.response?.statusText,
      type: 'error'
    });

    return Promise.reject(error);
  }
);

export default instance;
