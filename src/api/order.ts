import axios, { type AxiosResponse } from 'axios'

import type { DeleteOrderResponse, GetOrdersResponse } from '@/types/order'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_PATH = import.meta.env.VITE_API_PATH

const orderApi = axios.create({
  baseURL: BASE_URL,
})

orderApi.interceptors.request.use(
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

orderApi.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error.response.data)
  },
)

export const apiGetOrders = (params: {
  page?: string
}): Promise<AxiosResponse<GetOrdersResponse>> =>
  orderApi.get(`/v2/api/${API_PATH}/admin/orders`, { params })

export const apiDeleteOrder = (orderId: string): Promise<AxiosResponse<DeleteOrderResponse>> =>
  orderApi.delete(`/v2/api/${API_PATH}/admin/order/${orderId}`)
