import api from '../utils/axios'

export const getOrders = () => api.get('/orders')
export const createOrder = (data: any) => api.post('/orders', data)
export const getOrderById = (id: string) => api.get(`/orders/${id}`)
export const updateOrder = (id: string, data: any) =>
	api.put(`/orders/${id}`, data)
export const deleteOrder = (id: string) => api.delete(`/orders/${id}`)
