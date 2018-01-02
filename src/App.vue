<template>
  <div class="html">
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link class="logo navbar-brand" to="/1">Bloggo</router-link>
        </div>
        <ul class="nav navbar-nav">
           <li><router-link v-if="user" :to="{name: 'newpost'}">New Post</router-link></li>
           <li><router-link v-if="user" to="profile">Profile</router-link></li>
           <li><router-link v-if="user" :to="{name: 'settings'}">Settings
             <i class="fa fa-cog"></i></router-link></li>
          <li><button v-if="!user" type="button" class="btn btn-primary icons-right-float" @click="goToLogin">Login</button></li>
          <li><button v-if="!user" type="button" class="btn btn-primary icons-right-float" @click="goToRegister">Register</button></li>
          <li><button v-if="user" type="button" class="btn btn-primary icons-right-float" @click="logout">Logout</button></li>
        </ul>
      </div>
    </nav>
   <div id="app">

     <router-view/>
   </div>
  </div>
</template>

<script>

import axios from 'axios';

  export default {
    name: 'app',
    data() {
      return {
        user: {}
      }
    },

    mounted() {
      this.validateUserState;
    },

    computed: {
      validateUserState() {
        Event.listen('logged', (data) => {
          if(data) {
            this.user = data;
            pusher.pusherSubscribe(this.user.id);
            pusher.pusherNotificationReceiver;
          }
          else {
            this.user = JSON.parse(localStorage.getItem('userData'));
          }
        });
      }
    },

    methods: {
      logout() {
        if(confirm('Are you sure about logging out?') == true) {
            localStorage.removeItem('userData');
            this.user = '';
            toastr.success(`You've been logged out, hope to see you soon`);
            Event.fire('loggedOut');
        }
      },

      goToRegister() {
        this.$router.replace('register');
      },

      goToLogin() {
        this.$router.replace('login');
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Verdana', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #5D6D7E;
  width: 100%;
}
</style>
