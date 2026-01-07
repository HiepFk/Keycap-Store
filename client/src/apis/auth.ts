import api from '../utils/axios'

export const signInApi = (data: any) => api.post(`/auth/login/`, data)

export const signUpApi = (data: any) => api.post(`/auth/register/`, data)
