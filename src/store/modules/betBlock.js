import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		show: false,
		info: [],
		betItems: [
			[],
			[],
			[],
			[],
			[],
			[]
		]
	},
	getters: {
		show(state) {
			return state.show;
		},
		info(state) {
			return state.info;
		},
		betItems(state) {
			return state.betItems;
		}
	},
	mutations: {
		hideBlock(state) {
			state.show = false;
		},
		//всю полученную информацию с сервера переносим в выдвигающийся блок
		pushInfoToBetBLock(state, data) {
			state.info = data;
			state.show = true;
			let body = document.querySelector("body");
			body.onkeydown = function(e) {return 0}
			body.onclick = function(e) {return 0}
			setTimeout(() => {				
				body.onkeydown = function(e) {					
					if (e.code == "Escape")	{
						state.show = false;
						body.onkeydown = function(e) {return 0}
						body.onclick = function(e) {return 0}
					}
				}
				body.onclick = function(e) {
					let betBlockWidth = parseInt(getComputedStyle(document.getElementById("block_wrap")).width);
					if (e.pageX < window.innerWidth - betBlockWidth) {
						state.show = false;
						body.onkeydown = function(e) {return 0}
						body.onclick = function(e) {return 0}
					}
				}
			}, 500)
			
		},
		//информация для блока со ставкой
		pushBetInfo(state, data) {
			state.info.firstChoose = data.firstResult;
			state.info.secondChoose = data.secondResult;
			state.info.coefFirst = data.coefFirst;
			state.info.coefSecond = data.coefSecond;
			state.info.betName = data.betName;
			if (data.eventType == "Общие события") state.info.eventType = "" 
				else state.info.eventType = data.eventType+": "
			state.info.betId = data.betId;
		}
	},
	actions: {
		getInfoFromApi(store, betData) {
			Vue.http.get(`http://betify.xyz/api/v1/match/getEvents/${betData.id}`)
        .then(response => response.json())
        .then(data => {	        	
	     		store.state.betItems = [[],[],[],[],[],[]]
           	for (let i = 0; i < data.length; i++) {
           		let mapCounter;
           		if (data[i].type < 100) store.state.betItems[0].push(data[i]) 
           		else {
           			mapCounter = Math.floor(data[i].type/100);
           			store.state.betItems[mapCounter].push(data[i]);
           		}
           	} 
       	});
        store.commit('pushInfoToBetBLock', betData)
		}
	}
}