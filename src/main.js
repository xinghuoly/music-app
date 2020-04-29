// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import less from 'less'     //引入less方法
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'lib-flexible/flexible'
import '../static/font/iconfont.css'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import 'swiper/dist/css/swiper.css'

import store from './store/index'

Vue.use(Vuex);
Vue.use(Vueaxios,axios);
Vue.use(less);
Vue.use(VueAwesomeSwiper,/* { default global options }*/);

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//全局使用Vuex
  components: { App },
  template: '<App/>'
})
