// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3000/";
import toastr from 'toastr'
toastr.options = {
  timeOut: 2000,
  positionClass: 'toast-top-right',
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
}

Vue.config.productionTip = false

/* eslint-disable no-new */
window.VueInstance = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
