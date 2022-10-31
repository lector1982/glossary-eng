<template>
<swiper
    :slides-per-view="1"
    :space-between="10"
		:loop="true"
  >
    <swiper-slide v-for="(word,i) in words_array" :key="i">
			<div class="word word-test">
				<h4>{{word.name_en}}</h4>
			</div>
			<div class="answers">
					<button>{{word.name}}</button> <!--правильный ответ-->
					<button v-for="(answer,i) in sortedArray" :key="i">  <!--вот тут нужно случайным образом выводить слова-->
						{{answer.name}} - {{i}}
					</button>
			</div>
		</swiper-slide>
  </swiper>

</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default {
	components: { Swiper, SwiperSlide },
	props: ['words_array'],
	data() {
		return {
			myWords: this.words_array,
			arr: this.words_array
		}
	},
	methods: {
		randomList: function(rand){
      return rand.sort(function(){return 0.5 - Math.random()});
    }
	},
	computed: {
  filteredRecipes() {
    let tempRecipes = this.words_array

    // Process search input
    if (this.searchValue != '' && this.searchValue) {
        tempRecipes = tempRecipes.filter((item) => {
          return item.title
            .toUpperCase()
            .includes(this.searchValue.toUpperCase())
        })
      }

      // Filter out by cooking time
      if (this.maxCookingTime)
      tempRecipes = tempRecipes.filter((item) => {
        return (item.cookingTime <= this.maxCookingTime)
      })

    // Sort by alphabetical order
        tempRecipes = tempRecipes.sort((a, b) => {
            if (this.sortBy == 'alphabetically') {
                let fa = a.title.toLowerCase(), fb = b.title.toLowerCase()

              if (fa < fb) {
                return -1
              }
              if (fa > fb) {
                return 1
              }
              return 0

              // Sort by cooking time
            } else if (this.sortBy == 'cookingTime') {
              return a.cookingTime - b.cookingTime
        }
        })

        // Show sorted array in descending or ascending order
        if (!this.ascending) {
        tempRecipes.reverse()
        }

        return tempRecipes
  }
},
	created() {
		console.log(this.myWords);
	}

}
</script>

<style>
.word-test {
	padding: 20px;
}
.word-test h4 {
	padding: 0;
}
.answers {
	width: 100%;
	margin: 40px auto 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.answers button {
	width: calc(50% - 40px);
	background: #dadada;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  color: #fff;
	border: none;
	margin-bottom: 30px;
	font-size: 18px;
	color: #000;
	font-weight: 500;
	text-transform: uppercase;
}
.answers button:hover {
	background: #6b6b6b;
	color:#fff;
}
</style>