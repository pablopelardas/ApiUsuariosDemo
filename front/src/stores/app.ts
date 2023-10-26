import { defineStore } from 'pinia'
import type { AppState } from './types'

export const useAppStore = defineStore('AppStore', {
  state: (): AppState => ({
    loading: false,
    error: null
  }),
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },
    setError(error: string | null) {
      this.error = error
    },
    clean() {
      this.loading = false
      this.error = null
    }
  }
})
