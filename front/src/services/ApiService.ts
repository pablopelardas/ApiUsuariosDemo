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
    const response = await axiosInstance.get<User[]>('/api/users', {})
    return response.data
  }
  async createUser(user: User) {
    const response = await axiosInstance.post<User>('/api/users', user)
    return response.data
  }
  async updateUser(user: User) {
    const response = await axiosInstance.put<User>(`/api/users/${user.id}`, user)
    return response.data
  }
  async deleteUser(id: number) {
    const response = await axiosInstance.delete<User>(`/api/users/${id}`)
    return response.data
  }
  async searchUsers(query: string) {
    const response = await axiosInstance.get<User[]>(`/api/users/search/${query}`)
    console.log(response.data)
    return response.data
  }
}
