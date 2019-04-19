import Vue from 'vue';
import router from '../../router.js'
import matches from './Matches.js'

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
		//всю полученную информацию с сервера о матче переносим в выдвигающийся блок
		pushInfoToBetBLock(state, data) {
			state.info = data;
			// state.show = true;
			// не обнуляем choose и coef, если ставка делается сразу из матча
			if (data.readyBet == undefined) {
				state.info.coef = 0;
				state.info.choose = "";
			}		
			let body = document.querySelector("body");
			body.onkeydown = function(e) {return 0}
			body.onclick = function(e) {return 0}
			setTimeout(() => {				
				body.onkeydown = function(e) {					
					if (e.code == "Escape")	{
						state.show = false;
						body.onkeydown = function(e) {return 0};
						body.onclick = function(e) {return 0};
						if (router.currentRoute.name == "betBlock") router.go(-1);
					}
					else return 0
				}
				body.onclick = function(e) {
					let betBlockWidth = parseInt(getComputedStyle(document.getElementById("block_wrap")).width);
					if (e.pageX == 0) return 0					
					else if (e.pageX < window.innerWidth - betBlockWidth) {
						state.show = false;
						body.onkeydown = function(e) {return 0};
						body.onclick = function(e) {return 0};
						if (router.currentRoute.name == "betBlock") router.go(-1);
					}
				}
			}, 500)
			
		},
		//информация для блока со ставкой при клике на событие
		pushBetInfo(state, data) {
			state.info.choose = data.choose;
			state.info.betChoose = data.betChoose;
			state.info.coef = data.coef;
			state.info.betName = data.betName;
			if (data.eventType == "Общие события") state.info.eventType = "" 
				else state.info.eventType = data.eventType+": "
			state.info.betId = data.betId;
		}
	},
	actions: {
		//обращение к апи при нажатии на кнопку "подробнее"
		getInfoFromApi(store, betData) {			
			if (store.state.show == false) {
				store.commit('pushInfoToBetBLock', betData);									
				Vue.http.get(`http://betify.xyz/api/v1/match/getEvents/${betData.id}`)
				.then(response => response.json())
				.then(data => {	 
					console.log(betData)  
					
					store.state.betItems = [[],[],[],[],[],[]]
		     		//добавление события "победа в матче", если матч не в лайве
		     		if (betData.liveMatch != true) {
		     			store.state.betItems[0].push({
		     				coefficients: [betData.coefFirst, betData.coefSecond],
		     				id: betData.id,
		     				money1: betData.moneyFirst,
		     				money2: betData.moneySecond,
		     				name: "Победа в матче",
		     				parent: betData.id,
		     				result: "",
		     				status: 0,
		     				team1name: betData.firstChoose,
		     				team2name: betData.secondChoose
		     			})
		     		};   		     		
		     		for (let i = 0; i < data.length; i++) {
		     			let mapCounter;
		     			if (data[i].type < 100) {
		     				store.state.betItems[0].push(data[i])
		     			}  
		     			else {
		     				mapCounter = Math.floor(data[i].type/100);
		     				store.state.betItems[mapCounter].push(data[i]);
		     			}
		     		} 
		     		//показываем блок только после рендера событий, чтобы не лагало появление
		     		store.state.show = true;	
		     		//быстрая ставка, если команда сразу выбрана, небольшой таймаут на рендер
		     		if (betData.readyBet == 1 || betData.readyBet == 2) {
						store.commit('pushBetInfo', betData);
						setTimeout(() => {
			     			//подсвечиваем ставку и делаем фокус на инпут
			     			var items = document.querySelectorAll(".block_wrap-body-extra_events .item-first, .block_wrap-body-extra_events .item-second");
			     			for (let item of items) {
			     				item.classList.remove("activeItem")
			     			}
			     			if (betData.readyBet == 1) document.querySelector(".block_wrap-body-extra_events-items:first-of-type .item div:first-of-type").classList.add("activeItem")
			     				else document.querySelector(".block_wrap-body-extra_events-items:first-of-type .item div:last-of-type").classList.add("activeItem")
			     					document.getElementById("betInput").focus(); 
			     		}, 50)	     		    			
					} 				
		     	});
		     	router.push(`/${betData.id}`);
			}			
		}
	}
}