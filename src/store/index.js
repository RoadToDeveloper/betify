import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import matches from './modules/Matches'
import past from './modules/Past'
import live from './modules/Live'
import future from './modules/Future'
import betBlock from './modules/betBlock'
import popups from './modules/popups'

export default new Vuex.Store({
  	modules: {
  		matches,
  		past,
  		live,
  		future,
  		betBlock,
  		popups
  	}
})
