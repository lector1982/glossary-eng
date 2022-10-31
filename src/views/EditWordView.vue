<template>
  <div class="wrapper page__form">

		<BtnBack title="Редактировать слово" color="white" />

		<div class="page">
			<Loader v-if="loader" />


			<form @submit.prevent="updateWord" class="form">
				<label>
					<h5>Раздел</h5>
					<select ref="category_select" @input="selectCategory" required>
						<option value="">-----</option>
						<option
						v-for="category in categories"
						:key="category.id"
						:value="category.id" :selected="category.id == currentCategory">{{ category.name }}</option>
					</select>
				</label>
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
			imgUrl: '',
			currentCategory: '',
			category: ''
		}
	},
	methods: {
		async getWord() {
			this.docRef = doc(db, "words", this.id);
			const docSnap = await getDoc(this.docRef);
			this.name = docSnap.data().name;
			this.name_en = docSnap.data().name_en;
			this.imgUrl = docSnap.data().imgUrl;
			this.currentCategory = docSnap.data().category;
			this.loader = false;
		},
		selectCategory(e) {
			this.category = e.target.value;
		},
		async getCategories() {
			onSnapshot(categoriesRef, (querySnapshot) => {
			let cats = [];
			querySnapshot.forEach((doc) => {
					cats.push({
						id: doc.id,
						name: doc.data().name,
						name_en: doc.data().name_en,
						imgUrl: doc.data().imgUrl
					});
			});
			this.categories = cats;
			this.loader = false;
		});
		},
		async updateWord() {
			this.loader = true;
			if( this.category == '' ) this.category = this.currentCategory;
			await updateDoc(this.docRef, {
				name: this.name,
				name_en: this.name_en,
				imgUrl: this.imgUrl,
				category: this.category
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
		this.id = this.$route.params.id;
		this.getWord();
		this.getCategories();

	}
}
</script>

<style>

</style>