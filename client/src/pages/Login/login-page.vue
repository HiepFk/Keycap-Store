<script lang="ts" setup>
import NavigationGlobal from '../../components/navigation-global.vue'
import { useInfoStore } from '../../pinia/infoStore'
import TextInputField from '../Checkout/Components/text-input-field.vue'
import mxupImage from '/products/keyboards/up-nobg.webp'

const infoStore = useInfoStore()
</script>

<template>
	<div class="main-container flex h-full w-screen flex-col items-center">
		<NavigationGlobal color="k-black" />

		<main class="h-[90vh] w-screen">
			<section
				class="flex h-full w-full flex-col items-center overflow-hidden rounded-b-md bg-k-black"
			>
				<div
					class="relative mt-20 flex max-w-6xl flex-col items-center text-center transition-transform duration-200 sm:w-4/5 md:grid md:w-11/12 md:grid-cols-2 md:text-start lg:w-4/5"
				>
					<div class="mb-2 mt-8 px-6 py-12">
						<p class="mb-2 font-bold capitalize tracking-wider text-k-main">
							Login to Website
						</p>

						<div class="flex w-full flex-col gap-4">
							<TextInputField
								id="name"
								type="text"
								label=""
								placeholder="Username"
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
								label=""
								placeholder="Password"
								autocomplete="off"
								required
								v-model="infoStore.email"
								:error-message="
									infoStore.email && !infoStore.isEmailValid
										? 'Email is not valid'
										: ''
								"
							/>
						</div>

						<button
							type="button"
							class="mt-6 w-full cursor-pointer rounded bg-[#ffC700] py-3 font-bold uppercase text-white transition active:translate-y-0.5 disabled:opacity-90"
							:disabled="!infoStore.canUpdateInfo || infoStore.loadingInfo"
							@click="infoStore.updateInfo"
						>
							{{ 'Login' }}
						</button>
					</div>

					<div
						class="absolute bottom-0 z-0 aspect-auto w-full opacity-30 md:relative md:z-10 md:opacity-100"
					>
						<img
							class="relative top-12 scale-[175%] md:top-20 md:scale-[175%] lg:top-12 lg:scale-150"
							:src="mxupImage"
							alt=""
						/>
					</div>
				</div>
			</section>
		</main>
	</div>
</template>
