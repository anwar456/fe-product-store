import store from '@app/store'
import { logoutUser } from '@app/store/reducers/auth'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const baseURL = 'https://api-saving-goals.vercel.app'

const instance = axios.create({
  baseURL,
  timeout: 10000,
})

// Request Interceptor: tambahin Bearer token kalau ada
instance.interceptors.request.use(
  (config) => {
    const { credentials } = store.getState().auth
    if (credentials?.access) {
      config.headers.Authorization = `Bearer ${credentials.access}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response Interceptor: handle 401 (token expired/invalid)
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status
    const config = error.config as any

    if (status === 401 || status === 403) {
      // Clear auth state
      store.dispatch(logoutUser())

      // Paksa redirect ke signin
      window.location.href = '/signin'
    }

    return Promise.reject(error)
  },
)

// Wrapper request
export const request = async <T = any>(config: AxiosRequestConfig & { disableGlobalError?: boolean }): Promise<T> => {
  const response = await instance.request<T>(config)
  return response.data
}
