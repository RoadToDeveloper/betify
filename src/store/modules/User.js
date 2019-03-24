import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		userLogin: true,
		userData: []
	},
	getters: {
		userLogin(state) {
			return state.userLogin;
		},
		userData(state) {
			return state.userData;
		}
	},
	mutations: {

	},
	actions: {
		logout(store) {
			Vue.http.get(`http://betify.xyz/api/v1/user/logout`)
			.then((response) => {
				if (response.ok == true) store.state.userLogin = false;
			}, response => {
				return 0;
 			});
		},
		authVk(store) {
			let authWindow = window.open("http://oauth.vk.com/authorize?client_id=6496588&redirect_uri=http://betify.xyz/backend/auth/v1.php&response_type=code", "hello", "width=800,height=500,left=200,top=200");
			authWindow.open();
			let cookieInterval = setInterval(function() {
				if (document.cookie.indexOf("betifyid=") != -1) {
					store.dispatch('getUserData');
					clearInterval(cookieInterval);
				}
				console.log(document.cookie)
			}, 500)
		},
		authSteam(store) {
			let authWindow = window.open("https://steamcommunity.com/openid/login?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.mode=checkid_setup&openid.return_to=http://betify.xyz/backend/auth/v1.php%3Fstate=steam&openid.realm=http://betify.xyz/backend/auth/v1.php&openid.ns.sreg=http%3A%2F%2Fopenid.net%2Fextensions%2Fsreg%2F1.1&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select", "hello", "width=800,height=500,left=200,top=200");
			authWindow.open();
			let cookieInterval = setInterval(function() {
				if (document.cookie.indexOf("betifyid=") != -1) {
					store.dispatch('getUserData');
					clearInterval(cookieInterval);
				}
				console.log(document.cookie)
			}, 500)
		},
		getUserData(store) {	
			Vue.http.get(`http://betify.xyz/api/v1/user/get`)				
				.then(response => {					
					store.state.userLogin = true;
					return response.json();
				}, response => {
					// store.state.userLogin = false;
				})				
				.then(data => {	   		     							
					store.state.userData = data;							
		   	})
		   	.catch((error) => {
 					return 0
 				});					
		}
	}
}