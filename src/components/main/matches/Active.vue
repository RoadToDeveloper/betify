<template>
	<div class="container col-12 row">
		<app-tournament v-for="(group, index) in matches" 
							:key="`al${index}`"
							:name="group[0]"
							:logo="group[1]"
							ref="activeTournament"
							:gameId="group[2]"
							v-show="group[2] == activeGameId"
		>
			
			<div  class="template-container" v-for="(match, index) in group.slice(3)" :key = "`af${match.id}`">
				<future-match 
						v-if="match.status == 0"
						:coefFirst = "match.coefficients[0]"	
						:coefSecond = "match.coefficients[1]"	
						:date = "match.datetime.split(' ')[0] | getDate"
						:time = "match.datetime.split(' ')[1] | getTime"
						:logoFirst = "`http://betify.xyz/logo/${match.team1id}.${match.team1extension}`"
						:logoSecond = "`http://betify.xyz/logo/${match.team2id}.${match.team2extension}`"
						:moneyFirst = "match.money1"
						:moneySecond = "match.money2"
						:percentageFirst = "((match.money1 + 1) / (match.money1 + match.money2 + 2) * 100).toFixed(0) + '%'"
						:percentageSecond = "((match.money2 + 1) / (match.money1 + match.money2 + 2) * 100).toFixed(0) + '%'"
						:scoreFirst = "match.score.split(':')[0]"
						:scoreSecond = "match.score.split(':')[1]"
						:teamFirst = "match.team1name"
						:teamSecond = "match.team2name"
						:game = "match.gameid"
						v-show = "match.gameid == activeGameId && (match.team1name.indexOf(searchValue) == 0 || match.team2name.indexOf(searchValue) == 0 || group[0].indexOf(searchValue) == 0)"
						:format = "`Best-of-${match.format}`"
						:id = "match.id"
						:tournament = "match.tournament"
				>
			</future-match>
			<live-match
						v-else
						:coefFirst = "match.coefficients[0]"	
						:coefSecond = "match.coefficients[1]"	
						:date = "match.datetime.split(' ')[0] | getDate"
						:time = "match.datetime.split(' ')[1] | getTime"
						:logoFirst = "`http://betify.xyz/logo/${match.team1id}.${match.team1extension}`"
						:logoSecond = "`http://betify.xyz/logo/${match.team2id}.${match.team2extension}`"
						:moneyFirst = "match.money1"
						:moneySecond = "match.money2"
						:percentageFirst = "((match.money1 + 1) / (match.money1 + match.money2 + 2) * 100).toFixed(0) + '%'"
						:percentageSecond = "((match.money2 + 1) / (match.money1 + match.money2 + 2) * 100).toFixed(0) + '%'"
						:scoreFirst = "match.score.split(':')[0]"
						:scoreSecond = "match.score.split(':')[1]"
						:teamFirst = "match.team1name"
						:teamSecond = "match.team2name"
						:game = "match.gameid"
						v-show = "match.gameid == activeGameId && (match.team1name.indexOf(searchValue) == 0 || match.team2name.indexOf(searchValue) == 0 || group[0].indexOf(searchValue) == 0)"
						:format = "`Best-of-${match.format}`"
						:id = "match.id"
						:streamId = "`al${match.id}`"
						:tournament = "match.tournament"
						:stream = "match.stream"
			>
				<div class="stream_wrap"  :id="`al${match.id}`"></div>
			</live-match>
			</div>
			
		</app-tournament>
		<p v-if="!emptyCheck">Сожалеем, сейчас в дисциплине {{ activeGame }} нет событий данного типа</p>	
		<p v-if="!searchResult">Упс, совпадений не найдено :(</p>		
	</div>	
</template>

<script>
	import FutureMatch from './templates/futureMatch.vue'
	import LiveMatch from './templates/liveMatch.vue'
	import AppTournament from './Tournament'
	import {mapGetters} from 'vuex'
	import getTime from '../../../../src/filters/getTime.js'
	import getDate from '../../../../src/filters/getDate.js'

	export default {
		mounted() {
			setTimeout(()=>{
				console.log(this.$refs.activeTournament[0])
			}, 1000)			
		},
		data: ()=>({
			emptyCheck: 1,
			searchResult: true
		}),
		components: {
			FutureMatch,
			LiveMatch,
			AppTournament
		},
		filters: {
			getTime,
			getDate
		},
		computed: {
			...mapGetters('active', {
				matches: 'matches'
			}),
			...mapGetters('matches', {
				activeGameId: 'activeGameId',
				activeGame: 'activeGame',
				searchValue: 'searchValue'
			}),
			checkToShowTournament() {
				let array = this.$refs.activeTournament;

				for (let i = 0; i < array.length; i++) {
					if (array[i].gameId == this.activeGameId && array[i].name.indexOf(this.searchValue) != 0) {
						let counter = 0;
						for (let j = 0; j < array[i].$children.length; j++) {
							if (array[i].$children[j].teamFirst.indexOf(this.searchValue) == 0 || array[i].$children[j].teamSecond.indexOf(this.searchValue) == 0) {
								counter++;
							}
						}
						if (counter == 0) array[i].$el.style.display = "none"
							else array[i].$el.style.display = "flex"
					}							
				}
				if (array[0].$parent.$el.clientHeight == 0) this.searchResult = false;
					else this.searchResult = true;
			}
		},
		watch: {
			matches() {
				this.emptyCheck = 0;
				for (let i = 0; i < this.matches.length; i++) {
					if (this.matches[i][2] == this.activeGameId) this.emptyCheck++
				}	
			},
			activeGameId() {
				this.checkToShowTournament;
				this.emptyCheck = 0;
				this.searchResult = true;
				for (let i = 0; i < this.matches.length; i++) {
					if (this.matches[i][2] == this.activeGameId) this.emptyCheck++
				}
				
					
					
			},
			searchValue() {
				if (this.searchValue == "") {
					let array = this.$refs.activeTournament;
					for (let i = 0; i < array.length; i++) {
						if (array[i].gameId == this.activeGameId) {
							array[i].$el.style.display = "flex"
						}							
					}
				}
				else this.checkToShowTournament;														
			}
		}
	}
</script>

<style scoped lang="sass">
	.container
		padding: 0px
		margin-left: 0px
		.template-container
			width: 100%
		p
			color: rgba(255, 255, 255, 0.5)
			text-align: center
			width: 	100%
</style>