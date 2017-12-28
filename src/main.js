// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import Avatar from 'vue-avatar';
Vue.component('avatar', Avatar);

import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000/";
window.axios = axios;

import toastr from 'toastr';
toastr.options = { timeOut: 1000, positionClass: 'toast-top-right', showMethod: "fadeIn", hideMethod: "fadeOut" };
import "../node_modules/toastr/build/toastr.css";
window.toastr = toastr;

Vue.config.productionTip = false;
/* eslint-disable no-new */
window.VueInstance = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
