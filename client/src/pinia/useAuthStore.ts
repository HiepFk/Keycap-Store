import { defineStore } from 'pinia'

type AuthMode = 'signIn' | 'signUp'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		// mode
		mode: 'signIn' as AuthMode,

		// fields (dùng chung)
		name: '',
		email: '',
		phone: '',
		password: '',
		passwordConfirm: '',

		// ui
		loading: false,
	}),

	// ======================
	// GETTERS – VALIDATION
	// ======================
	getters: {
		// ---- base ----
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
			if (!this.canSubmit) {
				throw new Error('Invalid auth data')
			}

			this.loading = true
			try {
				if (this.mode === 'signIn') {
					// CALL LOGIN API
					console.log('Sign in', {
						email: this.email,
						password: this.password,
					})
				} else {
					// CALL REGISTER API
					console.log('Sign up', {
						name: this.name,
						email: this.email,
						phone: this.phone,
						password: this.password,
					})
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
