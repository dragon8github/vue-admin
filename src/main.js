import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'

require('element-ui/lib/theme-chalk/index.css')
require('font-awesome/css/font-awesome.min.css')
require('./sass/common.scss')

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
