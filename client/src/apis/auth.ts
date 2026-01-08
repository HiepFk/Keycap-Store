import api from '../utils/axios'

export const signInApi = (data: any) => api.post(`/auth/login/`, data)

export const signUpApi = (data: any) => api.post(`/auth/register/`, data)

export const logoutApi = () => api.post(`/auth/logout/`)

export const getProfileApi = () => api.get(`/auth/profile/`)

export const updateProfileApi = (data: any) =>
	api.put(`/auth/profile/upate/`, data)

export const updatePasswordApi = (data: any) =>
	api.put(`/auth/password/upate/`, data)
