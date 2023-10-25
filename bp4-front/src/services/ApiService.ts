import type { User } from '@/types'
import axiosInstance from '@/services/axiosService'

export default class ApiService {
  private static instance: ApiService
  private constructor() {}
  static getInstance() {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }
  // methods
  async getUsers() {
    const response = await axiosInstance.get<User[]>('/users', {})
    return response.data
  }
}
