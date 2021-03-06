import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueCookie from 'vue-cookie'
import http from './utils/http.js'

require('element-ui/lib/theme-chalk/index.css')
require('font-awesome/css/font-awesome.min.css')
require('./sass/common.scss')
require('./sass/hongte.scss')

Vue.use(ElementUI)
Vue.use(VueCookie)
Vue.prototype.$http = http

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
