<template>
  <div class="wrapper page__form">

		<BtnBack title="Добавить слово" color="white" />

		<div class="page">

			<Loader v-if="loader" />

			<form @submit.prevent="createWord" class="form">
				<label>
					<h5>Раздел</h5>
					<select ref="category_select" @input="selectCategory" required>
						<option value="">-----</option>
						<option
						v-for="category in categories"
						:key="category.id"
						:value="category.id">{{ category.name }}</option>
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

import db from '@/firebase';
import { addDoc, onSnapshot, collection  } from "firebase/firestore";

const categoriesRef = collection(db, 'categories');
const wordsRef = collection(db, 'words');

export default {
	components: {BtnBack, Loader},
	data() {
		return {
			name: '',
			name_en: '',
			imgUrl: '',
			categories: '',
			category: '',
			loader: true,
			hard: false,
			knew: false
		}
	},
	methods: {
		selectCategory(e) {
			this.category = e.target.value;
		},
		async getCategories() {
				onSnapshot(categoriesRef, (querySnapshot) => {
				let cats = [];
				querySnapshot.forEach((doc) => {
						cats.push({
						id: doc.id,
						name: doc.data().name
					});
				});
				this.categories = cats;
				this.loader = false;
			});
		},
		async createWord() {
			this.loader = true;
			await addDoc(wordsRef, {
				name: this.name,
				name_en: this.name_en,
				imgUrl: this.imgUrl,
				category: this.category,
				hard: this.hard,
				knew: this.knew,
			});
			this.name = this.name_en = this.imgUrl = this.category = '';
			this.loader = false;
			this.$refs.category_select.selectedIndex = 0;
	},
	onPickFile() {
			this.$refs.fileInput.click();
	},
	onImgUpload(e) {
		let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
    const base64String = reader.result
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
.form select {
	width: 100%;
	height: 50px;
	font-size:24px;
	border: none;
	background: none;
	outline: none;
	color:#fff;
	padding: 0;
	border-bottom: 2px solid #fff;
}
.form select option {
	color: #59A4F2;
}
</style>