import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001'
})

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('axiosInstance.interceptors.request.use', authStore.token)
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
