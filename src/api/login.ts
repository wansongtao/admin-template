import instance from '@/utils/request';
import { IBaseResponse } from './types/interface';

export const test = <T = any>(): Promise<IBaseResponse<T>> => {
  return instance.get('/');
};

export const login = <T = any>() => {
  return instance.request<IBaseResponse<T>, IBaseResponse<T>>({
    url: '/test',
    method: 'get'
  });
};

/**
 * @description 获取登录图片验证码
 * @returns
 */
export const getLoginCode = () => {
  return instance.request<Blob, Blob>({
    url: '/ued/code/loginCode',
    method: 'get',
    responseType: 'blob'
  });
};
