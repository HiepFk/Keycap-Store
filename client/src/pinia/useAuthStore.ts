import { defineStore } from 'pinia'
import { signInApi, signUpApi } from '../apis/auth'
import { setTokens } from '../utils/token'
import Router from '../routes/routes'

type AuthMode = 'signIn' | 'signUp'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		mode: 'signIn' as AuthMode,

		name: '',
		email: '',
		phone: '',
		password: '',
		passwordConfirm: '',

		loading: false,
	}),

	getters: {
		isEmailValid: (s): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email),

		isPasswordValid: (s): boolean => s.password.length >= 8,

		// ---- sign up only ----
		isNameValid: (s): boolean => s.name.trim().length >= 2,

		isPhoneValid: (s): boolean =>
			s.phone === '' || /^(\+84|0)\d{9}$/.test(s.phone),

		isPasswordMatch: (s): boolean => s.password === s.passwordConfirm,

		// ---- mode-aware ----
		canSubmit(): boolean {
			if (this.mode === 'signIn') {
				return this.isEmailValid && this.isPasswordValid
			}

			// signUp
			return (
				this.isNameValid &&
				this.isEmailValid &&
				this.isPhoneValid &&
				this.isPasswordValid &&
				this.isPasswordMatch
			)
		},
	},

	// ======================
	// ACTIONS
	// ======================
	actions: {
		setMode(mode: AuthMode) {
			this.mode = mode
			this.resetFields()
		},

		async submit() {
			console.log(111111111)

			if (!this.canSubmit) {
				throw new Error('Invalid auth data')
			}

			this.loading = true
			try {
				if (this.mode === 'signIn') {
					// CALL LOGIN API
					const res: any = await signInApi({
						email: this.email,
						password: this.password,
					})

					setTokens(res?.access_token, res?.refresh_token)

					await Router.push('/')
				} else {
					const res: any = await signUpApi({
						name: this.name,
						email: this.email,
						password: this.password,
					})

					setTokens(res?.access_token, res?.refresh_token)

					await Router.push('/')
				}
			} finally {
				this.loading = false
			}
		},

		resetFields() {
			this.name = ''
			this.email = ''
			this.phone = ''
			this.password = ''
			this.passwordConfirm = ''
		},

		reset() {
			this.$reset()
		},
	},
})
