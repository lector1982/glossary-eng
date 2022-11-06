<template>
	<div class="page__main">
		<img class="icon-logo" src="@/assets/icon.png" alt="">
		<router-link class="btn-main" to="/select_game">Играть</router-link>
		<router-link class="btn-main" to="/add_cat" v-if="user">Добавить раздел</router-link>
		<router-link class="btn-main" to="/edit_cat" v-if="user">Редактировать раздел</router-link>
		<router-link class="btn-main" to="/add_word" v-if="user">Добавить слово</router-link>
		<button @click="signInWithGoogle">Google</button>
	</div>
</template>

<script>
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export default {
	data() {
		return {
			user: null
		}
	},
	methods: {
		signInWithGoogle() {
			const provider = new GoogleAuthProvider();
			signInWithPopup(getAuth(), provider)
			.then((result) => {
				console.log(result.user)
				this.user = result.user;
			})
			.catch((error) => {
				console.log(error)
			})
		}
	}
}
</script>

<style>
.icon-logo {
	width: 150px;
}
.page__main {
	background: #59A4F2;
	height: 100vh;
	padding: 15px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	overflow-y: auto;
	scrollbar-width: thin;
	scrollbar-color: #59A4F2 #d5d5d5;
}
.page__main::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}
.page__main::-webkit-scrollbar-track {
	background: #d5d5d5;
}
.page__main::-webkit-scrollbar-thumb {
	background-color: #59A4F2;
}
.btn-main {
	font-weight: 600;
	width: 100%;
	max-width: 400px;
	text-transform: uppercase;
	padding: 20px 10px;
	border:4px solid #fff;
	border-radius: 10px;
	font-size: 20px;
	text-align: center;
	background: none;
	margin: 25px 0;
	color: #fff;
	text-decoration: none;
}
@media(max-width: 400px) {
	.btn-main {
		font-size: 16px;
	}
}
</style>
