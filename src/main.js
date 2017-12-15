// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000/";
window.axios = axios;

import toastr from 'toastr';
toastr.options = { timeOut: 2000, positionClass: 'toast-top-right', showMethod: "fadeIn", hideMethod: "fadeOut" };
import "../node_modules/toastr/build/toastr.css";
window.toastr = toastr;

import VueFroala from 'vue-froala-wysiwyg';
Vue.use(VueFroala);

// Require Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min')

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')
require('froala-editor/css/froala_style.min.css')

// Import and use Vue Froala lib.


Vue.config.productionTip = false;
/* eslint-disable no-new */
window.VueInstance = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
