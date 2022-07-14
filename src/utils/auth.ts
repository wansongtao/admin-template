import { setStorage, getStorage, removeStorage } from '@/utils/storage';

const TokenKey = 'token'

export function getToken<T>() {
  return getStorage<T>(TokenKey);
}

export function setToken(token: string) {
  return setStorage({key: TokenKey, value: token});
}

export function removeToken() {
  return removeStorage(TokenKey)
}