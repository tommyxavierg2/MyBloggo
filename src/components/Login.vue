<template>
  <div id="loginView">
    <div id="menu">
      <router-link class="menuItems" to="posts">Posts</router-link>
    </div>
    <h1 class="titles">Welcome to bloggo</h1>
    <div>
      <div class="input-group">
        <span class="input-group-addon">Email:</span>
        <input type="email" placeholder="Email" v-model='loginUser.email'
               v-on:change="validateEmail(loginUser.email)" class="form-control"></input>
      </div>
      <div class="input-group">
          <span class="input-group-addon">Password:</span>
          <input type="password" placeholder="Password" v-model='loginUser.password'
                 v-on:change="validateUser(loginUser.email, loginUser.password)"
                 class="form-control"></input>
      </div>
      <div class="input-group">
        <span class="input-group-btn">
          <button id="loginButton" type="button" @click="login()"
                  disabled class="btn btn-primary btn-block">Enter
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  axios.defaults.baseURL = "http://localhost:3000/";
  import toastr from 'toastr';
  toastr.options = {
    timeOut: 2000,
    positionClass: 'toast-top-right',
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  }
 export default {
    data() {
      return {
        loginUser: { email: '', password: ''},
        loggedUser: {}
      }
    },

    created() {
      this.loggedUser = localStorage.getItem('userData');
      if(this.loggedUser) {
        this.$router.push('home');
      }
    },

    methods: {
      validateEmail(loginEmail) {
        axios.get(`users?email=${loginEmail}`).then(res => {
          let isEmailAvailable = Object.keys(res.data).length;
          if(isEmailAvailable == 0) {
            toastr.warning('Email not registered, please verify.');
          } else {
            toastr.success('Email validated');
          }
        }).catch(err => toastr.error(err));
      },

      validateUser(loginEmail, loginPassword) {
        axios.get(`users?email=${loginEmail}&password=${loginPassword}`)
        .then(res => {
            let isUserCorrect = Object.keys(res.data).length;

            if(isUserCorrect == 0) {
                toastr.warning('This user is not registered please verify and try again');
            } else {
                $('#loginButton').attr('disabled', false);
                toastr.warning(`You've been validated ${loginEmail}, press the Enter button to log in`);
            }

        }).catch(err => toastr.warning(err));
      },

      login() {
        localStorage.setItem('userData', JSON.stringify(this.loginUser));
        this.$router.push('myposts');
      }
    }
 }
</script>

<style lang="css" src="">
</style>
