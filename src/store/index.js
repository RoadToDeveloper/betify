import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import matches from './modules/Matches'
import past from './modules/Past'
import live from './modules/Live'
import active from './modules/Active'
import future from './modules/Future'
import betBlock from './modules/betBlock'
import popups from './modules/popups'
import user from './modules/User'

export default new Vuex.Store({
  	modules: {
  		matches,
  		active,
  		past,
  		live,
  		future,
  		betBlock,
  		popups,
  		user
  	}
})
