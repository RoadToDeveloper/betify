<template>
  <div id="app">
    <app-header></app-header>

    <main id="main" class="row col-12">
      <app-sidebar></app-sidebar>
      <router-view></router-view>
      <app-footer></app-footer>
    </main>

    <transition name="showPopup">
      <app-popup v-show="popup.job">     
          <div class="wrapper_popup-content">Job</div>     
      </app-popup>
    </transition>
    <transition name="showPopup">
      <app-popup v-show="popup.deposit">     
          <app-deposit></app-deposit>     
      </app-popup>
    </transition>
    <transition name="showPopup">
      <app-popup v-show="popup.withdraw">     
          <app-withdraw></app-withdraw>     
      </app-popup>
    </transition>
    <transition name="showPopup">
      <app-popup v-show="popup.technicalHelp">     
          <app-technical></app-technical>   
      </app-popup>
    </transition> 

    <transition name="showBetBlock">
      <app-bet-block v-if="betBlockActive"></app-bet-block>
    </transition>
    
  </div>
</template>

<script>
  import AppHeader from './components/main/header/Header.vue'
  import AppSidebar from './components/main/sidebar/Sidebar.vue'
  import AppMatches from './components/main/matches/Matches.vue'
  import AppBetBlock from './components/main/betBLock/Container.vue'
  import AppAgreement from './components/main/agreement/Agreement.vue'
  import AppFooter from './components/main/footer/footer.vue'
  import AppPopup from './components/main/popup/Popup.vue'
  import AppTechnical from './components/main/popup/technicalHelp.vue'
  import AppDeposit from './components/main/popup/Deposit.vue'
  import AppWithdraw from './components/main/popup/Withdraw.vue'
  import {mapGetters} from 'vuex'
  import {mapMutations} from 'vuex'
  import {mapActions} from 'vuex'
  import getTime from './filters/getTime.js'
  import getDate from './filters/getDate.js'
  import matches from './store/modules/Matches.js'

  export default {
    created() {
      this.getUserData();
      //запрос к матчам при инициализации сайта
      this.$http.get('http://betify.xyz/api/v1/match/get')
        .then(response => response.json())
        .then(data => {
          this.fillMatches(data);
           //распределение матчей по типу
          for (let i = 0; i < this.matches.length; i++) {
            if (this.matches[i].status == 2) this.pushPast(this.matches[i]);
            else if (this.matches[i].status == 1) {
              this.pushActive(this.matches[i]);
              this.pushLive(this.matches[i]);
            } 
            else if (this.matches[i].status == 0) {
              this.pushActive(this.matches[i]);
              this.pushFuture(this.matches[i]);
            } 
          }
          // console.log(this.activeMatches);
          // console.log(this.liveMatches);
          // console.log(this.futureMatches);

          //открытие матча, если пользователь переходит к нему по ссылке
          if (this.$router.currentRoute.name == "betBlock") {
            let match;
            for (let i = 0; i < this.matches.length; i++) {
               if (this.matches[i].id == this.$router.currentRoute.params.id) {
                  let liveMatch = false;
                  match = this.matches[i];
                  if (match.status == 1) liveMatch = true;
                    else liveMatch = false; 
                  console.log(match);
                  this.getInfoFromApi({
                      coefFirst: match.coefficients[0],  
                      coefSecond: match.coefficients[1], 
                      date: getDate(match.datetime.split(' ')[0]),
                      time: getTime(match.datetime.split(' ')[1]),
                      logoFirst: "http://betify.xyz/logo/"+match.team1id+"."+match.team1extension,
                      logoSecond: "http://betify.xyz/logo/"+match.team2id+"."+match.team2extension,
                      moneyFirst: match.money1,
                      moneySecond: match.money2,
                      percentageFirst: ((match.money1 + 1) / (match.money1 + match.money2 + 2) * 100).toFixed(0) + '%',
                      percentageSecond: ((match.money2 + 1) / (match.money1 + match.money2 + 2) * 100).toFixed(0) + '%',
                      scoreFirst: match.score.split(':')[0],
                      scoreSecond: match.score.split(':')[1],
                      firstChoose: match.team1name,
                      secondChoose: match.team2name,
                      game: match.gameid,
                      format: "Best-of-"+match.format,
                      id: match.id,
                      tournament: match.tournament,
                      betName: 'Выбор события и ставка',
                      betId: null,
                      liveMatch: liveMatch,
                      eventType: '',
                      readyBet: 0,
                      coef: 0
                  });
               } 
            }            
          }         
        })
        .catch((error) => {
          return 0;
        })  
      this.sockets.subscribe('matchAdd', (data) => {
        console.log(data);
        if (data.status == 2) this.pushPast(data);
        else if (data.status == 1) {
          this.pushActive(data);
          this.pushLive(data);
        } 
        else if (data.status == 0) {
          this.pushActive(data);
          this.pushFuture(data);
        } 
      });
    },
    mounted() {
      //скрипт для twitch
      let twitchScript = document.createElement('script')
      twitchScript.setAttribute('src', 'https://embed.twitch.tv/embed/v1.js')
      document.head.appendChild(twitchScript)
      //позиционка
      let mainMargin = getComputedStyle(document.querySelector(".header")).height;
      document.getElementById("main").style.top = mainMargin;  
      document.getElementById("main_left").style.height = (window.innerHeight - parseInt(mainMargin)) +"px";
    },
    computed: {
      ...mapGetters('betBlock', {
        betBlockActive: 'show'
      }),
      ...mapGetters('matches', {
        matches: 'matches'
      }),
      ...mapGetters('active', {
        activeMatches: 'matches'
      }),
      ...mapGetters('past', {
        pastMatches: 'matches'
      }),      
      ...mapGetters('live', {
        liveMatches: 'matches'  
      }),
      ...mapGetters('future', {
       futureMatches: 'matches'
      }),
      ...mapGetters('popups', {
       popup: 'popups'
      })
    },
    methods: {
      ...mapActions('betBlock', {
        getInfoFromApi: 'getInfoFromApi'
      }),
      ...mapActions('user', {
        getUserData: 'getUserData'
      }),
      ...mapMutations('betBlock', {
        hideBlock: 'hideBlock'
      }),
      ...mapMutations('active', {
        pushActive: 'pushMatch'
      }),
      ...mapMutations('past', {
        pushPast: 'pushMatch'
      }),
      ...mapMutations('live', {
        pushLive: 'pushMatch'
      }),
      ...mapMutations('future', {
        pushFuture: 'pushMatch'
      }),
      ...mapMutations('matches', {
        filterMatchesByGame: 'filterMatchesByGame',
        fillMatches: 'getMatches'
      })   
    },
    filters: {
      getTime,
      getDate
    },
    components: {
      AppHeader,
      AppSidebar,
      AppMatches,
      AppBetBlock,
      AppFooter,
      AppPopup,
      AppTechnical,
      AppAgreement,
      AppDeposit,
      AppWithdraw
    }
  }
</script>

<style lang="sass" scoped>
.showPopup-enter
  transform: translate3d(0px, -30px, 0px)
  opacity: 0
.showPopup-enter-active
  transition: opacity 0.3s, transform 0.3s
  display: block

.showPopup-leave-active
  opacity: 0
  transition: opacity 0.3s, transform 0.3s
  transform: translate3d(0px, -30px, 0px)


.showBetBlock-enter
  transform: translate3d(40%, 0px, 0px)
  opacity: 0
.showBetBlock-enter-active
  transition: all 0.3s

.showBetBlock-leave-active
  transform: translate3d(40%, 0px, 0px)
  opacity: 0
  transition: all 0.3s


#app 
  
  font-family: 'Montserrat'
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

#main
  top: 85px
  position: relative
  overflow-x: hidden
  margin-left: 0px
  min-height: calc(100vh - 84px)
  padding: 0px
  background-color: #0b101c
@media only screen and (max-width : 1600px)
  #main
    min-height: calc(100vh - 59px)
  
</style>
