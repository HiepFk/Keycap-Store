import LandingPage from '../pages/Landing/landing-page.vue'
import ProfilePage from '../pages/Profile/profile-page.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { categoryRoute, productRoute, handleRouteMeta } from './route-utils'
import {
	get404PageMeta,
	getCheckoutPageMeta,
	getLandingPageMeta,
} from '../data/meta-utils'

// profile children
import InfoForm from '../pages/Profile/components/info-form.vue'
import AdressList from '../pages/Profile/components/info-form.vue'
import AdressDetail from '../pages/Profile/components/info-form.vue'
import OrderList from '../pages/Profile/components/info-form.vue'
import OrderDetail from '../pages/Profile/components/info-form.vue'

import LoginPage from '../pages/Login/login-page.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: LandingPage,
		beforeEnter: () => handleRouteMeta(getLandingPageMeta),
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginPage,
	},

	{
		path: '/checkout',
		component: () => import('../pages/Checkout/checkout-page.vue'),
		beforeEnter: () => handleRouteMeta(getCheckoutPageMeta),
	},

	{
		path: '/',
		component: ProfilePage, // layout
		children: [
			{
				path: '/profile',
				name: 'Profile Info',
				component: InfoForm,
			},
			{
				path: '/orders',
				name: 'Orders',
				component: OrderList,
			},
			{
				path: '/orders/:id',
				name: 'Order Detail',
				component: OrderDetail,
			},
			{
				path: '/address',
				name: 'Address',
				component: AdressList,
			},
			{
				path: '/address:id',
				name: 'Address Detail',
				component: AdressDetail,
			},
		],
	},

	{
		path: '/404',
		component: () => import('../pages/404/404-page.vue'),
		beforeEnter: () => handleRouteMeta(get404PageMeta),
	},

	{
		path: '/:pathMatch(.*)',
		component: () => import('../pages/404/404-page.vue'),
		beforeEnter: () => handleRouteMeta(get404PageMeta),
	},

	categoryRoute('keyboards'),
	categoryRoute('keycaps'),
	categoryRoute('deskmats'),
	productRoute('keyboards'),
	productRoute('keycaps'),
	productRoute('deskmats'),
]

const Router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(_1, _2, savedPosition) {
		if (savedPosition) return savedPosition
		return { top: 0 }
	},
})

export default Router
