import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import Navbar from './components/Navbar/Navbar.vue'
import Task from './components/Task/Task.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'

Vue.component('Navbar',Navbar)
Vue.component('Task',Task)
Vue.component('Sidebar',Sidebar)

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(require('vue-moment'));

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  Navbar,
  template: '<App/>'
}).$mount('#app')
