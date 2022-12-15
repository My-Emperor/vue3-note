import { defineStore } from 'pinia'
import { accountLoginRequest } from "@/service/login/login";
import type { IAccount } from "@/types/login_types";

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: '',
    name: ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const res = await accountLoginRequest(account)
      this.id = res.data?.id
      this.token = res.data?.token
      this.name = res.data?.name
    }
  }
})

export default useLoginStore
