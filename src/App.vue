<template>
<router-view v-slot="{Component}">
	<transition name="slide-left" mode="out-in" appear>
		<component :is="Component" />
	</transition>
</router-view>

</template>

<script setup>

</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
#app {
	height: 100vh;
	font-family: 'Montserrat', sans-serif;
}
button {
	cursor: pointer;
	font-family: 'Montserrat', sans-serif;
}
.slide-left-enter-from,
.slide-left-leave-to {
	transform: translateX(-100%);
}
.slide-left-enter-active,
.slide-left-leave-active {
	transition: .5s ease-in-out;
}
.wrapper {
	display: flex;
	flex-direction: column;
}
.page {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	height: calc(100vh - 100px);
	overflow-y: auto;
	padding: 0 10px;
}
</style>

