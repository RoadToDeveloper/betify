export default {
	namespaced: true,
	state: {
		matches: [

		],
		headerLogo: '',
		activeGame: 'CS:GO',
		activeGameId: 1,
		matchesByStatus: {
			active: false,
			future: true,
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