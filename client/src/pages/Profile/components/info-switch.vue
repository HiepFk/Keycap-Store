<script setup lang="ts"></script>

<template>
	<div
		class="col-span-1 flex h-fit max-h-full w-full flex-col gap-4 rounded bg-white px-4 py-6"
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

		<router-link
			to="/address"
			class="nav-link"
			active-class="nav-link-active"
			exact-active-class="nav-link-active"
		>
			My Address
		</router-link>
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
