<script setup lang="ts">
import TextInputField from '../../Checkout/Components/text-input-field.vue'
import { useInfoStore } from '../../../pinia/infoStore'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const infoStore = useInfoStore()

const route = useRoute()

const profile = computed(() => route.meta.profile)

console.log('profile------------', profile.value)
</script>

<template>
	<form class="col-span-4 h-full w-full rounded bg-white px-6 py-12 lg:px-10">
		<h1 class="text-3xl font-bold uppercase text-black">Profile Settings</h1>

		<div class="mb-2 mt-8">
			<p class="mb-2 font-bold uppercase tracking-wider text-k-main">
				Update Information
			</p>

			<div class="flex w-full flex-col gap-4 lg:grid lg:grid-cols-2">
				<TextInputField
					id="name"
					type="text"
					label="Name"
					placeholder="Your name"
					autocomplete="off"
					required
					v-model="infoStore.name"
					:error-message="
						infoStore.name && !infoStore.isNameValid
							? 'Name must be at least 2 characters'
							: ''
					"
				/>

				<TextInputField
					id="email"
					type="email"
					label="Email"
					placeholder="your@email.com"
					autocomplete="off"
					required
					v-model="infoStore.email"
					:error-message="
						infoStore.email && !infoStore.isEmailValid
							? 'Email is not valid'
							: ''
					"
				/>

				<TextInputField
					id="phone"
					type="tel"
					label="Phone"
					placeholder="+84..."
					autocomplete="off"
					v-model="infoStore.phone"
					:error-message="
						infoStore.phone && !infoStore.isPhoneValid
							? 'Phone number is not valid'
							: ''
					"
				/>
			</div>

			<button
				type="button"
				class="mt-6 w-full cursor-pointer rounded bg-black py-3 font-bold uppercase text-white transition active:translate-y-0.5 disabled:opacity-50"
				:disabled="!infoStore.canUpdateInfo || infoStore.loadingInfo"
				@click="infoStore.updateInfo"
			>
				{{ infoStore.loadingInfo ? 'Updating...' : 'Update Info' }}
			</button>
		</div>

		<div class="mb-2 mt-10">
			<p class="mb-2 font-bold uppercase tracking-wider text-k-main">
				Update Password
			</p>

			<div class="flex w-full flex-col gap-4 lg:grid lg:grid-cols-2">
				<TextInputField
					id="password"
					type="password"
					label="New Password"
					placeholder="••••••••"
					autocomplete="off"
					v-model="infoStore.password"
					:error-message="
						infoStore.password && !infoStore.isPasswordValid
							? 'Password must be at least 8 characters'
							: ''
					"
				/>

				<TextInputField
					id="passwordConfirm"
					type="password"
					label="Confirm Password"
					placeholder="••••••••"
					autocomplete="off"
					v-model="infoStore.passwordConfirm"
					:error-message="
						infoStore.passwordConfirm && !infoStore.isPasswordMatch
							? 'Passwords do not match'
							: ''
					"
				/>
			</div>

			<button
				type="button"
				class="mt-6 w-full cursor-pointer rounded bg-black py-3 font-bold uppercase text-white transition active:translate-y-0.5 disabled:opacity-50"
				:disabled="!infoStore.canUpdatePassword || infoStore.loadingPass"
				@click="infoStore.updatePassword"
			>
				{{ infoStore.loadingPass ? 'Updating...' : 'Update Password' }}
			</button>
		</div>
	</form>
</template>
