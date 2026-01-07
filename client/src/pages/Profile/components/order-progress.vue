<script setup lang="ts">
import { computed } from 'vue'
import { ORDER_STATUS_STEPS } from '../../../utils/constants'
import { OrderStatus } from '../../../data/order-types'

const props = defineProps<{
	status: OrderStatus
}>()

const currentIndex = computed(() =>
	ORDER_STATUS_STEPS.findIndex((s: any) => s.key === props.status),
)
</script>

<template>
	<div
		v-if="status === 'cancelled'"
		class="rounded bg-red-100 px-4 py-2 text-center font-semibold text-red-600"
	>
		Order Cancelled
	</div>

	<div v-else class="flex items-start justify-center">
		<template v-for="(step, index) in ORDER_STATUS_STEPS" :key="step.key">
			<div class="flex flex-col items-center">
				<div
					class="z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
					:class="
						index < currentIndex
							? 'bg-green-500'
							: index === currentIndex
							? 'bg-yellow-500'
							: 'bg-gray-300'
					"
				>
					{{ index + 1 }}
				</div>

				<span
					class="mt-2 text-center text-xs font-medium"
					:class="index <= currentIndex ? 'text-black' : 'text-gray-400'"
				>
					{{ step.label }}
				</span>
			</div>

			<div
				v-if="index < ORDER_STATUS_STEPS.length - 1"
				class="mx-2 mt-4 h-1 w-32"
				:class="index < currentIndex ? 'bg-green-500' : 'bg-gray-300'"
			/>
		</template>
	</div>
</template>
