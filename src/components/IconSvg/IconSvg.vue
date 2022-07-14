<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#fff'
  }
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
}
</style>
