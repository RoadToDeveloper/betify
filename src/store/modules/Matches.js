export default {
	namespaced: true,
	state: {
		matches: [
			// {
			// 	coef1: 1.54,
			// 	coef2: 2.47,
			// 	date: "10/03",
			// 	dateFormatted: "10 марта",
			// 	datetime: "2019-03-10 07:06:00",
			// 	format: "Best-of-3",
			// 	id: 187833,
			// 	link: "112fc046df43cd9d82f270a618fafdf9",
			// 	logo1: "https://img.abiosgaming.com/competitors/keen-gaming-logo.png",
			// 	logo2: "https://img.abiosgaming.com/competitors/Team-Ukraine-Dota-logo.png",
			// 	money1: 3394,
			// 	money2: 2123,
			// 	percentage1: 62,
			// 	percentage2: 38,
			// 	score: "2:0",
			// 	score1: "2",
			// 	score2: "0",
			// 	showTournamentPast: 1,
			// 	status: 'past',
			// 	team1: "Keen Gaming",
			// 	team2: "Team Ukraine Y",
			// 	time: "07:06",
			// 	tournament: "2018 World Electronic Sports Games",
			// 	type: "Dota 2",
			// 	show: true
			// },
			// {
			// 	coef1: 1.49,
			// 	coef2: 2.63,
			// 	date: "10/03",
			// 	dateFormatted: "10 марта",
			// 	datetime: "2019-03-10 09:35:00",
			// 	format: "Best-of-3",
			// 	id: 187834,
			// 	link: "b7025a89b2107fe0c5c1cdd53ec3fbd0",
			// 	logo1: "https://img.abiosgaming.com/competitors/TeamRussia-teamlogo.png",
			// 	logo2: "https://img.abiosgaming.com/competitors/TNC-pro-team-new-logo.png",
			// 	money1: 3233,
			// 	money2: 1828,
			// 	percentage1: 64,
			// 	percentage2: 36,
			// 	score: "0:1",
			// 	score1: "0",
			// 	score2: "1",
			// 	showTournamentActive: 1,
			// 	showTournamentLive: 1,
			// 	status: "live",
			// 	team1: "Team Russia WESG",
			// 	team2: "TNC Predator",
			// 	time: "09:35",
			// 	timestamp: 1552210500,
			// 	tournament: "2018 World Electronic Sports Games",
			// 	tournamentHash: "9e7c9089c495315897c75a6769cfc72e",
			// 	type: "Dota 2",
			// 	show: true
			// },
			// {
			// 	coef1: 1.98,
			// 	coef2: 1.82,
			// 	date: "10/03",
			// 	dateFormatted: "10 марта",
			// 	datetime: "2019-03-10 01:00:00",
			// 	format: "Best-of-3",
			// 	id: 189279,
			// 	link: "6b237de56999c53892f04ea4181c234e",
			// 	logo1: "https://betify.pro/img/no-photo-cs-go.png",
			// 	logo2: "https://img.abiosgaming.com/competitors/niknexus-teamlogo.png",
			// 	money1: 2097,
			// 	money2: 2284,
			// 	percentage1: 48,
			// 	percentage2: 52,
			// 	score: "1:2",
			// 	score1: "1",
			// 	score2: "2",
			// 	showTournamentPast: 1,
			// 	status: 'future',
			// 	team1: "Anunnaki",
			// 	team2: "Niknexus",
			// 	time: "01:00",
			// 	timestamp: 1552179600,
			// 	tournament: "ESL Pro League 9 Americas",
			// 	tournamentHash: "63fdbdfb70edd50323f97472dfe7c948",
			// 	type: "CS:GO",
			// 	show: true
			// }
		],
		headerLogo: '',
		activeGame: 'CS:GO',
		activeGameId: 1,
		matchesByStatus: {
			active: true,
			future: false,
			live: false,
			past: false
		}
	},
	getters: {
		matches(state) {
			return state.matches;
		},
		headerLogo(state) {
			return state.headerLogo
		},
		activeGame(state) {
			return state.activeGame
		},
		activeGameId(state) {
			return state.activeGameId;
		},
		matchesByStatus(state) {
			return state.matchesByStatus
		}
	},
	mutations: {
		filterMatchesByStatus(state, type) {
			state.matchesByStatus.active = false;
			state.matchesByStatus.future = false;
			state.matchesByStatus.live = false;
			state.matchesByStatus.past = false;
			state.matchesByStatus[type] = true;
		},
		filterMatchesByGame(state, data) {
			for (let i = 0; i < state.matches.length; i++) {
				if (state.matches[i].gameid == data.type) state.matches[i].show = true;
					else state.matches[i].show = false
			}
			state.headerLogo = data.logo;
			state.activeGame = data.name;
			state.activeGameId = data.type;
		},
		getMatches(state, matchData) {
			state.matches = matchData;
		}
	},
	actions: {

	}
}