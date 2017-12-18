<template>
  <div id="loginView">
    <div id="navBar">
      <router-link class="navBarItems" to="/">Posts</router-link>
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
 export default {
    data() {
      return {
        loginUser: {},
        loggedUser: {}
      }
    },

    created() {
      this.loggedUser = localStorage.getItem('userData');
      if(this.loggedUser) {
        this.$router.push('/');
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
                toastr.success(`You've been validated ${loginEmail}, press the Enter button to log in`);
            }

        }).catch(err => toastr.warning(err));
      },

      login() {
        axios.get(`users?email=${this.loginUser.email}&password=${this.loginUser.password}`)
        .then(res => {
          let post = this.$route.params.post;
          if(post){
            this.goToPostView(res.data[0], post);
          } else {
            this.goToPosts(res.data[0]);
          }
        })
        .catch(err => toastr.warning(err));
      },

      goToPosts(data) {
        this.loginUser = data;
        localStorage.setItem('userData', JSON.stringify(data));
        this.$router.push('/');
      },

      goToPostView(data, post){
        localStorage.setItem('userData', JSON.stringify(data));
        this.$router.push({name: 'postview', params: {post: post}});
      }
    }
 }
</script>

<style lang="css" src="">
</style>
