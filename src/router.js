import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import matches from './store/modules/Matches.js'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home'
    //   component: Home
    // },
    {
        path: '*',
        component: () => import('./components/main/matches/Matches.vue'),
        beforeEnter: (to, from, next) => {
          matches.mutations.filterMatchesByGame(matches.state, {type: 1, logo: '/img/csgo.png', name: 'CS:GO'});
          next();
        },
        name: 'matches',
        children: [
          {
            path: 'csgo',
            name: 'active',
            beforeEnter: (to, from, next) => {
              matches.mutations.filterMatchesByGame(matches.state, {type: 1, logo: '/img/csgo.png', name: 'CS:GO'});
              next();
            },
            component: () => import('./components/main/matches/Matches.vue')
          },
          {
            path: 'dota2',
            name: 'future',
            beforeEnter: (to, from, next) => {
              matches.mutations.filterMatchesByGame(matches.state, {type: 2, logo: '/img/dota2.png', name: 'Dota 2'});
              next();
            },
            component: () => import('./components/main/matches/Matches.vue')
          },
          {
            path: 'lol',
            name: 'live',
            beforeEnter: (to, from, next) => {
              matches.mutations.filterMatchesByGame(matches.state, {type: 3, logo: '/img/lol.png', name: 'League of Legends'});
              next();
            },
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
