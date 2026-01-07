<script setup lang="ts">
import { PaymentMethod } from '../../../data/order-types'
import { PAYMENT_METHOD_CONFIG } from '../../../utils/constants'
import { formatDate } from '../../../utils/utilities'
import OrderProgress from './order-progress.vue'

const props = defineProps<{
	orderCode: string
	order: any
}>()

console.log('order--------------', props.order)
</script>

<template>
	<div class="col-span-4 h-full w-full rounded bg-white p-6">
		<div class="mb-8 flex items-center justify-between">
			<h1 class="text-xl font-bold text-black">
				Order ID:

				<span
					class="cursor-pointer rounded bg-[#ffc700] px-2 py-1 font-semibold text-white"
				>
					{{ order?.orderCode }}
				</span>
			</h1>
			<p class="font-semibold text-black">{{ formatDate(order?.createdAt) }}</p>
		</div>

		<OrderProgress
			:status="order.status"
			:statusHistory="order?.statusHistory"
		/>

		<div class="mt-8 flex items-center justify-between text-black">
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
		</div>
		<p class="mt-4 border-b pb-1 text-base font-bold text-black text-black">
			Information
		</p>
		<div class="mt-4 flex justify-between text-black">
			<div class="flex flex-col gap-2">
				<p>
					Name:
					<span class="font-semibold text-[#ffc700]">{{
						order?.receiverName
					}}</span>
				</p>
				<p>
					Address:
					<span class="font-semibold text-[#ffc700]">{{
						order?.receiverAddress
					}}</span>
				</p>
				<p>
					Phone:
					<span class="font-semibold text-[#ffc700]">{{
						order?.receiverPhone
					}}</span>
				</p>
			</div>

			<div class="flex flex-col items-end gap-2">
				<p>
					Subtotal:
					<span class="ml-2 font-semibold text-[#ffc700]"
						>{{ order?.totalAmount - order?.shippingFee }} $</span
					>
				</p>
				<p>
					Shipping:
					<span class="ml-2 font-semibold text-[#ffc700]"
						>{{ order?.shippingFee }} $</span
					>
				</p>
				<p>
					Total:
					<span class="ml-2 font-semibold text-[#ffc700]"
						>{{ order?.totalAmount }} $</span
					>
				</p>
			</div>
		</div>

		<div class="mt-6 flex justify-between text-black">
			<div
				class="cursor-pointer rounded bg-red-500 px-2 py-1 font-semibold text-white"
				v-if="order.status === 'pending'"
			>
				Cancel
			</div>

			<div v-else></div>

			<p class="">
				Method:
				<span
					class="ml-2 rounded bg-[#ffc700] px-2 py-1 font-semibold text-white"
					>{{
						PAYMENT_METHOD_CONFIG[order?.paymentMethod as PaymentMethod]?.text
					}}
				</span>
			</p>
		</div>
	</div>
</template>
