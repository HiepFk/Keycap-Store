export type OrderStatus =
	| 'pending'
	| 'confirmed'
	| 'shipping'
	| 'delivered'
	| 'cancelled'

export type PaymentMethod = 'cod' | 'banking' | 'momo' | 'vnpay'
