<template>
  <div id="loginView">
    <h1>Welcome to bloggo</h1>
    <div>
        <div class="input-group">
          <label>Email:</label>
          <input type="email" placeholder="Email" v-model='email'></input>
        </div>
        <div class="input-group">
          <label>Password:</label>
          <input type="password" placeholder="Password" v-model='password'></input>
        </div>
        <div>
          <button type="button" @click="test">Enter</button>
        </div>
    </div>
  </div>
</template>

<script>
  var loginUser = {
    email: '',
    password: ''
  }

  export default {
      data() {
        return loginUser
      },

      methods: {
        test: function() {
          alert(loginUser.email);
        }
      }
    }
</script>

<style>
 #loginView {
   display: inline-block;
   text-align: center;
 }

 label {
   display: inline-block;
 }

 input {
   border: 2px solid gray;
   border-radius: 10%;
   margin-left: 20px;
 }
</style>
