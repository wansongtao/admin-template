<script lang="ts" setup>
import lay_header from './components/header.vue';
import side_bar from './components/sideBar.vue';
</script>

<template>
  <lay_header />
  <section class="layout_container">
    <side_bar />
    <div class="layout_main">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.layout_container {
  overflow: hidden;
  display: flex;
  height: calc(100vh - var(--headerhg));

  .layout_main {
    flex: 1;
    box-sizing: border-box;
    margin: var(--mainmargin) 0 0 var(--mainmargin);
    padding: 10px;
    height: calc(100vh - 15px - var(--headerhg));
    background-color: var(--bgcolor);
    border-top-left-radius: 8px;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-from {
  transform: translateX(-30px);
}

.fade-enter-to,
.fade-leave-to {
  transform: translateX(30px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
</style>
