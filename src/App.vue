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

  export default {
    created() {
      //запрос к матчам при инициализации сайта
      this.$http.get('http://betify.xyz/api/v1/match/get')
        .then(response => response.json())
        .then(data => {
           this.fillMatches(data);
           //распределение матчей по типу
          for (let i = 0; i < this.matches.length; i++) {
            this.$set(this.matches[i], 'show', true)
            if (this.matches[i].status == 2) this.pushPast(this.matches[i]);
            else if (this.matches[i].status == 1) this.pushLive(this.matches[i]);
            else if (this.matches[i].status == 0) this.pushFuture(this.matches[i]);
          }
       });
      this.filterMatchesByGame({type: 1, logo: '/img/csgo.png', name: 'CS:GO'});
      // this.$router.push('future');
      console.log(this.futureMatches)
    },
    mounted() {
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
      ...mapMutations('betBlock', {
        hideBlock: 'hideBlock'
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
  min-height: 895px
  padding: 0px
  background-color: #0b101c
  
</style>
