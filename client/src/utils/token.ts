import { useStorage } from '@vueuse/core'

const accessToken = useStorage<string | null>('access_token', null)
const refreshToken = useStorage<string | null>('refresh_token', null)

// GET
export const getAccessToken = () => accessToken.value
export const getRefreshToken = () => refreshToken.value

// SET
export const setTokens = (access: string, refresh: string) => {
	accessToken.value = access
	refreshToken.value = refresh
}

// CLEAR (chuẩn)
export const clearTokens = () => {
	accessToken.value = null
	refreshToken.value = null
}
