<template>
  <div class="main">
    <h2>首页</h2>
    <button @click="signOut">退出</button>
    <el-button></el-button>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/uitls/cache'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
function signOut() {
  localCache.removeCache('LOGIN_TOKEN')
  router.push('/login')
  ElMessage.success('退出成功!')
}
</script>

<style scoped lang="less">

</style>
