<template>
  <div class="wrapper">

		<BtnBack title="Выбор игры" />

		<div class="page page__view">

			<router-link to="/select_game/game_images" class="select-view">
				<img src="@/assets/images.jpg" alt="">
				<span>Картинки</span>
			</router-link>
			<router-link to="/select_game/game_text" class="select-view">
				<img src="@/assets/text.jpg" alt="">
				<span>Текст</span>
			</router-link>
			<router-link to="/select_game/game_test" class="select-view">
				<img src="@/assets/test.jpg" alt="">
				<span>Тест</span>
			</router-link>

		</div>

	</div>

</template>

<script>
import BtnBack from '@/components/BtnBack.vue';


export default {
	components: {BtnBack},
}
</script>

<style>
.page.page__view {
	flex-direction: column;
	align-content: center;
}
.select-view {
	text-decoration: none;
	width: 100%;
	max-width: 400px;
	margin: 0 0 20px;
	background: #59A4F2;
	color:#fff;
	border-radius: 10px;
	text-transform: uppercase;
	font-weight: 500;
	display: flex;
	padding: 10px;
	align-items: center;
	cursor: pointer;
}
.select-view span {
	flex-grow: 1;
	text-align: center;
	font-size: 34px;
	margin-left: 20px;
}
</style>