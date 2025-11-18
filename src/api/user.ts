import type { MessageResponse, UserLoginResponse } from '@/types/user'
import axios, { type AxiosResponse } from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

const userApi = axios.create({
  baseURL: BASE_URL,
})

userApi.interceptors.request.use(
  (request) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

    if (token) {
      request.headers['Authorization'] = token
    }

    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

userApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error.response.data)
  },
)

export const apiUserLogin = (params: {
  username: string
  password: string
}): Promise<AxiosResponse<UserLoginResponse>> => userApi.post(`/v2/admin/signin`, params)

export const apiCheckLoginStatus = (): Promise<AxiosResponse<MessageResponse>> =>
  userApi.post(`/v2/api/user/check`)

export const apiUserLogout = (): Promise<AxiosResponse<MessageResponse>> =>
  userApi.post(`/v2/logout`)
