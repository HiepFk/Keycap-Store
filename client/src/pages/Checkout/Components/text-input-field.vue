<script lang="ts" setup>
const props = defineProps<{
	modelValue: string
	type: string
	id: string
	label?: string
	placeholder?: string
	errorMessage?: string
	required?: boolean
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>()
</script>

<template>
	<div class="mb-2 flex w-full flex-col">
		<label v-if="label" :for="id" class="mb-1 text-xs text-black">{{
			label
		}}</label>

		<input
			:id="id"
			:type="type"
			:value="modelValue"
			:placeholder="placeholder"
			:required="required"
			class="w-full rounded border border-[#CCCC] border-opacity-60 bg-white p-3 font-Manrope font-semibold text-black outline-none focus:border-k-main"
			@input="
				emit('update:modelValue', ($event.target as HTMLInputElement).value)
			"
		/>

		<p v-if="errorMessage" class="text-sm text-red-500">
			{{ errorMessage }}
		</p>
	</div>
</template>
