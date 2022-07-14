<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router';

interface Props {
  menuInfo: RouteRecordRaw
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <a-sub-menu :key="menuInfo.name">
    <template v-if="menuInfo.meta?.icon" #icon><icon-svg :name="(menuInfo.meta?.icon as string)" /></template>
    <template #title>{{ menuInfo.meta?.title }}</template>
    <template v-for="item in menuInfo.children" :key="item.name">
      <template v-if="!item.children">
        <a-menu-item :key="menuInfo.path + item.path">
          <template v-if="item.meta?.icon" #icon>
            <icon-svg :name="(item.meta?.icon as string)" />
          </template>
          {{ item.meta?.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.name" />
      </template>
    </template>
  </a-sub-menu>
</template>

<style lang="scss" scoped></style>
