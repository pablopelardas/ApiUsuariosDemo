import { defineStore } from 'pinia'
import type { UsersState } from './types'
import ApiService from '@/services/ApiService'

const apiService = ApiService.getInstance()
export const useUsersStore = defineStore('UsersStore', {
  state: (): UsersState => ({
    users: []
  }),
  actions: {
    async getUsers() {
      try {
        this.users = await apiService.getUsers()
      } catch (error) {
        console.log(error)
      }
    }
  }
})
