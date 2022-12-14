<template>
  <div class="main">
    <h2>Main</h2>
    <h2>main:{{ counterStore.counter }}</h2>
    <button @click="onChangeCounter">修改</button>
    <el-button></el-button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'
const counterStore = useCounterStore()

function onChangeCounter() {
  counterStore.changeCounterAction(111)
  console.log(counterStore.counter)
}
</script>

<style scoped lang="less">

</style>
