import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types/login_types'
import { localCache } from '@/uitls/cache'
import router from '@/router'
import { ElMessage } from 'element-plus'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: '',
    name: ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      //账号登录,获取id、token等
      const res = await accountLoginRequest(account)
      this.id = res.data?.id
      this.token = res.data?.token
      this.name = res.data?.name
      localCache.setCache('LOGIN_TOKEN', this.token)
      router.push('/main')
      ElMessage.success(`登录成功,欢迎 ${this.name}`)
    }
  }
})

export default useLoginStore
