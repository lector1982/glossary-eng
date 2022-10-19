<template>
	<div class="page__main">
		<router-link class="btn-main" to="/mode">Играть</router-link>
		<!-- <router-link class="btn-main" to="/mode">Настройки</router-link> -->
		<router-link class="btn-main" to="/add_cat">Добавить раздел</router-link>
		<!-- <router-link class="btn-main" to="/add_word">Добавить слово</router-link> -->
	</div>
</template>

<script>
</script>

<style>
.page__main {
	background: #59A4F2;
	height: 100vh;
	padding: 15px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.btn-main {
	font-weight: 600;
	width: 100%;
	max-width: 400px;
	text-transform: uppercase;
	padding: 30px 10px;
	border:4px solid #fff;
	border-radius: 10px;
	font-size: 30px;
	text-align: center;
	background: #fff;
	margin: 30px 0;
	color: #59A4F2;
	text-decoration: none;
}
</style>
