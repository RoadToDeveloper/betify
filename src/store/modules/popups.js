export default {
	namespaced: true,
	state: {
		popups: {
			technicalHelp: false,
			job: false,
			deposit: false,
			withdraw: false
		},
		activePopup: ''
	},
	getters: {
		popups(state) {
			return state.popups
		},
		activePopup(state) {
			return state.activePopup
		}
	},
	mutations: {
		doPopup(state, name) {
			if (name != '') {
				let body = document.querySelector("body");
				if (state.popups[name] == true) {
					setTimeout(()=>{
						document.querySelector('body').style.overflow = 'visible'
						document.querySelector('#app').style.paddingRight = '0px'
						document.querySelector('.header').style.paddingRight = '0px'
						state.activePopup = ''
					}, 400)
				}
				else {           
					document.querySelector('body').style.overflow = 'hidden'
					document.querySelector('#app').style.paddingRight = '4px'
					document.querySelector('.header').style.paddingRight = '4px'
					state.activePopup = name;
				}
				setTimeout(()=>{
					state.popups[name] = !state.popups[name]
				}, 10)      
				let elems = document.getElementsByClassName('wrapper_popup')
				for (let i = 0; i < elems.length; i++) {
					if (getComputedStyle(elems[i]).display == 'none') elems[i].style.top = `${-body.getBoundingClientRect().y}px`
				}
			}			
      }
	}
}