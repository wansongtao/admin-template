<script lang="ts" setup>
import type { MenuProps } from 'ant-design-vue';
import subMenu from './subMenu.vue';
import { ref, watch } from 'vue';
import useMenus from '@/hooks/useMenus';
import { useRouter, RouteLocationRaw, RouteRecordRaw } from 'vue-router';

const router = useRouter();
const menus = useMenus();

const selectedKeys = ref<string[]>([menus[0].path]);
const handleClick: MenuProps['onClick'] = (e) => {
  router.push(e.key as RouteLocationRaw);
};

const hasPath = (routes: RouteRecordRaw[], path: string): boolean => {
  if (routes.length === 0 || !path) {
    return false;
  }

  return routes.some((val) => {
    if (val.path === path) {
      return true;
    }

    if (val.children && val.children.length) {
      return hasPath(val.children, path);
    }

    return false;
  });
};

watch(
  () => router.currentRoute.value.path,
  (path) => {
    if (selectedKeys.value[0] === path) {
      return;
    }

    if (!hasPath(menus,path)) {
      return;
    }

    selectedKeys.value[0] = path;
  },
  { immediate: true }
);
</script>

<template>
  <div class="side_box">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      style="
        width: var(--sidewd);
        height: calc(100vh - var(--headerhg));
      "
      mode="inline"
      theme="dark"
      @click="handleClick"
    >
      <template v-for="item in menus" :key="item.name">
        <template v-if="!item.children">
          <a-menu-item :key="item.path">
            <template v-if="item.meta?.icon" #icon>
              <icon-svg :name="(item.meta?.icon as string)" />
            </template>
            {{ item.meta?.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :key="item.name" :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </div>
</template>

<style lang="scss" scoped>
.side_box {
  overflow: hidden;
  width: var(--sidewd);
}
</style>
