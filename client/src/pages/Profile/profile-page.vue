<script setup lang="ts">
import Navigation from '../../components/navigation-global.vue'
import Footer from '../../components/footer-global.vue'
import ButtonBack from '../../components/Buttons/button-go-back.vue'
import InfoSwitch from './components/info-switch.vue'
</script>

<template>
	<main class="flex h-full w-screen flex-col items-center bg-k-grey">
		<Navigation color="black" />
		<ButtonBack />

		<div
			class="flex h-full w-11/12 max-w-6xl flex-col gap-4 lg:mb-24 lg:grid lg:w-4/5 lg:grid-cols-5 lg:gap-6"
		>
			<InfoSwitch />
			<router-view />
		</div>

		<Footer />
	</main>
</template>
