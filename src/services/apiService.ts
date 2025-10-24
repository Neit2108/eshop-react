import axios, { AxiosError, type AxiosInstance } from 'axios'
import { API_BASE_URL, API_TIMEOUT } from '../lib/constants'
import type { ApiResponse, RefreshTokenResponse } from '../types'

class ApiService {
  private client: AxiosInstance
  private isRefreshing = false
  private refreshSubscribers: ((token: string) => void)[] = []

  constructor(baseURL: string, timeout: number) {
    this.client = axios.create({
      baseURL,
      timeout,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })

    // thêm token vào request header
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // xu ly 401 -> refresh token
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const {response, config} = error;
        const originalRequest = config as any;

        // nếu nhận được 401 và chưa đang refresh token
        if(response?.status === 401 && !originalRequest!._retry){
          originalRequest!._retry = true

          if(!this.isRefreshing){
            this.isRefreshing = true

            try{
              console.log('Token đã hết hạn, đang làm mới token...')

              const refreshTokenResponse = await this.refreshToken()

              const newAccessToken = refreshTokenResponse.accessToken
              localStorage.setItem('accessToken', newAccessToken)

              console.log('Làm mới token thành công.')


              this.refreshSubscribers.forEach((callback) => callback(newAccessToken))
              this.refreshSubscribers = []

              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
              return this.client(originalRequest)
            }
            catch(refreshError){
              console.log('Làm mới token thất bại, chuyển hướng đến trang đăng nhập.')
              localStorage.removeItem('accessToken')
              localStorage.removeItem('user')
              window.location.href = '/login'
              return Promise.reject(refreshError)
            }
            finally{
              this.isRefreshing = false
            }
          }
          else{
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token: string) => {
                originalRequest!.headers.Authorization = `Bearer ${token}`
                resolve(this.client(originalRequest!))
              })
            })
          }
        }
        
        return Promise.reject(error)
      }
    )
  }

  private async refreshToken(): Promise<RefreshTokenResponse> {
    const response = await this.client.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh-token')
    return response.data.data
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