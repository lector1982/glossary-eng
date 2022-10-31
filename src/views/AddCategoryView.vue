<template>
  <div class="wrapper page__form">

		<BtnBack title="Добавить раздел" color="white" />

		<div class="page">

			<Loader v-if="loader" />

			<form @submit.prevent="createCategory" class="form">
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
import { addDoc, collection } from "firebase/firestore";

const categoriesRef = collection(db, 'categories');

// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"


export default {
	components: {BtnBack, Loader},
	data() {
		return {
			name: '',
			name_en: '',
			imgUrl: '',
			loader: false
		}
	},
	methods: {
		async createCategory() {
			this.loader = true;
			console.log('Create doc');
			//console.log(storage);

		// let storageRef = await ref(storage, 'categories/'+this.file.name);
		// const uploadTask = uploadBytesResumable(storageRef, this.file);
		// await uploadTask.on('state_changed', () => {}, () => {},
		// () => {
		// getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
		// 	this.imgUrl = downloadURL;
		// 		console.log('File available at', this.imgUrl);
		// 	});
		// });


	const addedDoc = await addDoc(categoriesRef, {
				name: this.name,
				name_en: this.name_en,
				imgUrl: this.imgUrl
	});
	this.name = this.name_en = this.imgUrl = '';
	console.log("Document written with ID: ", addedDoc.id);
	console.log(addedDoc);
	this.loader = false;
	},
	onPickFile() {
			this.$refs.fileInput.click();
	},
	onImgUpload(e) {
		let file = e.target.files[0];
		// this.file = file;
        const reader = new FileReader();
        reader.onloadend = () => {
        const base64String = reader.result
                // .replace('data:', '')
                // .replace(/^.+,/, '');

            // console.log(base64String);
				this.imgUrl = base64String;
        };
        reader.readAsDataURL(file);
 }
	}
}
</script>

<style>
.page__form {
	background: #59A4F2;
}
.form {
	width: 100%;
	color: #fff;
}
.form h5 {
	font-weight: 500;
	font-size: 18px;
	margin: 50px 0 7px;
}
.form input[type="text"] {
	width: 100%;
	height: 50px;
	font-size:30px;
	border: none;
	background: none;
	outline: none;
	color:#fff;
	padding: 0;
	border-bottom: 2px solid #fff;
}
.form input[type="file"] {
	display: none;
}
.form-file-label {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.upload-img {
	width: 40%;
	height: 50px;
	background: #fff;
	color: #59A4F2;
	border:none;
	border-radius: 4px;
	font-size: 16px;
	padding: 0 10px;
}
.preview-img {
	width: 55%;
}
.form-btn__block {
	margin-top: 50px;
	text-align: center;
}
.form-btn__block button {
	width: 100%;
	max-width: 250px;
	height: 65px;
	background: #fff;
	color: #59A4F2;
	border:none;
	border-radius: 4px;
	font-size: 20px;
}
</style>