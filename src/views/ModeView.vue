<template>
  <div class="wrapper">

		<BtnBack title="Выбор раздела" />

		<div class="page">

			<button v-for="(category,i) in categories" :key="i" class="btn-mode">
				<!-- <img :src="require('@/assets/img/' + category.img)" alt=""> -->
				<span>{{ category.name }}</span>
			</button>

		</div>

	</div>

</template>

<script>
import BtnBack from '@/components/BtnBack.vue';
// import categoriesRef from '@/firebase'
// import { getDocs } from 'firebase/firestore'

export default {
	components: {BtnBack},
	data() {
		return {
			mode: '',
			categories: [],
		}
	},
	methods: {
		async getCategories() {
			// let categoriesSnapShot = await getDocs(categoriesRef);
			// let cats = [];
			// categoriesSnapShot.forEach(category => {
				// cats.push(category.data());
			// })
			// this.categories = cats;
		}
	},
	created() {
		this.getCategories()
	}
}
</script>

<style>
.wrapper {
	display: flex;
	flex-direction: column;
}
.page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 120px);
	overflow-y: auto;
}
.empty {
	width: 40px;
}
.btn-mode {
	width: 100%;
	max-width: 400px;
	min-height: 120px;
	background: #59A4F2;
	border: none;
	border-radius: 10px;
	color:#fff;
	font-size: 24px;
	text-transform: uppercase;
	font-weight: 500;
	margin-bottom: 25px;
	padding: 10px;
	display: flex;
	align-items: center;
}
.btn-mode span {
	flex-grow: 1;
	padding: 10px;
}
</style>