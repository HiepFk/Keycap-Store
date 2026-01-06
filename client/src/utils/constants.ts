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
	{ label: string; class: string }
> = {
	cod: {
		label: 'UNPAID',
		class: 'bg-red-500',
	},
	banking: {
		label: 'PAID',
		class: 'bg-green-500',
	},
	momo: {
		label: 'PAID',
		class: 'bg-green-500',
	},
	vnpay: {
		label: 'PAID',
		class: 'bg-green-500',
	},
}
