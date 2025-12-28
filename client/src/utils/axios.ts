import axios, {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean
}

const api: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 10000,
	withCredentials: true,
})

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem('access_token')

		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	(error: AxiosError) => Promise.reject(error),
)
api.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as CustomAxiosRequestConfig

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				// call refresh token
				const res = await axios.post<{ accessToken: string }>(
					`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
					{},
					{ withCredentials: true },
				)

				const newToken = res.data.accessToken
				localStorage.setItem('access_token', newToken)

				originalRequest.headers.Authorization = `Bearer ${newToken}`

				return api(originalRequest)
			} catch (refreshError) {
				localStorage.clear()
				window.location.href = '/login'
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	},
)

export default api
