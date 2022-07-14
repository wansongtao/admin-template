<script lang="ts" setup>
const title = import.meta.env.VITE_TITLE;
</script>

<template>
  <div class="layout_head">
    <div class="logo">
      <img src="@/assets/common/logo.png" alt="" />
    </div>
    <div class="head_main">
      <div class="head_title">{{ title }}</div>
      <UserInfo />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout_head {
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: var(--headerhg);
  background: var(--bgcolor);

  .logo {
    width: 210px;
    height: 45px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .head_main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .head_title {
      margin-left: 30px;
      font-size: var(--titlesize);
      color: var(--titlecolor);
    }
  }
}


</style>
