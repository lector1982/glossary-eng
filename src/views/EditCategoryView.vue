<template>
  <div class="wrapper page__form">

		<BtnBack title="Редактировать раздел" color="white" />

		<div class="page">
			<Loader v-if="loader" />
		<div class="page" v-if="id == null">


				<div
				v-for="category in categories"
				:key="category.id"
				class="btn-mode btn-mode-invert"
				@click="getId(category.id)">
					<img class="category__img" :src="category.imgUrl" alt="">
					<span class="category__name-en">{{ category.name_en }}</span>
					<span class="category__name">({{ category.name }})</span>
				</div>

		</div>

		<div class="page" v-else>

			<form @submit.prevent="updateCategory" class="form">
				<label>
					<h5>Название</h5>
					<input type="text" v-model="name" required lang="ru">
				</label>
				<label>
					<h5>Название EN</h5>
					<input type="text" v-model="name_en" required lang="en">
				</label>
				<label>
					<h5>Иконка</h5>
					<div class="form-file-label">
						<button type="button" class="upload-img" @click="onPickFile">Загрузить иконку</button>
						<input type="file" ref="fileInput" accept="image/*" @change="onImgUpload">
						<img class="preview-img" :src="imgUrl" alt="">
					</div>
				</label>
				<div class="form-btn__block">
					<button type="submit">Отправить</button>
				</div>
			</form>
		</div>
		</div>

	</div>

</template>

<script>
import BtnBack from '@/components/BtnBack.vue';
import Loader from '@/components/LoaderForm.vue';

import db from '@/firebase'
import { onSnapshot, collection, doc, getDoc, updateDoc } from 'firebase/firestore'

const categoriesRef = collection(db, 'categories');


export default {
	components: {BtnBack, Loader},
	data() {
		return {
			categories: [],
			loader: false,
			id: null,
			docRef: null,
			name: '',
			name_en: '',
			imgUrl: ''
		}
	},
	methods: {
		async getId(id) {
			this.loader = true;
			this.id = id;
			this.docRef = doc(db, "categories", this.id);
			const docSnap = await getDoc(this.docRef);
			this.name = docSnap.data().name;
			this.name_en = docSnap.data().name_en;
			this.imgUrl = docSnap.data().imgUrl;
			this.loader = false;
		},
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
		},
		async updateCategory() {
			this.loader = true;
			await updateDoc(this.docRef, {
				name: this.name,
				name_en: this.name_en,
				imgUrl: this.imgUrl
			});
			this.loader = false;
			this.id = null;
		},
		onPickFile() {
			this.$refs.fileInput.click();
		},
		onImgUpload(e) {
			let file = e.target.files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
			const base64String = reader.result;
				this.imgUrl = base64String;
			};
			reader.readAsDataURL(file);
}
	},
	created() {
		this.loader = true;
		this.getCategories();

	}
}
</script>

<style>
.btn-mode.btn-mode-invert {
	cursor: pointer;
	border: 2px solid #fff;
}
.btn-mode.btn-mode-invert:hover {
	background: rgba(255,255,255,0.7);
	color: #59A4F2;
}
</style>