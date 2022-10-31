<template>
<router-view v-slot="{Component}">
	<transition name="fade" mode="out-in" appear>
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
	max-width: 800px;
	margin: 0 auto;
	font-family: 'Montserrat', sans-serif;
	overflow: hidden;
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
	transition: .3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
	transition: .3s ease-in-out;
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
	align-content: flex-start;
	height: calc(100vh - 100px);
	overflow-y: auto;
	padding: 0 10px;
	position: relative;
	scrollbar-width: thin;
	scrollbar-color: #59A4F2 #d5d5d5;
}
.page::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}
.page::-webkit-scrollbar-track {
	background: #d5d5d5;
}
.page::-webkit-scrollbar-thumb {
	background-color: #59A4F2;
}
</style>

