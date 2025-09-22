import { AxiosRequestConfig } from 'axios'
import { request } from './api.service'

interface RequestOptions extends AxiosRequestConfig {
  disableGlobalError?: boolean
}

const api = {
  get: async <T = any>(options: RequestOptions) => {
    return await request<T>({ method: 'get', ...options })
  },

  post: async <T = any>(options: RequestOptions) => {
    return await request<T>({ method: 'post', ...options })
  },

  put: async <T = any>(options: RequestOptions) => {
    return await request<T>({ method: 'put', ...options })
  },

  delete: async <T = any>(options: RequestOptions) => {
    return await request<T>({ method: 'delete', ...options })
  },
}

export default api
