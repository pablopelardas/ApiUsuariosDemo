import { defineStore } from 'pinia'
import type { UsersState } from './types'
import ApiService from '@/services/ApiService'
import { useAppStore } from './app'

const apiService = ApiService.getInstance()
const appStore = useAppStore()

export const useUsersStore = defineStore('UsersStore', {
  state: (): UsersState => ({
    users: []
  }),
  actions: {
    async loadUsers() {
      try {
        appStore.setLoading(true)
        this.users = await apiService.getUsers()
      } catch (error) {
        appStore.setError('Error conectando con el servicio de usuarios')
      } finally {
        appStore.setLoading(false)
      }
    }
  }
})
