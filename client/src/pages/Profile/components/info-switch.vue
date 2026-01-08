<script setup lang="ts">
import { logoutApi } from '../../../apis/auth'
import Router from '../../../routes/routes'
import { clearTokens } from '../../../utils/token'

const handleLogout = async () => {
	try {
		await logoutApi()
	} catch (error) {
		console.log(error)
	} finally {
		clearTokens()
		await Router.push('/')
	}
}
</script>

<template>
	<div
		class="sticky top-4 col-span-1 flex h-fit max-h-full w-full flex-col gap-4 rounded bg-white px-4 py-6"
	>
		<router-link
			to="/profile"
			class="nav-link"
			active-class="nav-link-active"
			exact-active-class="nav-link-active"
		>
			My Profile
		</router-link>

		<router-link
			to="/orders"
			class="nav-link"
			active-class="nav-link-active"
			exact-active-class="nav-link-active"
		>
			My Order
		</router-link>

		<div class="mt-2 flex w-full items-center justify-center">
			<span
				class="cursor-pointer rounded bg-[#ffc700] px-2 py-1 font-semibold text-white"
				@click="handleLogout"
			>
				Logout
			</span>
		</div>
	</div>
</template>

<style scoped>
.nav-link {
	@apply text-black transition duration-300 hover:text-k-main active:translate-y-0.5;
}

.nav-link-active {
	@apply text-k-main;
}
</style>
