import { defineStore } from 'pinia'
import type { AuthState } from './types'

export const useAuthStore = defineStore('AuthStore', {
  state: (): AuthState => ({
    account: null
  }),
  actions: {
    async login() {},
    async getAccount() {}
  }
})
