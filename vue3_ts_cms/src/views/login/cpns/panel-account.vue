<template>
  <div class="panel-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号" prop="username">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { IAccount } from '@/types/login_types'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/store/login/login'

const account = reactive<IAccount>({
  name: '',
  password: ''
})
//表单校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}
//定义接收表单
const formRef = ref<InstanceType<typeof ElForm>>()
//获取pinia login对象
const loginStore = useLoginStore()
//登录逻辑
function loginAction() {
  formRef.value?.validate((valid) => {
    if (valid) {
      //校验成功
      const name = account.name
      const password = account.password
      // 2.向服务器发送网络请求(携带账号和密码)
      console.log(loginStore.loginAccountAction({ name, password }))
      // loginStore
      //   .loginAccountAction({ name, password })
      //   .then((res) => {
      //     console.log('请求成功!----' + res)
      //   })
      //   .catch((rej) => {
      //     console.log('请求失败!----' + rej)
      //   })
    }
  })
}

//导出
defineExpose({
  loginAction
})
</script>

<style scoped lang="less"></style>
