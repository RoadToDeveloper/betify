import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
        // path: ':game',
        path: '*',
        component: () => import('./components/main/matches/Matches.vue'),
        name: 'matches',
        children: [
          {
            path: 'active',
            name: 'active',
            component: () => import('./components/main/matches/Active.vue')
          },
          {
            path: 'future',
            name: 'future',
            component: () => import('./components/main/matches/Future.vue')
          },
          {
            path: 'live',
            name: 'live',
            component: () => import('./components/main/matches/Live.vue')
          },
          {
            path: 'past',
            name: 'past',
            component: () => import('./components/main/matches/Past.vue')
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
