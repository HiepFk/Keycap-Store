import { defineStore } from 'pinia'

export const useInfoStore = defineStore('info', {
	state: () => ({
		// info
		name: '',
		email: '',
		phone: '',

		// password
		password: '',
		passwordConfirm: '',

		// ui
		loadingInfo: false,
		loadingPass: false,
	}),

	// ======================
	// VALIDATION GETTERS
	// ======================
	getters: {
		// ---- info ----
		isNameValid: (s): boolean => s.name.trim().length >= 2,

		isEmailValid: (s): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email),

		isPhoneValid: (s): boolean =>
			s.phone === '' || /^(\+84|0)\d{9}$/.test(s.phone),

		canUpdateInfo(): boolean {
			return this.isNameValid && this.isEmailValid && this.isPhoneValid
		},

		// ---- password ----
		isPasswordValid: (s): boolean => s.password.length >= 8,

		isPasswordMatch: (s): boolean => s.password === s.passwordConfirm,

		canUpdatePassword(): boolean {
			return this.isPasswordValid && this.isPasswordMatch
		},
	},

	// ======================
	// ACTIONS
	// ======================
	actions: {
		async updateInfo() {
			if (!this.canUpdateInfo) {
				throw new Error('Invalid profile information')
			}

			this.loadingInfo = true
			try {
				// CALL API ở đây
				console.log('Update info', {
					name: this.name,
					email: this.email,
					phone: this.phone,
				})
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
				// CALL API ở đây
				console.log('Update password', {
					password: this.password,
				})

				// reset form
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
