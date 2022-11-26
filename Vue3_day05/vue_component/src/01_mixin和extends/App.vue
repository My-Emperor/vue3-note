<template>
  <button @click="foo">mixin</button>
</template>

<script>

import {demoMixin} from "@/01_mixin和extends/mixin/demoMixin";
export default {
  name: 'App',
  mixins:[demoMixin],

}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
