import active from "./Active.js"
import future from "./Future.js"
import live from "./Live.js"
import past from "./Past.js"


export default {
   namespaced: true,
   state: {
      matches: [],
      headerLogo: '',
      activeGame: '',
      shortActiveGameName: '',
      searchValue: '',
      activeStreamId: '',
      activeGameId: null,
      matchesByStatus: {
         active: true,
         future: false,
         live: false,
         past: false
      }
   },
   getters: {
      matches: state => state.matches,
      headerLogo: state => state.headerLogo,
      activeGame: state => state.activeGame,
      activeGameId: state => state.activeGameId,
      matchesByStatus: state => state.matchesByStatus,
      searchValue: state => state.searchValue,
      activeStreamId: state => state.activeStreamId,
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
      activateStream(state, id) {
         state.activeStreamId = id;
      },
      searchMatch(state, value) {
         state.searchValue = value;
         if (state.matchesByStatus.active === true) state.searchMatches = active.state.matches;
         else if (state.matchesByStatus.future === true) state.searchMatches = future.state.matches;
         else if (state.matchesByStatus.live === true) state.searchMatches = live.state.matches;
         else if (state.matchesByStatus.past === true) state.searchMatches = past.state.matches;
      }
   }
}
