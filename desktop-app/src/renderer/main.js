import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import Navbar from './components/Navbar/Navbar.vue'
import Task from './components/Task/Task.vue'
import Note from './components/Note/Note.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'

import VueMarkdown from 'vue-markdown'

Vue.component('Navbar', Navbar)
Vue.component('Note', Note)
Vue.component('Task', Task)
Vue.component('Sidebar', Sidebar)
Vue.component('VueMarkdown', VueMarkdown)

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import VueEvents from 'vue-events'
Vue.use(VueEvents)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(require('vue-moment'));

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  VueMarkdown,
  Navbar,

  template: '<App/>'
}).$mount('#app')