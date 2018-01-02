// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import toastr from 'toastr'
import '../node_modules/toastr/build/toastr.css'
import Pusher from 'pusher'
import Avatar from 'vue-avatar'
Vue.component('avatar', Avatar)

axios.defaults.baseURL = 'http://localhost:3000/'
window.axios = axios

toastr.options = { timeOut: 1000, positionClass: 'toast-top-right', showMethod: 'fadeIn', hideMethod: 'fadeOut' }
window.toastr = toastr

window.Event = new class {
  constructor () {
    this.vue = new Vue()
  }

  fire (event, data = null) {
    this.vue.$emit(event, data)
  }

  listen (event, callback) {
    this.vue.$on(event, callback)
  }
}()

window.pusher = new class {
  constructor () {
    this.vue = new Vue()
  }

  postPusherNotification (message, user) {
    var instance = axios

    instance({
      method: 'POST',
      url: 'http://localhost:8000/',
      data: message,
      user: user
    })
  }

  pusherSubscribe (userId) {
    var pusher = new Pusher('dc27cdf64618a574090d', {
      cluster: 'us2',
      encrypted: true
    })

    var channel = pusher.subscribe(`notifications-${userId}`)
    channel.bind('new-notification', (data) => {
      Event.fire('pusher', data)
    })
  }

  pusherNotificationReceiver () {
    Event.listen('pusher', (data) => {
      toastr.success(data.message)
    })
  }

  listen () {

  }
}()

var pusher = new Pusher({
  appId: '451092',
  key: 'dc27cdf64618a574090d',
  secret: 'e2792e996aeadf579844',
  cluster: 'us2',
  encrypted: true
})

window.pusher = pusher

Vue.config.productionTip = false
/* eslint-disable no-new */
window.VueInstance = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
