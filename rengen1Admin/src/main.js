// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import AwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui'
import VueSession from 'vue-session'
import VueSimplemde from 'vue-simplemde'
import 'element-ui/lib/theme-default/index.css'

require('../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('../node_modules/jquery/dist/jquery.min')
require('../node_modules/font-awesome/css/font-awesome.min.css')

Vue.config.productionTip = false

Vue.use(AwesomeSwiper)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(VueSession)
Vue.use(VueSimplemde)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
