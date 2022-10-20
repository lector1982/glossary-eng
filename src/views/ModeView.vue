<template>
  <div class="wrapper">

		<BtnBack title="Выбор раздела" />

		<div class="page">

			<button v-for="(category,i) in categories" :key="i" class="btn-mode">
				<img :src="category.imgUrl" alt="" height="100">
				<span>{{ category.name }}</span>
				<small>{{ category.name_en }}</small>
			</button>

		</div>

	</div>

</template>

<script>
import BtnBack from '@/components/BtnBack.vue';
import db from '@/firebase'
import { onSnapshot, collection } from 'firebase/firestore'

const categoriesRef = collection(db, 'categories');

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
			onSnapshot(categoriesRef, (querySnapshot) => {
			let cats = [];
			querySnapshot.forEach((doc) => {
					cats.push(doc.data());
			});
			this.categories = cats;
		});
			// let categoriesSnapShot = await getDocs(categoriesRef);
			// let cats = [];
			// categoriesSnapShot.forEach(category => {
			// 	cats.push(category.data());
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
.btn-mode {
	width: calc(50% - 30px);
	max-width: 400px;
	margin: 0 15px 30px;
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
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.btn-mode span {
	flex-grow: 1;
	padding: 10px;
}
</style>