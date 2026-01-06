<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getOrders } from '../../../apis/order'
import { formatDate } from '../../../utils/utilities'
import {
	ORDER_STATUS_CONFIG,
	PAYMENT_METHOD_CONFIG,
} from '../../../utils/constants'
import { OrderStatus, PaymentMethod } from '../../../data/order-types'

const orderList = ref<any[]>([])
const loading = ref(false)

const fetchOrders = async () => {
	try {
		loading.value = true
		const res = await getOrders()
		orderList.value = res.data
	} finally {
		loading.value = false
	}
}

onMounted(async () => {
	fetchOrders()
})
</script>

<template>
	<form class="col-span-4 h-full w-full rounded bg-white p-6">
		<h1 class="mb-8 text-3xl font-bold uppercase text-black">Order List</h1>

		<div class="flex flex-col gap-12 text-black">
			<div v-for="(order, index) in orderList" :key="index" :index="index">
				<div class="mb-2 flex items-center justify-between border-b pb-2">
					<p class="">
						Order Id:
						<span
							class="text-primary cursor-pointer rounded bg-[#ffc700] px-2 py-1 font-semibold"
						>
							{{ order?.orderCode }}
						</span>
					</p>
					<div class="flex items-center gap-4">
						<p class="font-semibold">{{ formatDate(order?.createdAt) }}</p>
						<p
							class="rounded px-2 py-1 text-white"
							:class="ORDER_STATUS_CONFIG[order.status as OrderStatus].class"
						>
							{{ ORDER_STATUS_CONFIG[order.status as OrderStatus].label }}
						</p>
					</div>
				</div>

				<div class="flex items-center justify-between border-b pb-2">
					<div class="flex flex-col gap-4">
						<div
							v-for="(product, index) in order?.products"
							:key="index"
							:index="index"
						>
							<div class="mb-4 flex gap-4">
								<img
									:src="product?.src"
									class="image-inner w-[4rem] rounded"
									alt=""
								/>
								<div class="flex flex-col justify-between">
									<p>{{ product?.header }}</p>
									<p>{{ product?.quantity }} x {{ product?.totalPrice }}$</p>
								</div>
							</div>
						</div>
					</div>
					<p
						class="flex h-16 w-16 items-center justify-center rounded-full text-xs italic text-white"
						:class="
							PAYMENT_METHOD_CONFIG[order.paymentMethod as PaymentMethod].class
						"
					>
						<span class="rotate-[340deg] p-4">
							{{
								PAYMENT_METHOD_CONFIG[order.paymentMethod as PaymentMethod]
									.label
							}}
						</span>
					</p>
				</div>
			</div>
		</div>
	</form>
</template>
