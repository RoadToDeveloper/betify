<template>
	<div class="container col-12 row">
		<app-tournament v-for="(tournament, index) in liveTournaments" 
							:key="`l${index}`"
							:name="tournament.substring(2)"
							v-show="tournament.substr(0, 1) == activeGameId"
		>
			<live-match v-for="(match, index) in matches"
						:key = "match.id"
						:coefFirst = "match.coefficients[0]"	
						:coefSecond = "match.coefficients[1]"	
						:date = "match.datetime.split(' ')[0] | getDate"
						:time = "match.datetime.split(' ')[1] | getTime"
						:logoFirst = "`http://betify.xyz/logo/${match.team1id}.${match.team1extension}`"
						:logoSecond = "`http://betify.xyz/logo/${match.team2id}.${match.team2extension}`"
						:moneyFirst = "match.money1"
						:moneySecond = "match.money2"
						:percentageFirst = "(match.money1 + 1) / (match.money1 + match.money2 + 2) * 100 + '%'"
						:percentageSecond = "(match.money2 + 1) / (match.money1 + match.money2 + 2) * 100 + '%'"
						:scoreFirst = "match.score.split(':')[0]"
						:scoreSecond = "match.score.split(':')[1]"
						:teamFirst = "match.team1name"
						:teamSecond = "match.team2name"
						:game = "match.gameid"
						:show = "match.show && match.tournament == tournament.substring(2)"
						:format = "`Best-of-${match.format}`"
						:id = "match.id"
						:tournament = "match.tournament"
			>
			</live-match>
		</app-tournament>
		
	</div>	
</template>

<script>
	import LiveMatch from './templates/liveMatch.vue'
	import AppTournament from './Tournament'
	import {mapGetters} from 'vuex'
	import getTime from '../../../../src/filters/getTime.js'
	import getDate from '../../../../src/filters/getDate.js'

	export default {
		computed: {
			...mapGetters('live', {
				matches: 'matches',
				liveTournaments: 'tournaments'
			}),
			...mapGetters('matches', {
				activeGameId: 'activeGameId'
			})
		},
		filters: {
			getTime,
			getDate
		},
		components: {
			LiveMatch,
			AppTournament
		}
	}
</script>

<style scoped lang="sass">
	.container
		padding: 0px
		margin-left: 0px
</style>