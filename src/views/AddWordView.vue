<template>
  <div class="wrapper page__form">

		<BtnBack title="Добавить слово" color="white" />

		<div class="page">

			<form @submit.prevent="createWord" class="form">
				<label>
					<h5>Раздел</h5>
					<select @input="selectCategory">
						<option>Выбрать раздел</option>
						<option
						v-for="category in categories"
						:key="category.name_en"
						:value="category.name_en">{{ category.name }}</option>
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

import db from '@/firebase';
import { addDoc, onSnapshot, collection  } from "firebase/firestore";

const categoriesRef = collection(db, 'categories');
const wordsRef = collection(db, 'words');

export default {
	components: {BtnBack},
	data() {
		return {
			name: '',
			name_en: '',
			imgUrl: '',
			categories: '',
			category: ''
		}
	},
	methods: {
		selectCategory(e) {
			this.category = e.target.value;
			console.log(e.target.value)
		},
		async getCategories() {
				onSnapshot(categoriesRef, (querySnapshot) => {
				let cats = [];
				querySnapshot.forEach((doc) => {
						cats.push(doc.data());
				});
				this.categories = cats;
			});
		},
		async createWord() {
			console.log('Create doc');
			const addedDoc = await addDoc(wordsRef, {
				name: this.name,
				name_en: this.name_en,
				imgUrl: this.imgUrl,
				category: this.category
			});
			this.name = this.name_en = this.imgUrl = this.category = '';
			console.log("Document written with ID: ", addedDoc.id);
			console.log(addedDoc);
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
		this.getCategories()
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