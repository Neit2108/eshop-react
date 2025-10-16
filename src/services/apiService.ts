import axios, { type AxiosInstance, AxiosError } from 'axios'
import { API_BASE_URL, API_TIMEOUT } from '../lib/constants'
import type { ApiResponse } from '../types'

class ApiService {
  private client: AxiosInstance

  constructor(baseURL: string, timeout: number) {
    this.client = axios.create({
      baseURL,
      timeout,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })

    // Add auth token to requests
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // xu ly 401 -> refresh token
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if(error.response?.status === 401){
          try{
            const response = await this.client.post<{ token: string }>('/auth/refresh-token')
            localStorage.setItem('authToken', response.data.token)
            return this.client.request(error.config!)
          }
          catch{
            localStorage.removeItem('authToken')
            localStorage.removeItem('user')
            window.location.href = '/login'
          }
        }
        throw error
      }
    )
  }

  async get<T>(endpoint: string) {
    const response = await this.client.get<ApiResponse<T>>(endpoint)
    return response.data
  }

  async post<T>(endpoint: string, data?: unknown) {
    const response = await this.client.post<ApiResponse<T>>(endpoint, data)
    return response.data
  }

  async put<T>(endpoint: string, data?: unknown) {
    const response = await this.client.put<ApiResponse<T>>(endpoint, data)
    return response.data
  }

  async patch<T>(endpoint: string, data?: unknown) {
    const response = await this.client.patch<ApiResponse<T>>(endpoint, data)
    return response.data
  }

  async delete<T>(endpoint: string) {
    const response = await this.client.delete<ApiResponse<T>>(endpoint)
    return response.data
  }
}

export const apiService = new ApiService(API_BASE_URL, API_TIMEOUT)