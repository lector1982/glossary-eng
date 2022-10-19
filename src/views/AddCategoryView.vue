<template>
  <div class="wrapper">

		<BtnBack title="Добавить раздел" />

		<div class="page">

			<img :src="imgUrl" alt="" height="100">
			<form @submit.prevent="createCategory">
				<label>
					<h5>Название</h5>
					<input type="text" v-model="name"><br>
				</label>
				<label>
					<h5>Название EN</h5>
					<input type="text" v-model="name_en"><br>
				</label>
				<label>
					<h5>Иконка</h5>
					<!-- <button @click="onPickFile">Загрузить иконку</button> -->
					<input type="file" ref="fileInput" accept="image/*" @change="onFilePicked"><br>
				</label>
				<button>Отправить</button>
			</form>

		</div>

	</div>

</template>

<script>
import BtnBack from '@/components/BtnBack.vue';

import { categoriesRef, storage } from '@/firebase'
import { addDoc } from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
// const storage2 = getStorage();



export default {
	components: {BtnBack},
	data() {
		return {
			name: '',
			name_en: '',
			imgUrl: '',
			file: ''
		}
	},
	methods: {
		async createCategory() {
			console.log('Create doc');

		let storageRef = ref(storage, 'categories/'+this.file.name);
		const uploadTask = uploadBytesResumable(storageRef, this.file);
		uploadTask.on('state_changed', (snapshot) => {console.log(snapshot);},
		(error) => {
		switch (error.code) {
		case 'storage/unauthorized':
		break;
		case 'storage/canceled':
		break;
		case 'storage/unknown':
		break;
		}
	},
	() => {
	getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
	this.imgUrl = downloadURL;
		//console.log('File available at', this.imgUrl);
	});
	});

	const addedDoc = await addDoc(categoriesRef, this.$data);
	console.log(addedDoc);
	},
		// onPickFile() {
		// 	this.$refs.fileInput.click();
		// },
	onFilePicked(e) {
		let file = e.target.files[0];
		this.file = file;
		// const storageRef = storage.ref(this.path + `${file.name}`).put(file);
		// storageRef.on(`state_changed`, snapshot => { console.log(snapshot) },
    //      (error) => {
    //            console.log(error.message)
    //       },
    //       () => {
    //         storageRef.snapshot.ref.getDownloadURL().then(url => {
    //           this.picture.push(url)
    //         })
    //       }
    //     )
 }
	}
}
</script>

<style>
.wrapper {
	display: flex;
	flex-direction: column;
}
.title-back {
	margin: 30px 0;
	text-transform: uppercase;
	display: flex;
	justify-content: space-between;
	font-size: 30px;
	font-weight: 500;
	align-items: center;
}
.page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 120px);
	overflow-y: auto;
}
</style>