<template>
	<div class="title-back" :class="color">
		<button @click="$router.back()" class="btn-back">
			<svg fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
			</svg>
		</button>
		<h6>{{ title }}</h6>
		<div class="empty"></div>
	</div>
</template>

<script>

export default {
	props: {
    title: String,
		color: String
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
	color: green
}
.title-back.white,
.white .btn-back {
	color:#fff;
}
.btn-back {
	color: #59A4F2;
	width: 40px;
	height: 40px;
	background: none;
	border:none;
}
.empty {
	width: 40px;
}
</style>