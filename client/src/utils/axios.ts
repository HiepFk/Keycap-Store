import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import {
	getAccessToken,
	getRefreshToken,
	setTokens,
	clearTokens,
} from './token'

interface FailedQueueItem {
	resolve: (token: string) => void
	reject: (error: any) => void
}

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL as string,
	timeout: 10000,
	withCredentials: true,
})
let isRefreshing = false
let failedQueue: FailedQueueItem[] = []

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) prom.reject(error)
		else if (token) prom.resolve(token)
	})
	failedQueue = []
}

api.interceptors.request.use((config: any) => {
	const token = getAccessToken()
	if (token && config.headers) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

// Xử lý lỗi response
api.interceptors.response.use(
	(response: AxiosResponse) => {
		// Mình chỉ lấy res.data.data nếu có, còn không thì trả res.data
		return response.data?.data ?? response.data
	},
	async (
		error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } },
	) => {
		const originalRequest = error.config

		if (
			error.response?.status === 401 &&
			originalRequest &&
			!originalRequest._retry
		) {
			originalRequest._retry = true

			if (isRefreshing) {
				return new Promise<string>((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then((token) => {
						if (originalRequest.headers) {
							originalRequest.headers.Authorization = `Bearer ${token}`
						}
						return api(originalRequest)
					})
					.catch((err) => Promise.reject(err))
			}

			isRefreshing = true

			try {
				const refreshToken = getRefreshToken()
				const res = await axios.post(
					`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
					{
						refresh_token: refreshToken,
					},
				)

				const newAccessToken = res.data.access_token
				const newRefreshToken = res.data.refresh_token
				setTokens(newAccessToken, newRefreshToken)

				processQueue(null, newAccessToken)

				if (originalRequest.headers) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
				}

				const retryRes = await api(originalRequest)
				// cũng map lại để lấy data.data luôn
				return retryRes.data?.data ?? retryRes.data
			} catch (err) {
				processQueue(err, null)
				clearTokens()
				window.location.href = '/login'
				return Promise.reject(err)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	},
)

export default api
