<template>
  <div id="loginView">

    <form @submit.prevent="login()">

         <h1 class="jumbotron titles">Login</h1>

        <div class="input-group">
          <span class="input-group-addon">Email:</span>
          <input type="email" placeholder="Email" v-model.trim='loginUser.email' required
                 class="form-control"></input>
        </div>

        <div class="input-group">
          <span class="input-group-addon">Password:</span>
          <input type="password" placeholder="Password" v-model.trim='loginUser.password' required
                 class="form-control"></input>
        </div>

        <div class="input-group">
          <span class="input-group-addon">
            <input type="radio" @click="loginUser.remembered = !loginUser.remembered" :checked="loginUser.remembered"> Remember me
        </span>
        </div>

        <div class="input-group">
          <span class="input-group-btn">
            <button id="loginButton" type="submit" :disabled="!loginUser.password || !loginUser.email"
                    class="btn btn-primary btn-block">Enter</button>
          </span>
        </div>

    </form>

  </div>
</template>

<script>
 export default {
    data() {
      return {
        loginUser: {
          password: "",
          email: "",
          remembered: false
        },
        loggedUser: {
          avatar: "",
          email: "",
          id: null,
          lastname: "",
          likedPostId: [],
          name: "",
          password: "",
          isUserLogged: false,
          remembered: false
        }
      }
    },

    created() {
      this.loggedUser = JSON.parse(localStorage.getItem('userData'));
    },

    mounted() {
      if(this.loggedUser) {
          this.$router.push('/');
      }
    },

    methods: {
      validateEmail(loginEmail) {
        axios.get(`users?email=${loginEmail}`)
        .then(res => {
          let isEmailAvailable = Object.keys(res.data).length;

          if(isEmailAvailable == 0) {
            toastr.warning('Email not registered, please verify.');
          }

        }).catch(err => toastr.error(err));
      },

      login() {
        axios.get(`users?email=${this.loginUser.email}&password=${this.loginUser.password}`)
        .then(res => {
          let data = Object.keys(res.data).length;

          if(data == 0) {
             toastr.warning(`Please verify email: ${this.loginUser.email} or the entered password are correct`);
          } else {
              let post = this.$route.params.post;

              if(post){
                this.goToPostView(res.data[0], post);
              }
              else {
                res.data[0].remembered = this.loginUser.remembered;
                this.goToPosts(res.data[0]);
              }
          }
        })
        .catch(err => toastr.warning(err));
      },

      goToPosts(data) {
        this.loginUser = data;
        localStorage.setItem('userData', JSON.stringify(data));
        location.reload();
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
