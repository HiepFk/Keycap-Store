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
		orderList.value = res.data?.reverse()
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
		<h1 class="mb-8 text-xl font-bold uppercase text-black">Order List</h1>

		<div class="flex flex-col gap-12 text-black">
			<div v-for="(order, index) in orderList" :key="index" :index="index">
				<div class="mb-2 flex items-center justify-between border-b pb-2">
					<p class="text-primary font-semibold">
						Order Id:

						<router-link :to="`/orders/${order?.orderCode}`">
							<span
								class="cursor-pointer rounded bg-[#ffc700] px-2 py-1 font-semibold text-white"
							>
								{{ order?.orderCode }}
							</span>
						</router-link>
					</p>
					<div class="flex items-center gap-4">
						<p class="font-semibold">{{ formatDate(order?.createdAt) }}</p>
						<p
							class="w-[7rem] rounded py-1 text-center text-white"
							:class="ORDER_STATUS_CONFIG[order.status as OrderStatus].class"
						>
							{{ ORDER_STATUS_CONFIG[order.status as OrderStatus].label }}
						</p>
					</div>
				</div>

				<div class="flex items-center justify-between border-b">
					<div class="flex flex-col gap-4">
						<div
							v-for="(product, index) in order?.products"
							:key="index"
							:index="index"
						>
							<div class="mb-4 flex gap-4">
								<router-link
									:to="{ name: product.category, params: { id: product._id } }"
								>
									<img
										loading="lazy"
										:src="product?.src"
										class="image-inner w-[6rem] rounded"
										alt=""
									/>
								</router-link>

								<div class="flex flex-col justify-between">
									<div>
										<p class="text-[18px] font-semibold">
											{{ product?.header }}
										</p>
										<p class="text-base">{{ product?.subheader }}</p>
									</div>
									<p class="text-base">
										{{ product?.quantity }} x {{ product?.price }}$
									</p>
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
