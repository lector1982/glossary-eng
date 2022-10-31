<template>
  <div class="wrapper">

		<BtnBack title="Выбор раздела" />

		<div class="page">

			<Loader v-if="loader" />

			<router-link
			:to="{ path: `/${viewGame}/${category.id}` }"
			v-for="category in categories"
			:key="category.id"
			class="btn-mode">
				<img class="category__img" :src="category.imgUrl" alt="">
				<span class="category__name-en">{{ category.name_en }}</span>
				<span class="category__name">({{ category.name }})</span>
			</router-link>

		</div>

	</div>

</template>

<script>
import BtnBack from '@/components/BtnBack.vue';
import Loader from '@/components/LoaderForm.vue';

import db from '@/firebase'
import { onSnapshot, collection } from 'firebase/firestore'

const categoriesRef = collection(db, 'categories');

export default {
	components: {BtnBack, Loader},
	data() {
		return {
			categories: [],
			loader: false,
			viewGame: ''
		}
	},
	methods: {
		async getCategories() {
			onSnapshot(categoriesRef, (querySnapshot) => {
			let cats = [];
			querySnapshot.forEach((doc) => {
					cats.push({
						id: doc.id,
						name: doc.data().name,
						name_en: doc.data().name_en,
						imgUrl: doc.data().imgUrl,
					});
			});
			this.categories = cats;
			this.loader = false;
		});
		}
	},
	created() {
		this.loader = true;
		this.getCategories();
		this.viewGame = this.$route.params.viewGame;
	}
}
</script>

<style>
.btn-mode {
	text-decoration: none;
	width: calc(50% - 20px);
	margin: 0 10px 20px;
	background: #59A4F2;
	border: none;
	color:#fff;
	border-radius: 10px;
	text-transform: uppercase;
	font-weight: 500;
	padding: 15px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.category__img {
	width: 100%;
	height: 150px;
	object-fit: cover;
}
.category__name-en {
	font-size: 18px;
	margin: 8px 0 3px;
}
.category__name {
	font-size: 16px;
}

@media(max-width: 500px) {
	.category__img {
		height: 100px;
	}
	.category__name-en {
		font-size: 16px;
	}
	.category__name {
		font-size: 14px;
	}
}
@media(max-width: 360px) {
	.btn-mode {
		width: 100%;
		margin: 0 0 20px;
	}
	.category__img {
		height: 150px;
	}
}
</style>