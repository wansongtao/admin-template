<script lang="ts" setup>
import useUser from '@/store/user';
import { computed } from 'vue';
import { removeToken } from '@/utils/auth';

const userStore = useUser();

const name = computed(() => userStore.name);

const onToHome = () => {
  
};

const onLogout = () => {
  removeToken();
  location.reload();
};
</script>

<template>
  <a-popover trigger="hover">
    <template #content>
      <div class="user_btn" @click="onToHome">返回主页</div>
      <div class="user_btn" @click="onLogout">退出登录</div>
    </template>
    <div class="user_info">
      <img src="@/assets/common/avatar.png" alt="" class="avatar" />
      <div class="user_name">{{name}}</div>
    </div>
  </a-popover>
</template>

<style lang="scss" scoped>
.user_info {
  display: flex;
  align-items: center;
  cursor: pointer;

  .avatar {
    width: 40px;
    height: 40px;
  }

  .user_name {
    margin-left: 10px;
    font-size: 16px;
  }
}

.user_btn {
  padding: 5px 0;
  cursor: pointer;
}

</style>
