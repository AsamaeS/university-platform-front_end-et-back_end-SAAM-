// REST API Client using Axios

import axios, { type AxiosInstance, type AxiosError } from "axios"
import { API_CONFIG } from "../config/api-config"

class RestClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.REST_BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Request interceptor for adding auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("auth_token")
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error("[v0] REST API Error:", error.response?.data || error.message)

        if (error.response?.status === 401) {
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("auth_token")
          window.location.href = "/login"
        }

        return Promise.reject(error)
      },
    )
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.client.get<T>(url, { params })
    return response.data
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data)
    return response.data
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data)
    return response.data
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url)
    return response.data
  }
}

export const restClient = new RestClient()
