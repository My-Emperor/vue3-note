<template>
  <div class="app">
    <router-view />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.app {
  /*宽度为100vw且存在竖向滚动条时,会导致横向滚动条产生,竖向滚动条占据了一部分宽度*/
  /*widows: 100vw;*/
  width: 100%;
  height: 100vh;
}
</style>
