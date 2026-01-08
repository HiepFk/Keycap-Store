import { defineStore } from 'pinia'
import { useCartStore } from './cartStore'

export const useFormStore = defineStore('form', {
	state: () => ({
		bannerState: 'hide',
		name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		payment: 'cod',
		comment: '',
		showErrors: false,
	}),

	getters: {
		showBanner(state: any) {
			if (state.bannerState == 'show') {
				return true
			}
			return false
		},

		isNameValid: (s): boolean => s.name.trim().length > 0,

		isEmailValid: (s): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email),

		isPhoneValid: (s): boolean =>
			s.phone === '' ||
			(/^(\+84|0)\d{9}$/.test(s.phone) && s.phone.trim().length > 0),

		isCityValid: (s): boolean => s.city.trim().length > 0,

		isAddressValid: (s): boolean => s.address.trim().length > 0,
	},

	actions: {
		bannerOn() {
			this.bannerState = 'show'
		},
		bannerOff() {
			this.bannerState = 'hide'
		},
		setCash(e: Event) {
			e.preventDefault()
			this.payment = 'cash'
		},
		setElectronic(e: Event) {
			e.preventDefault()
			this.payment = 'electronic'
		},
		setTypePayment(type: string) {
			this.payment = type
		},
		submit() {
			const cartStore = useCartStore()

			if (cartStore.isEmpty) {
				alert('Shopping cart is empty!')
				return
			}

			this.showErrors = true
			if (
				!this.isNameValid ||
				!this.isEmailValid ||
				!this.isPhoneValid ||
				!this.isCityValid ||
				!this.isAddressValid
			) {
				return
			}

			// 🔥 CONVERT CART OBJECT → ARRAY
			const items = Object.values(cartStore.cart).map((item: any) => ({
				productId: item.product._id,
				name: item.product.header,
				price: item.product.price,
				quantity: item.amount,
				total: item.product.price * item.amount,
			}))

			const payload = {
				customer: {
					name: this.name,
					email: this.email,
					phone: this.phone,
					address: this.address,
					city: this.city,
				},
				payment: this.payment,
				items,
				subTotal: cartStore.cartValue,
				shipping: cartStore.shipping,
				grandTotal: cartStore.getGrandTotal,
			}

			console.log(payload)
		},
	},
})
