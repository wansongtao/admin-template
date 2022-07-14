import { defineStore } from 'pinia';

const useUser = defineStore('user', {
  state: () => {
    return {
      name: 'admin',
      avatar: ''
    }
  },
  actions: {
    
  }
});

export default useUser;