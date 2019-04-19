import Vue from 'vue'
import router from 'vue-router'
import matches from './store/modules/Matches.js'
import betBlock from './store/modules/betBlock.js'

Vue.use(router)

// var siteUrl = "http://betify.xyz"
var siteUrl = "http://localhost:8080"

export default new router({
  routes: [
    {
        path: ``,
        component: () => import('./components/main/matches/Matches.vue'),
        //если путь пустой, то сразу показываем кс
        beforeEnter: (to, from, next) => {
          matches.mutations.filterMatchesByGame(matches.state, {type: 1, logo: '/img/csgo.png', name: 'CS:GO', url: 'csgo'});
          next();
        },
        name: 'matches',
        children: [
          {
            path: `/csgo`,
            beforeEnter: (to, from, next) => {
              matches.mutations.filterMatchesByGame(matches.state, {type: 1, logo: '/img/csgo.png', name: 'CS:GO', url: 'csgo'});
              betBlock.mutations.hideBlock(betBlock.state);
              next();
            },
            component: () => import('./components/main/matches/Matches.vue')
          },
          {
            path: '/dota2',
            beforeEnter: (to, from, next) => {
              matches.mutations.filterMatchesByGame(matches.state, {type: 2, logo: '/img/dota2.png', name: 'Dota 2', url: 'dota2'});
              betBlock.mutations.hideBlock(betBlock.state);
              next();

            },
            component: () => import('./components/main/matches/Matches.vue')
          },
          {
            path: '/lol',
            beforeEnter: (to, from, next) => {
              matches.mutations.filterMatchesByGame(matches.state, {type: 3, logo: '/img/lol.png', name: 'League of Legends', url: 'lol'});
              betBlock.mutations.hideBlock(betBlock.state);
              next();
            },
            component: () => import('./components/main/matches/Matches.vue')
          },
          {
            path: '/ow',
            beforeEnter: (to, from, next) => {
              matches.mutations.filterMatchesByGame(matches.state, {type: 4, logo: '/img/ow.png', name: 'Overwatch', url: 'ow'});
              betBlock.mutations.hideBlock(betBlock.state);
              next();
            },
            component: () => import('./components/main/matches/Matches.vue')
          },
          {
            path: '/:id',
            name: 'betBlock',
            component: () => import('./components/main/matches/Matches.vue')
          }
        ]
    },
    {
        path: '/legal',
        component: () => import('./components/main/agreement/Agreement.vue')
    }
  ],
  mode: 'history'
})
