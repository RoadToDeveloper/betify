export default {
	namespaced: true,
	state: {
		matches: []
	},
	getters: {
		matches(state) {
			return state.matches;
		},
		tournaments(state) {
			return state.tournaments;
		},
		tournamentsImg(state) {
			return state.tournamentsImg;
		}
	},
	mutations: {
		pushMatch(state, data) {
			let length = state.matches.length;
			if (length == 0) state.matches.push([data.tournament, data.tournamentid, data.gameid, data]);
			else if (data.tournament == state.matches[length-1][0]) state.matches[length-1].push(data);
			else state.matches.push([data.tournament, data.tournamentid, data.gameid, data]);
		}
	}
}
