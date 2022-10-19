<template>
	<div class="title-back">
		<button @click="$router.back()" class="btn-back">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-8 h-8">
			<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
		</svg>
		</button>
		<h6 class="font-semibold text-2xl">{{ title }}</h6>
		<div class="empty"></div>
	</div>
</template>

<script>

export default {
	props: {
    title: String
  },

}
</script>

<style>
.title-back {
	margin: 30px 0;
	text-transform: uppercase;
	display: flex;
	justify-content: space-between;
	font-size: 30px;
	font-weight: 500;
	align-items: center;
}
.btn-back {
	color: #59A4F2;
	width: 40px;
	height: 40px;
	background: none;
	border:none;
}
</style>