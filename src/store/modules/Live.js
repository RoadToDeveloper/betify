import live from './Live.js'
import past from './Past.js'

export default {
	namespaced: true,
	state: {
		matches: []
	},
	getters: {
		matches(state) {
			return state.matches
		},
		tournaments(state) {
			return state.tournaments
		},
		tournamentsImg(state) {
			return state.tournamentsImg
		}
	},
	mutations: {
		pushMatch(state, data) {
			let length = state.matches.length
			if (length == 0) state.matches.push([data.tournament, data.tournamentid, data.gameid, data])
			else if (data.tournament == state.matches[length-1][0]) state.matches[length-1].push(data)
			else state.matches.push([data.tournament, data.tournamentid, data.gameid, data])
		},
		updateMatch(state, data) {
			for (let i = 0; i < state.matches.length; i++) {
				for (let j = 0; j < state.matches[i].length; j ++) {
					if (state.matches[i][j].id == data.id) {
						console.log(state.matches[i][j])
						if (data.datetime != undefined) state.matches[i][j].datetime = data.datetime;
						if (data.money1 != undefined) state.matches[i][j].money1 = data.money1;
						if (data.money2 != undefined) state.matches[i][j].money2 = data.money2;						
						//надо подумать над сменой турнира, че с ним делать вообще
						if (data.tournament != undefined) {
							state.matches[i][j].tournament = data.tournament;
						}
						if (data.score != undefined) state.matches[i][j].score = data.score;
						if (data.team1name != undefined) state.matches[i][j].team1name = data.team1name;
						if (data.team2name != undefined) state.matches[i][j].team2name = data.team2name;
						if (data.coefficients != undefined) state.matches[i][j].coefficients = data.coefficients;
						//при изменении статуса надо удалять матч и добавлять в другой массив
						if (data.status != undefined) {
							state.matches[i][j].status = data.status;
							if (data.status == 1) {
								live.mutations.pushMatch(live.state, state.matches[i][j]);;
								state.matches[i].splice(j, 1);
							}
							else if (data.status == 2) {
								past.mutations.pushMatch(past.state, state.matches[i][j]);
								state.matches[i].splice(j, 1)
							}
						}
					}
				}					
			}			
		}
	},
	actions: {
		updateMatch(store, data) {
			store.commit('updateMatch', data);
			if (data.tournament != undefined) {
				for (let i = 0; i < store.state.matches.length; i++) {
					for (let j = 0; j < store.state.matches[i].length; j ++) {
						if (store.state.matches[i][j].id == data.id) {
							store.state.matches[i][j].tournament = data.tournament;
							store.commit('pushMatch', store.state.matches[i][j])
							store.state.matches[i].splice(j, 1);							
						}
					}					
				}	
			}			
		}
	}
}
