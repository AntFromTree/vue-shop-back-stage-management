import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
<<<<<<< HEAD
import './assets/font/iconfont.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8081/api/'
axios.interceptors.request.use(config =>{
  config.headers.Authorization = window.sessionStorage.getItem("token")
  return config;
})

Vue.prototype.$http = axios
=======

>>>>>>> 97a76d379deaad1e160653f0adf8e5595599a099
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
