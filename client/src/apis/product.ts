import api from '../utils/axios'

// src/api/product.api.ts
export const getProducts = (category?: string) =>
	api.get('/products', {
		params: category ? { category } : {},
	})
export const createProduct = (data: any) => api.post('/products', data)
export const getProductById = (id: string) => api.get(`/products/${id}`)
export const updateProduct = (id: string, data: any) =>
	api.put(`/products/${id}`, data)
export const deleteProduct = (id: string) => api.delete(`/products/${id}`)
