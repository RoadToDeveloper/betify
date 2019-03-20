export default {
	namespaced: true,
	state: {
		matches: [],
		tournaments: []
	},
	getters: {
		matches(state) {
			return state.matches
		},
		tournaments(state) {
			return state.tournaments
		}
	},
	mutations: {
		pushMatch(state, data) {
			let i = 0;
			state.matches.push(data);
			//в начало названия добавляем gameid, который вырезаем в названии турнира и используем при 
			//сортировке по играм
			if (state.tournaments.indexOf(data.gameid+" "+data.tournament) == -1) state.tournaments.push(data.gameid+" "+data.tournament);	
		}
	}
}