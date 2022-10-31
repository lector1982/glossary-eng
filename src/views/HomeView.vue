<template>
	<div class="page__main">
		<img class="icon-logo" src="@/assets/icon.png" alt="">
		<router-link class="btn-main" to="/select_game">Играть</router-link>
		<router-link class="btn-main" to="/add_cat">Добавить раздел</router-link>
		<router-link class="btn-main" to="/edit_cat">Редактировать раздел</router-link>
		<router-link class="btn-main" to="/add_word">Добавить слово</router-link>
	</div>
</template>

<script>
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// const provider = new GoogleAuthProvider();

// const auth = getAuth();
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
// 		console.log(token, user)
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     console.log(errorCode, errorMessage, email, credential)
//   });
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
	justify-content: flex-start;
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
