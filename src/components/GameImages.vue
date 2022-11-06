<template>
<swiper
    :slides-per-view="1"
    :space-between="10"
		:loop="true"
  >
    <swiper-slide v-for="word in words_array" :key="word.id">
			<router-link v-if="user" :to="{ path: `/edit_word/${word.id}` }" class="edit">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
				</svg>
			</router-link>
			<button v-if="user" class="delete" @click="deleteWord(word.id)">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
			</svg>
			</button>
			<div class="word">
				<div class="word-btns">
				<button v-if="user" class="hard-word">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M32 32C32 14.3 46.3 0 64 0S96 14.3 96 32V240H32V32zM224 192c0-17.7 14.3-32 32-32s32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V192zm-64-64c17.7 0 32 14.3 32 32v48c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32zm160 96c0-17.7 14.3-32 32-32s32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V224zm-96 88l0-.6c9.4 5.4 20.3 8.6 32 8.6c13.2 0 25.4-4 35.6-10.8c8.7 24.9 32.5 42.8 60.4 42.8c11.7 0 22.6-3.1 32-8.6V352c0 88.4-71.6 160-160 160H162.3c-42.4 0-83.1-16.9-113.1-46.9L37.5 453.5C13.5 429.5 0 396.9 0 363V336c0-35.3 28.7-64 64-64h88c22.1 0 40 17.9 40 40s-17.9 40-40 40H96c-8.8 0-16 7.2-16 16s7.2 16 16 16h56c39.8 0 72-32.2 72-72z"/></svg>
				</button>
				<button v-if="user" class="knew-word" @click="knowWord(word.id)" :class="{ knewed: word.knew }">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256z"/></svg>
				</button>
				</div>
				<img :src="word.imgUrl" alt="" width="100">
				<h4>{{word.name_en}}</h4>
			</div>
			<h5 class="name-ru">{{word.name}}</h5>
		</swiper-slide>
  </swiper>

</template>

<script>
import db from '@/firebase'
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default {
	components: { Swiper, SwiperSlide },
	props: ['words_array'],
	data() {
		return {
			knew: ''
		}
	},
	methods: {
		async deleteWord(id) {
			if(confirm('Delete word?')) {
				await deleteDoc(doc(db, "words", id));
				this.$router.back();
			}
		},
		async knowWord(id) {
			console.log(id);
			this.docRef = doc(db, "words", id);
			const docSnap = await getDoc(this.docRef);
			this.knew = docSnap.data().knew;
			if(this.knew) this.knew = false; else this.knew = true;
			await updateDoc(this.docRef, {
				knew: this.knew
			});
		}
	}
}
</script>

<style>
.swiper {
  width: 100%;
  height: 100%;
}
.swiper-slide {
	height: 100%;
  display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.word {
	width: 100%;
	max-width: 400px;
	background: #59A4F2;
	border-radius: 10px;
	padding:5px 20px 20PX;
	text-align: center;
	color: #fff;
	margin: 0 15px;
	position: relative;
}
.word img {
	width: 100%;
	height: 200px;
	display: block;
	object-fit: contain;
}
.word h4 {
	font-size: 30px;
	margin: 0;
	padding: 10px 20px 0;
	font-weight: 500;
	text-transform: uppercase;
}
.name-ru {
	font-size: 30px;
	margin-top: 30px;
	font-weight: 500;
	text-transform: uppercase;
}
.word-btns {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 10px;
}
.hard-word,
.knew-word {
	width: 30px;
	height: 30px;
	padding: 2px;
	background: none;
	border: none;
}
.hard-word svg,
.knew-word svg {
	width: 100%;
	height: 100%;
}
.hard-word svg {
	fill: yellow;
}
.knew-word svg {
	fill: red;
}
.knew-word.knewed svg {
	fill: orange;
}
.knew-word {
	margin-left: 15px;
}
.edit,
.delete {
	position: absolute;
	top:0;
	width: 40px;
	height: 40px;
	background: none;
	border: none;
}
.edit {
	right:55px;
	color: green;
}
.delete {
	right:0;
	color: red;
}

</style>