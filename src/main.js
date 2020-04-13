import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'

import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueResource);
Vue.use(VueRouter);

export const db = firebase.firestore()


Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faUserSecret)
library.add(faFontAwesome)
library.add(faFacebook)
library.add(faTwitter)
library.add(faInstagram)
library.add(fas)
library.add(faTelegram)



const router = new VueRouter({
  routes: Routes
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !await firebase.getCurrentUser()){
     next('NotSignedIn') 
  }
  else next()
})

Vue.config.productionTip = false

new Vue({
  el:'#app',
  render: h => h(App),
  router: router
})
