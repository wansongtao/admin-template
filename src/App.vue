<script setup lang="ts">
</script>

<template>
  <router-view/>
</template>

<style>
@import url('./styles/base.css');
@import url('./styles/common.css');
@import url('./styles/variable.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  height: 100vh;
  background: var(--appbgcolor);
}
</style>
