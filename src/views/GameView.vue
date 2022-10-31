<template>
	<div class="wrapper">

		<BtnBack :title="title" />

		<div class="page page__view">

		<Loader v-if="loader" />

				<GameImages v-if="viewGame == 'game_images'" :words_array="words"></GameImages>
				<GameText v-if="viewGame == 'game_text'" :words_array="words"></GameText>
				<GameTest v-if="viewGame == 'game_test'" :words_array="words"></GameTest>

		</div>

	</div>
</template>

<script>
import BtnBack from '@/components/BtnBack.vue';
import Loader from '@/components/LoaderForm.vue';

import GameImages from '@/components/GameImages.vue';
import GameText from '@/components/GameText.vue';
import GameTest from '@/components/GameTest.vue';

import db from '@/firebase'
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";


export default {
	components: {BtnBack, Loader, GameImages, GameText, GameTest},
	data() {
    return {
			loader: false,
			viewGame: '',
			catId: '',
			title: '',
			words: []
    }
  },
	methods: {
		async getWords() {
			const q = query(collection(db, "words"), where("category", "==", this.catId));
			const words = [];
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				words.push({
					id: doc.id,
					name: doc.data().name,
					name_en: doc.data().name_en,
					imgUrl: doc.data().imgUrl,
					knew: doc.data().knew,
				});
			});
			this.words = words;
			this.loader = false;
		},
		async getTitleCategory() {
			this.docRef = doc(db, "categories", this.catId);
			const docSnap = await getDoc(this.docRef);
			this.title = docSnap.data().name;
		}
	},
	created() {
		this.loader = true;
		this.viewGame = this.$route.params.viewGame;
		this.catId = this.$route.params.id;
		this.getWords();
		this.getTitleCategory();
	}
}
</script>

