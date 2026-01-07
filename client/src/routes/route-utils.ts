import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useSeoMeta } from '@unhead/vue'
import { meta } from '../data/meta-types'
import { getCategoryPageMeta } from '../data/meta-utils'
import { getProductById } from '../apis/product.ts'

import OrderDetail from '../pages/Profile/components/order.vue'
import CategoryPage from '../pages/Category/category-page.vue'
import ProductPage from '../pages/Product/product-page.vue'
import { getOrderById } from '../apis/order.ts'

export function handleRouteMeta(metaFunc: () => meta): void {
	const metaData = metaFunc()
	useSeoMeta({
		title: metaData.title,
		description: metaData.description,
		ogTitle: metaData.title,
		ogDescription: metaData.description,
		ogImage: metaData.image,
	})
}

export function categoryRoute(category: string) {
	return {
		path: `/${category}`,
		component: CategoryPage,
		props: { category: category },
		beforeEnter: () => {
			const meta = getCategoryPageMeta(category)
			useSeoMeta({
				title: meta.title,
				description: meta.description,
				ogTitle: meta.title,
				ogDescription: meta.description,
				ogImage: meta.image,
			})
		},
	}
}

export function productRoute(category: string) {
	return {
		path: `/${category}/:id`,
		name: category,
		component: ProductPage,

		props: (route: RouteLocationNormalized) => ({
			category,
			productId: Number(route.params.id),
			product: route.meta.product, // 👈 truyền thẳng product
		}),

		beforeEnter: async (
			to: RouteLocationNormalized,
			_: RouteLocationNormalized,
			next: NavigationGuardNext,
		) => {
			try {
				const product: any = await getProductById(to.params.id as string)

				if (!product) {
					next('/404')
					return
				}

				to.meta.product = product

				useSeoMeta({
					title: product.header,
					description: product.subheader,
					ogTitle: product.header,
					ogDescription: product.subheader,
					ogImage: product.src,
				})

				next()
			} catch (e) {
				next('/404')
			}
		},
	}
}

export function orderRoute() {
	return {
		path: `/orders/:id`,
		name: 'Order',
		component: OrderDetail,

		props: (route: RouteLocationNormalized) => ({
			orderCode: Number(route.params.id),
			order: route.meta.order, // 👈 truyền thẳng order
		}),

		beforeEnter: async (
			to: RouteLocationNormalized,
			_: RouteLocationNormalized,
			next: NavigationGuardNext,
		) => {
			try {
				const order: any = await getOrderById(to.params.id as string)

				if (!order) {
					next('/404')
					return
				}

				to.meta.order = order

				// useSeoMeta({
				// 	title: product.header,
				// 	description: product.subheader,
				// 	ogTitle: product.header,
				// 	ogDescription: product.subheader,
				// 	ogImage: product.src,
				// })

				next()
			} catch (e) {
				next('/404')
			}
		},
	}
}
