import active from "./Active.js"
import future from "./Future.js"


export default {
	namespaced: true,
	state: {
		matches: [],
		headerLogo: '',
		activeGame: '',
		shortActiveGameName: '',
		searchValue: '',
		activeGameId: null,
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
			return state.headerLogo;
		},
		activeGame(state) {
			return state.activeGame;
		},
		activeGameId(state) {
			return state.activeGameId;
		},
		matchesByStatus(state) {
			return state.matchesByStatus;
		},
		searchValue(state) {
			return state.searchValue;
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
			state.headerLogo = data.logo;
			state.activeGame = data.name;
			state.activeGameId = data.type;
			state.shortActiveGameName = data.url;
		},
		getMatches(state, matchData) {
			state.matches = matchData;
		},
		startSearch(state, payLoad) {

		},
		searchMatch(state, value) {
			let searchMatches = [];
			state.searchValue = value;
			if (state.matchesByStatus.active == true) searchMatches = active.matches
			else if (state.matchesByStatus.future == true) searchMatches = future.matches
			// else if (state.matchesByStatus.live == true)
			// else if (state.matchesByStatus.past == true)
			
		}
	}
}