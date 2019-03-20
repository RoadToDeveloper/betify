<template>
	<div class="games col-12 row">
		<div class="games-item col-12" 
			:class="game.class" 
			v-for="(game, index) in games"	
			@click="gameActive(index, {type: game.gameid, logo: game.img, url: game.url, name: game.name})"		
		>
			<img class="games-item-img" :src="game.img" alt="">
			<span class="games-item-name">{{ game.name }}</span>
		</div>
	</div>
</template>

<script>

	import {mapMutations} from 'vuex'
	import {mapGetters} from 'vuex'

	export default {
		mounted() {
			// setTimeout(()=>{
			// 	this.games[0].class = 'active'
			// }, 200);	
			for (let i = 0; i < this.games.length; i++) {
				if (this.games[i].name == this.currentGame) this.games[i].class = 'active'
			}			
		},
		data: () => ({
			games: [
				{
					name: "CS:GO",
					gameid: "1",
					img: "/img/csgo.png",
					url: "csgo",
					class: ""
				},	
				{
					name: "Dota 2",
					gameid: "2",
					img: "/img/dota2.png",
					url: "dota2",
					class: ""
				},							
				{
					name: "League of Legends",
					gameid: "3",
					img: "/img/lol.png",
					url: "lol",
					class: ""
				},
				{
					name: "HearthStone",
					gameid: "4",
					img: "/img/hs.png",
					url: "hs",
					class: ""
				},
				{
					name: "HotS",
					gameid: "5",
					img: "/img/hots.png",
					url: "hots",
					class: ""
				}				
			]
		}),
		computed: {
			...mapGetters('matches', {
				currentGame: 'activeGame'
			})
		},
		methods: {
			...mapMutations('matches', {
				filterMatches: 'filterMatchesByGame'
			}),
			gameActive(i, data) {
				for (let game of this.games) game.class="";
				this.games[i].class="active";
				this.filterMatches(data);
				// this.$router.push({name: 'matches', params: {game: data.url}});
			}
		}
	}
</script>

<style scoped lang="sass">
	.games		
		margin-left: 0px
		padding: 0px
		max-height: fit-content
		&-item
			display: flex
			align-items: center
			padding: 26px 0px 26px 43px
			color: rgba(255,255,255,0.3)
			font-weight: 600
			transition: all 0.5s
			height: 100px
			&-img
				transition: all 0.5s
				margin-right: 32px
				width: 40px
				filter: brightness(0.4)
			&:before
				position: absolute
				content: ''
				left: 0px
				bottom: 0%
				width: 2px
				height: 0%
				transition: height 0.5s
				background-color: #5a83ff
			&:hover
				cursor: pointer
				color: rgba(255,255,255,0.5)
				img
					filter: brightness(0.6)
		.active
			background-color: #0b101c			
			color: #fff
			img
				filter: brightness(1)
			&:before
				height: 100%
	@media only screen and (max-width : 1600px)
		.games
			&-item
				padding: 20px 0px 20px 30px
				height: 70px
				font-size: 14px
				&-img
					width: 33px
					margin-right: 20px

</style>