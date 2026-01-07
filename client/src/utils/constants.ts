import { OrderStatus, PaymentMethod } from '../data/order-types'

export const ORDER_STATUS_CONFIG: Record<
	OrderStatus,
	{ label: string; class: string }
> = {
	pending: {
		label: 'Đang chờ',
		class: 'bg-yellow-500',
	},
	confirmed: {
		label: 'Đã xác nhận',
		class: 'bg-blue-500',
	},
	shipping: {
		label: 'Đang giao',
		class: 'bg-purple-500',
	},
	delivered: {
		label: 'Đã giao',
		class: 'bg-green-500',
	},
	cancelled: {
		label: 'Đã huỷ',
		class: 'bg-red-500',
	},
}

export const PAYMENT_METHOD_CONFIG: Record<
	PaymentMethod,
	{ label: string; class: string; text: string }
> = {
	cod: {
		label: 'UNPAID',
		class: 'bg-red-500',
		text: 'Cod',
	},
	banking: {
		label: 'PAID',
		class: 'bg-green-500',
		text: 'Banking',
	},
	momo: {
		label: 'PAID',
		class: 'bg-green-500',
		text: 'Mono',
	},
	vnpay: {
		label: 'PAID',
		class: 'bg-green-500',
		text: 'Vnpay',
	},
}

export const ORDER_STATUS_STEPS: {
	key: OrderStatus
	label: string
}[] = [
	{ key: 'pending', label: 'Pending' },
	{ key: 'confirmed', label: 'Confirmed' },
	{ key: 'shipping', label: 'Shipping' },
	{ key: 'delivered', label: 'Delivered' },
]
