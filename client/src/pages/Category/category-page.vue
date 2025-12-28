<script setup lang="ts">
import Navigation from '../../components/navigation-global.vue'
import CategoryBoxes from '../../components/Category-Box/category-box-container.vue'
import Info from '../../components/info-section.vue'
import Footer from '../../components/footer-global.vue'
import Showbox from './Components/category-show-box.vue'
import { onMounted, ref, watch } from 'vue'
import { getProducts } from '../../apis/product.ts'

const props = defineProps<{
	category: string
}>()

const products = ref<any[]>([])
const loading = ref(false)

const fetchProducts = async () => {
	try {
		loading.value = true
		const res = await getProducts(props.category)
		console.log('res--------------', res)

		console.log('res.data.data.data-----------------', res.data.data.data)

		products.value = res.data.data.data
	} finally {
		loading.value = false
	}
}

onMounted(async () => {
	fetchProducts()
})

watch(
	() => props.category,
	(newCategory, oldCategory) => {
		if (newCategory !== oldCategory) {
			fetchProducts()
		}
	},
)
</script>

<template>
	<Navigation color="black" />
	<header class="flex w-full flex-col items-center bg-black lg:rounded-b-lg">
		<div
			class="my-10 flex w-4/5 max-w-6xl flex-col items-center justify-center lg:my-20"
		>
			<h1
				class="text-4xl font-semibold uppercase tracking-wider text-white antialiased"
			>
				{{ props.category }}
			</h1>
		</div>
	</header>
	<main
		class="main-container flex h-full w-screen flex-col items-center bg-white"
	>
		<Showbox
			v-for="(product, index) in products"
			:item="product"
			:category="props.category"
			:data-test="`showbox-${product.category}-${product._id}`"
			:key="index"
			:index="index"
		/>
		<CategoryBoxes />
		<Info />
		<Footer />
	</main>
</template>
