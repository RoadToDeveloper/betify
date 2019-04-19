<template>
	<div class="container col-12 row">
	  
		<app-tournament v-for="(group, index) in matches" 
							:key="`l${index}`"
							:name="group[0]"
							:logo="group[1]"
							v-show="group[2] == activeGameId && group.length > 3"
		>
			<live-match v-for="(match, index) in group.slice(3)"
						:key = "match.id"
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
						v-show = "match.gameid == activeGameId"
						:format = "`Best-of-${match.format}`"
						:id = "match.id"
						:streamId="`l${match.id}`"
						:tournament = "match.tournament"
						:stream = "match.stream"
			>
				<div class="stream_wrap"  :id="`l${match.id}`"></div>
			</live-match>

		</app-tournament>
		<p v-if="!emptyCheck">Сожалеем, сейчас в дисциплине {{ activeGame }} нет событий данного типа</p>
	</div>	
</template>

<script>
	import LiveMatch from './templates/liveMatch.vue'
	import AppTournament from './Tournament'
	import {mapGetters} from 'vuex'
	import getTime from '../../../../src/filters/getTime.js'
	import getDate from '../../../../src/filters/getDate.js'

	export default {
		data: ()=>({
			emptyCheck: 0,
			channel: 'DreadzTV'
		}),
		computed: {
			...mapGetters('live', {
				matches: 'matches'
			}),
			...mapGetters('matches', {
				activeGameId: 'activeGameId',
				activeGame: 'activeGame'
			})
		},
		filters: {
			getTime,
			getDate
		},
		components: {
			LiveMatch,
			AppTournament
		},
		watch: {
			matches() {
				this.emptyCheck = 0;
				for (let i = 0; i < this.matches.length; i++) {
					if (this.matches[i][2] == this.activeGameId) this.emptyCheck++
				}	
			},
			activeGameId() {
				this.emptyCheck = 0;
				for (let i = 0; i < this.matches.length; i++) {
					if (this.matches[i][2] == this.activeGameId) this.emptyCheck++
				}
			}
		}
	}
</script>

<style scoped lang="sass">
	.container
		padding: 0px
		margin-left: 0px
		p
			color: rgba(255, 255, 255, 0.5)
			text-align: center
			width: 100%
</style>