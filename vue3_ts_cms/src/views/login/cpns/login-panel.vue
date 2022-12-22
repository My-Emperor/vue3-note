<template>
  <div class="login-panel">
    <!--title-->
    <h1 class="title">vue3-ts-cms</h1>
    <!--tabs-->
    <div class="tabs">
      <!--      :activeName="account"-->
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <!--<el-icon><UserFilled /></el-icon>-->
              帐号登录
            </div>
          </template>
          <panel-account ref="accountRef"></panel-account>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <!-- <el-icon><Cellphone /></el-icon>-->
              <span class="text">手机登录</span>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--底部区域-->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large"/>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import PanelAccount from './panel-account.vue'
import { localCache } from "@/uitls/cache";
//tab active
let activeName = ref('account')
//是否记住密码
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
//表单对象
const accountRef = ref<InstanceType<typeof PanelAccount>>()

//登录按钮
function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('用户在使用手机登录')
  }
}

//记住密码
watch(isRemPwd, (value) => {
  localCache.setCache('isRemPwd', value)
})
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    margin-bottom: 5px;
    text-align: center;
  }

  .tabs {
    width: 330px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
