<script setup lang="ts">
const orderList: any = []
</script>

<template>
	<form class="col-span-4 h-full w-full rounded bg-white px-6 py-12 lg:px-10">
		<h1 class="text-3xl font-bold uppercase text-black">Order List</h1>

		<div class="flex flex-col gap-8">
			<div v-for="(order, index) in orderList" :key="index" :index="index">
				<p class="">
					Order Id:
					<span>
						{{ order?.id }}
					</span>
				</p>

				<div
					v-for="(product, index) in order?.products"
					:key="index"
					:index="index"
				>
					<div>
						<img :src="product?.image" class="image-inner" alt="" />
						<div>
							<p>{{ product?.name }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
</template>
