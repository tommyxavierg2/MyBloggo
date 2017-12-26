<template>
  <div id="app">
    <ul class="navbar list-inline">
         <li><router-link class="navBarItems" to="/">Bloggo</router-link></li>
         <li><router-link  v-if="user"class="navBarItems" to="newpost">New Post</router-link></li>
         <li><router-link v-if="user" class="navBarItems" to="profile">Profile</router-link></li>
         <li>
           <div class="input-group" id="searchBox">
               <input type="text" class="form-control" placeholder="Search">
               <span class="input-group-addon">
                 <i class="fa fa-search"></i>
               </span>
           </div>
        </li>
        <li><button v-if="!user" type="button" class="btn btn-primary icons-right-float" @click="goToLogin">Login</button></li>
        <li><button v-if="!user" type="button" class="btn btn-primary icons-right-float" @click="goToRegister">Register</button></li>
        <li><button v-if="user" type="button" class="btn btn-primary icons-right-float" @click="logout">Logout</button></li>
       </ul>
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data() {
      return {}
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
  padding: 10px;
}
</style>
