<script lang="ts" setup>
import { computed } from 'vue'
import NavigationGlobal from '../../components/navigation-global.vue'
import { useAuthStore } from '../../pinia/useAuthStore'
import TextInputField from '../Checkout/Components/text-input-field.vue'

import loginImage from '/products/keyboards/up-nobg.webp'
import registerImage from '/display/deskmat.webp'

const authStore = useAuthStore()

const currentImage = computed(() =>
	authStore.mode === 'signIn' ? loginImage : registerImage,
)

const toggleMode = () => {
	authStore.setMode(authStore.mode === 'signIn' ? 'signUp' : 'signIn')
}

const handleSubmit = async () => {
	try {
		await authStore.submit()
	} catch (err) {
		console.error(err)
	}
}
</script>

<template>
	<div class="main-container flex h-full w-screen flex-col items-center">
		<NavigationGlobal color="k-black" />

		<main class="h-[90vh] w-screen">
			<section
				class="flex h-full w-full flex-col items-center overflow-hidden rounded-b-md bg-k-black"
			>
				<div
					class="relative mt-20 flex max-w-6xl flex-col items-center text-center sm:w-4/5 md:grid md:w-11/12 md:grid-cols-2 md:text-start lg:w-4/5"
				>
					<!-- ================= FORM ================= -->
					<div class="relative mb-2 mt-8 overflow-hidden px-6 py-12">
						<p class="mb-2 font-bold capitalize tracking-wider text-k-main">
							{{ authStore.mode === 'signIn' ? 'Login' : 'Register' }} to
							Website
						</p>

						<Transition name="form-scale" mode="out-in">
							<div :key="authStore.mode" class="flex w-full flex-col gap-4">
								<TextInputField
									v-if="authStore.mode === 'signUp'"
									id="name"
									type="text"
									placeholder="Username"
									v-model="authStore.name"
									:error-message="
										authStore.name && !authStore.isNameValid
											? 'Name must be at least 2 characters'
											: ''
									"
								/>

								<TextInputField
									id="email"
									type="email"
									placeholder="Email"
									v-model="authStore.email"
									:error-message="
										authStore.email && !authStore.isEmailValid
											? 'Email is not valid'
											: ''
									"
								/>

								<TextInputField
									id="password"
									type="password"
									placeholder="Password"
									v-model="authStore.password"
									:error-message="
										authStore.password && !authStore.isPasswordValid
											? 'Password must be at least 8 characters'
											: ''
									"
								/>

								<TextInputField
									v-if="authStore.mode === 'signUp'"
									id="passwordConfirm"
									type="password"
									placeholder="Confirm password"
									v-model="authStore.passwordConfirm"
									:error-message="
										authStore.passwordConfirm && !authStore.isPasswordMatch
											? 'Passwords do not match'
											: ''
									"
								/>
							</div>
						</Transition>

						<button
							type="button"
							class="mt-6 w-full rounded bg-[#ffc700] py-3 font-bold uppercase text-white transition active:translate-y-0.5 disabled:opacity-80"
							:disabled="!authStore.canSubmit || authStore.loading"
							@click="handleSubmit"
						>
							<span v-if="!authStore.loading">
								{{ authStore.mode === 'signIn' ? 'Login' : 'Register' }}
							</span>
							<span v-else>Processing...</span>
						</button>

						<p class="mt-4 text-center text-[14px]">
							{{
								authStore.mode === 'signIn'
									? "Don't have an account?"
									: 'Already have an account?'
							}}
							<span
								class="ml-1 cursor-pointer text-[#ffc700]"
								@click="toggleMode"
							>
								{{ authStore.mode === 'signIn' ? 'Sign Up' : 'Login' }}
							</span>
						</p>
					</div>

					<!-- ================= IMAGE ================= -->
					<div class="relative overflow-hidden">
						<Transition name="image-fade" mode="out-in">
							<div :key="authStore.mode" class="image-wrapper">
								<img :src="currentImage" class="image-inner" alt="" />
							</div>
						</Transition>
					</div>
				</div>
			</section>
		</main>
	</div>
</template>

<style scoped>
.form-scale-enter-active {
	transition: all 0.35s ease;
}
.form-scale-leave-active {
	display: none;
}
.form-scale-enter-from {
	opacity: 0;
	transform: scale(0.85);
}
.form-scale-enter-to {
	opacity: 1;
	transform: scale(1);
}

.image-fade-enter-active {
	transition:
		opacity 0.45s ease,
		transform 0.45s ease;
}
.image-fade-leave-active {
	display: none;
}
.image-fade-enter-from {
	opacity: 0;
	transform: scale(0.96);
}
.image-fade-enter-to {
	opacity: 1;
	transform: scale(1);
}

.image-wrapper {
	position: relative;
	width: 100%;
	height: 100%;
	will-change: transform, opacity;
}
.image-inner {
	position: relative;
	opacity: 0.85;
}
</style>
