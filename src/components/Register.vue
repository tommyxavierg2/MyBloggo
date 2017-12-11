<template>
  <div class="" id="registerView">
    <h1>Register</h1>
    <div class="input-addon">
      <label for="">Name</label>
      <input type="text" placeholder="Name"> {{data}} <br>
      <label for="">Lastname</label>
      <input type="text" placeholder="Lastname"> {{lastname}} <br>
      <label for="">Email</label>
      <input type="text" placeholder="Email@example.com"> {{email}} <br>
      <label for="">Password</label>
      <input type="text" placeholder="Password"> {{password}} <br>
      <label for="">Confirm password</label>
      <input type="text" placeholder="Confirm Password"> {{confirmPassword}} <br>
      <button type="button">Register</button>
    </div>
  </div>
</template>

<script type="text/javascript">
  var newUser = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

 export default {
   data() {
     return newUser
   },

   methods: {
     registerNewUser: function() {

     }
   }
 }
</script>

<style media="screen">
  #registerView {
    text-align: center;
  }

  input {
    border: 2px solid gray;
    border-radius: 10%;
    margin-left: 20px;
  }
</style>
