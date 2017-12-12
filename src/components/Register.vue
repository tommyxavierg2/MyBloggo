<template>
  <div id="registerView">
    <h1>Register</h1>
    <div class="input-addon">
      <div class="">
        <label for="">Name</label>
        <input type="text" placeholder="Name" v-model="$data.newUser.name">
      </div>
      <div class="">
        <label for="">Lastname</label>
        <input type="text" placeholder="Lastname" v-model="$data.newUser.lastname">
      </div>
      <div class="">
        <label for="">Email</label>
        <input type="email" placeholder="Email@example.com" v-model="$data.newUser.email" v-on:change="isEmailAvailable(email)">
      </div>
      <div class="">
        <label for="">Password</label>
        <input type="password" placeholder="Password" v-model="$data.newUser.password">
      </div>
      <div class="">
        <label for="">Confirm password</label>
        <input type="password" placeholder="Confirm Password" v-model="$data.newUser.confirmPassword">
      </div>
      <button type="button" @click="registerNewUser">Register</button>
    </div>
  </div>
</template>
<script type="text/javascript">
  import axios from 'axios'
  axios.defaults.baseURL = "http://localhost:3000/";
  import toastr from 'toastr'
  toastr.options = {
    timeOut: 2000,
    positionClass: 'toast-top-right',
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  }

 export default {
   data() {
      return {
        newUser: {
         name: '',
         lastname: '',
         email: '',
         password: '',
         confirmPassword: ''
        }
      }
   },

   destroyed: function() {
     this.$data.newUser.name = '';
     this.$data.newUser.lastname = '';
     this.$data.newUser.email = '';
     this.$data.newUser.password = '';
     this.$data.newUser.confirmPassword = '';
   },

   methods: {
     isEmailAvailable: function(newEmail) {
       axios.get(`users?email=${newEmail}`).then(res => {
         let isEmailTaken = Object.keys(res.data).length;
         if(isEmailTaken == 0) {
           toastr.success('Email available');
         } else {
           toastr.warning('This email is already taken.');
         }
       }).catch(err => toastr.error(err));
     },

     registerNewUser: function() {
       console.log(this.$data.newUser);
       if(!this.$data.newUser.name || !this.$data.newUser.lastname || !this.$data.newUser.email || !this.$data.newUser.password ){
         toastr.warning('Please make sure all fields are properly filled');
       }
       else if(this.$data.newUser.password != this.$data.newUser.confirmPassword) {
         toastr.warning('Please make sure both passwords are equal.');
       }
       else if(this.$data.newUser.password.length < 6) {
         toastr.warning('Please make sure the password has more than 6 characters.');
       }
      axios.post('users', {
         name: this.$data.newUser.name,
         lastname: this.$data.newUser.lastname,
         email: this.$data.newUser.email,
         password: this.$data.newUser.password
       })
       .then(res => {
         toastr.success('Thank you for joining us and welcome to the family! Now redirecting to the home page.');
        /*localStorage.setItem('userData', JSON.stringify(newUser));
         this.$router.replace('Home'); */
       })
       .catch(err => {
         alert(err);
       });
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
