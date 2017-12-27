<template>
  <div class="html">
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link class="logo navbar-brand" to="/">Bloggo</router-link>
        </div>
        <ul class="nav navbar-nav">
           <li><router-link  v-if="loggedUser" to="newpost">New Post</router-link></li>
           <li><router-link v-if="loggedUser" to="profile">Profile</router-link></li>
           <li><router-link v-if="loggedUser" to="settings">Settings
             <i class="fa fa-cog"></i></router-link></li>
           <li>
             <div class="input-group" id="searchBox">
                 <input type="text" class="form-control" placeholder="Search">
                 <span class="input-group-addon">
                   <i class="fa fa-search"></i>
                 </span>
             </div>
          </li>
          <li><button v-if="!loggedUser" type="button" class="btn btn-primary icons-right-float" @click="goToLogin">Login</button></li>
          <li><button v-if="!loggedUser" type="button" class="btn btn-primary icons-right-float" @click="goToRegister">Register</button></li>
          <li><button v-if="loggedUser" type="button" class="btn btn-primary icons-right-float" @click="logout">Logout</button></li>
        </ul>
      </div>
    </nav>
   <div id="app">

     <router-view/>
   </div>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data() {
      return {
        loggedUser: {}
      }
    },

    created() {
      this.loggedUser = this.user;
    },

    computed: {
      user() {
        return JSON.parse(localStorage.getItem('userData'));
      }
    },

    methods: {
      logout() {
        if(confirm('Are you sure about logging out?') == true) {
            localStorage.removeItem('userData');
            toastr.success(`You've been logged out`);
            this.$router.replace('/');
            location.reload();
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
  padding: 50px;
  margin: 80px;
  width: 100%;
}
</style>
