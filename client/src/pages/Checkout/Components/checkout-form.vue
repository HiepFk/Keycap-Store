<script setup lang="ts">
import TextInputField from './text-input-field.vue'
import { useFormStore } from '../../../pinia/formStore.ts'

const formStore = useFormStore()

const handleChosseTypePayment = (e: Event, type: string) => {
	e.preventDefault()
	formStore.setTypePayment(type)
}
</script>
<template>
	<form class="col-span-2 h-full w-full rounded bg-white px-6 py-12 lg:px-10">
		<h1 class="text-3xl font-bold uppercase text-black">Checkout</h1>
		<div class="mt-10">
			<p class="mb-2 font-bold uppercase tracking-wider text-k-main">
				Billing details
			</p>
			<div class="flex w-full flex-col items-center gap-4">
				<TextInputField
					id="name"
					type="text"
					label="Name"
					placeholder="Your name"
					autocomplete="off"
					required
					v-model="formStore.name"
					:error-message="
						formStore.name && !formStore.isNameValid ? 'Name is required' : ''
					"
				/>

				<TextInputField
					id="email"
					type="email"
					label="Email Address"
					placeholder="alex@mail.com"
					required
					autocomplete="off"
					v-model="formStore.email"
					:error-message="
						formStore.email && !formStore.isEmailValid
							? 'Must be a valid email address.'
							: ''
					"
				/>

				<TextInputField
					id="phone"
					type="tel"
					label="Phone Number"
					placeholder="+1000-555-0136"
					required
					autocomplete="off"
					v-model="formStore.phone"
					:error-message="
						formStore.phone && !formStore.isPhoneValid
							? 'Must be a valid phone.'
							: ''
					"
				/>
			</div>
		</div>

		<div class="mt-10">
			<p class="mb-2 font-bold uppercase tracking-wider text-k-main">
				Shipping Info
			</p>
			<div class="flex w-full flex-col items-center gap-4">
				<TextInputField
					id="city"
					type="text"
					label="City"
					placeholder="New York"
					autocomplete="off"
					required
					v-model="formStore.city"
					:error-message="
						formStore.city && !formStore.isCityValid ? 'City is required' : ''
					"
				/>

				<TextInputField
					id="address"
					label="Address"
					type="text"
					placeholder="1134 Willams Avenue"
					autocomplete="off"
					required
					container-class="col-span-2"
					v-model="formStore.address"
					:error-message="
						formStore.address && !formStore.isAddressValid
							? 'Address is required'
							: ''
					"
				/>
			</div>
		</div>

		<div class="mt-10">
			<p class="mb-2 font-bold uppercase tracking-wider text-k-main">
				Payment Details
			</p>
			<p class="mb-1 font-bold text-black" for="country">Payment Method</p>
			<div class="flex w-full flex-col gap-4 lg:grid lg:grid-cols-2">
				<button
					class="group flex w-full cursor-pointer flex-row items-center gap-4 rounded border border-black border-opacity-60 p-3 transition-all active:translate-y-0.5"
					:class="{ 'bg-k-main': formStore.payment === 'cod' }"
					@click="handleChosseTypePayment($event, 'cod')"
				>
					<div
						class="aspect-square h-3 rounded-full border border-black border-opacity-60"
						:class="{ 'bg-black': formStore.payment === 'cod' }"
					></div>
					<span class="font-semibold text-black"> Cash On Delivery </span>
				</button>

				<button
					class="group flex w-full cursor-pointer flex-row items-center gap-4 rounded border border-black border-opacity-60 p-3 transition-all active:translate-y-0.5"
					:class="{ 'bg-k-main': formStore.payment === 'vnpay' }"
					@click="handleChosseTypePayment($event, 'vnpay')"
				>
					<div
						class="aspect-square h-3 rounded-full border border-black border-opacity-60"
						:class="{ 'bg-black': formStore.payment === 'vnpay' }"
					></div>
					<span class="font-semibold text-black"> Vnpay </span>
				</button>

				<button
					class="group flex w-full cursor-pointer flex-row items-center gap-4 rounded border border-black border-opacity-60 p-3 transition-all active:translate-y-0.5"
					:class="{ 'bg-k-main': formStore.payment === 'momo' }"
					@click="handleChosseTypePayment($event, 'momo')"
				>
					<div
						class="aspect-square h-3 rounded-full border border-black border-opacity-60"
						:class="{ 'bg-black': formStore.payment === 'momo' }"
					></div>
					<span class="font-semibold text-black"> Momo </span>
				</button>

				<button
					class="group flex w-full cursor-pointer flex-row items-center gap-4 rounded border border-black border-opacity-60 p-3 transition-all active:translate-y-0.5"
					:class="{ 'bg-k-main': formStore.payment === 'banking' }"
					@click="handleChosseTypePayment($event, 'banking')"
				>
					<div
						class="aspect-square h-3 rounded-full border border-black border-opacity-60"
						:class="{ 'bg-black': formStore.payment === 'banking' }"
					></div>
					<span class="font-semibold text-black"> Banking </span>
				</button>

				<div class="col-span-2 flex h-40 flex-col">
					<label class="mb-1 mt-4 font-bold text-black" for="country"
						>Add a comment</label
					>
					<textarea
						class="h-full rounded border border-black border-opacity-60 bg-white p-3 font-Manrope font-semibold text-black outline-none hover:border-k-main"
						type=""
						id="comment"
						placeholder="Your request"
						v-model="formStore.comment"
						required
						data-test="form-text-area"
					/>
				</div>
			</div>
		</div>
	</form>
</template>
