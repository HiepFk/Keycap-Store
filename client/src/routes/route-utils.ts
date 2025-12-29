import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useSeoMeta } from '@unhead/vue'
import { getProduct } from '../data/product-utils.ts'
import { meta } from '../data/meta-types'
import { getCategoryPageMeta, getProductPageMeta } from '../data/meta-utils'
import { getProductById } from '../apis/product.ts'

function parseRouteId(id: string | string[]): number {
	if (Array.isArray(id)) return parseInt(id[0])
	return parseInt(id)
}

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
		component: () => import('../pages/Category/category-page.vue'),
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
		component: () => import('../pages/Product/product-page.vue'),

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
					title: product.title,
					description: product.description,
					ogTitle: product.title,
					ogDescription: product.description,
					ogImage: product.image,
				})

				next()
			} catch (e) {
				next('/404')
			}
		},
	}
}
