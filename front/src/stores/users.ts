import { defineStore } from 'pinia'
import type { UsersState } from './types'
import ApiService from '@/services/ApiService'
import { useAppStore } from './app'
import type { User } from '@/types'

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
        this.users = this.users.map((user) => {
          const birthdate = new Date(user.birthdate)
          return {
            ...user,
            birthdate
          }
        })
      } catch (error) {
        appStore.setError('Error conectando con el servicio de usuarios')
      } finally {
        appStore.setLoading(false)
      }
    },
    async createUser(user: User) {
      try {
        appStore.setLoading(true)
        await apiService.createUser(user)
        await this.loadUsers()
      } catch (error) {
        appStore.setError('Error al crear el usuario')
      } finally {
        appStore.setLoading(false)
      }
    },
    async updateUser(user: User) {
      try {
        appStore.setLoading(true)
        await apiService.updateUser(user)
        await this.loadUsers()
      } catch (error) {
        appStore.setError('Error al actualizar el usuario')
      } finally {
        appStore.setLoading(false)
      }
    },
    async deleteUser(id: number) {
      try {
        appStore.setLoading(true)
        await apiService.deleteUser(id)
        await this.loadUsers()
      } catch (error) {
        appStore.setError('Error al eliminar el usuario')
      } finally {
        appStore.setLoading(false)
      }
    },
    async searchUsers(query: string) {
      try {
        appStore.setLoading(true)
        if (!query) {
          return await this.loadUsers()
        }
        this.users = await apiService.searchUsers(query)
        this.users = this.users.map((user) => {
          const birthdate = new Date(user.birthdate)
          return {
            ...user,
            birthdate
          }
        })
      } catch (error) {
        appStore.setError('Error al buscar usuarios')
      } finally {
        appStore.setLoading(false)
      }
    }
  }
})
