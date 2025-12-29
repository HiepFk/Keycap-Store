<script setup lang="ts">
import Navigation from '../../components/navigation-global.vue'
import Core from './Components/product-core.vue'
import Ymal from '../../components/ymal-boxes.vue'
import Grid from './Components/product-image-grid.vue'
import Info from '../../components/info-section.vue'
import Footer from '../../components/footer-global.vue'
import Features from './Components/product-features.vue'

const props = defineProps<{
	category: string
	productId: string
	product: any
}>()
</script>

<template>
	<main class="flex h-full w-screen flex-col items-center bg-white">
		<Navigation color="black" />
		<Core :item="product!" />
		<Features :features="product!.features" :inthebox="product!.inthebox" />
		<Grid
			:topSrc="product!.topSrc"
			:botSrc="product!.botSrc"
			:rightSrc="product!.rightSrc"
		/>
		<Ymal :productCategory="category" :productId="1" />
		<Info />
		<Footer />
	</main>
</template>
