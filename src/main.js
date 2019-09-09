import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import VueResource from 'vue-resource';
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false
Vue.use(VueResource);
// Vue.use(new VueSocketIO({
//     debug: false,
//     connection: "http://80.78.248.37:1111/"
//   })
// );

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
