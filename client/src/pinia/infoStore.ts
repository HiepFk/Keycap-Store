import { defineStore } from 'pinia'
import { updatePasswordApi, updateProfileApi } from '../apis/auth'
import { setTokens } from '../utils/token'

export const useInfoStore = defineStore('info', {
	state: () => ({
		// info
		name: '',
		email: '',
		phone: '',

		password: '',
		passwordConfirm: '',

		loadingInfo: false,
		loadingPass: false,
	}),

	getters: {
		isNameValid: (s): boolean => s.name.trim().length >= 2,

		isEmailValid: (s): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email),

		isPhoneValid: (s): boolean =>
			s.phone === '' || /^(\+84|0)\d{9}$/.test(s.phone),

		canUpdateInfo(): boolean {
			return this.isNameValid && this.isEmailValid && this.isPhoneValid
		},

		isPasswordValid: (s): boolean => s.password.length >= 8,

		isPasswordMatch: (s): boolean => s.password === s.passwordConfirm,

		canUpdatePassword(): boolean {
			return this.isPasswordValid && this.isPasswordMatch
		},
	},

	actions: {
		setValueProfie(data: any) {
			const { email, name, phone } = data
			this.email = email
			this.name = name
			this.phone = phone
		},

		async updateInfo() {
			if (!this.canUpdateInfo) {
				throw new Error('Invalid profile information')
			}

			this.loadingInfo = true
			try {
				const res: any = await updateProfileApi({
					email: this.email,
					name: this.name,
					phone: this.phone,
				})

				const { refresh_token, access_token } = res

				setTokens(access_token, refresh_token)
			} finally {
				this.loadingInfo = false
			}
		},

		async updatePassword() {
			if (!this.canUpdatePassword) {
				throw new Error('Invalid password')
			}

			this.loadingPass = true
			try {
				const res: any = await updatePasswordApi({
					password: this.password,
				})

				console.log('res--------------', res)

				this.password = ''
				this.passwordConfirm = ''
			} finally {
				this.loadingPass = false
			}
		},

		reset() {
			this.$reset()
		},
	},
})
