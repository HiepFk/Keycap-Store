import { defineStore } from 'pinia'
import { useCartStore } from './cartStore'
import { createOrder } from '../apis/order'

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
			s.phone.trim().length === '' || /^(\+84|0)\d{9}$/.test(s.phone),

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

		setTypePayment(type: string) {
			this.payment = type
		},
		async submit() {
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

			const products = Object.values(cartStore.cart).map((item: any) => ({
				productId: item.product._id,
				quantity: item.amount,
				totalPrice: item.product.price * item.amount,
			}))

			const payload = {
				products,
				shippingFee: cartStore.shipping,
				receiverName: this.name,
				receiverEmail: this.email,
				receiverPhone: this.phone,
				receiverAddress: this.address + ' - ' + this.city,
				paymentMethod: this.payment,
				isPaid: false,
				note: this.comment,
			}

			// this.bannerState = 'show'

			try {
				await createOrder(payload)
				// this.bannerState = 'show'
			} catch (error) {
				console.log('error-----', error)
			} finally {
				this.showErrors = false
			}
		},
	},
})
