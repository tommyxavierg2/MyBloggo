<template>
  <div id="registerView">
    <h1>Register</h1>
    <div class="input-addon">
      <div class="">
        <label for="">Name:</label>
        <input type="text" placeholder="Name" v-model="newUser.name">
      </div>
      <div class="">
        <label for="">Lastname:</label>
        <input type="text" placeholder="Lastname" v-model="newUser.lastname">
      </div>
      <div class="">
        <label for="">Email:</label>
        <input type="email" placeholder="Email@example.com" v-model="newUser.email" v-on:change="isEmailAvailable(newUser.email)">
      </div>
      <div class="">
        <label for="">Password:</label>
        <input type="password" placeholder="Password" v-model="newUser.password">
      </div>
      <div class="">
        <label for="">Confirm password:</label>
        <input type="password" placeholder="Confirm Password" v-model="newUser.confirmPassword">
      </div>
      <div class="g-recaptcha" v-bind:data-sitekey='captchaInfo.captchaKey' data-callback="captchaResponse"></div>
      <button type="button" @click="registerNewUser">Register</button>
    </div>
  </div>
</template>
<script type="text/javascript">
  import axios from 'axios';
  axios.defaults.baseURL = "http://localhost:3000/";
  import toastr from 'toastr';
  toastr.options = {
    timeOut: 2000,
    positionClass: 'toast-top-right',
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  }

  window.captchaResponse = (response) => {
    sessionStorage.setItem('reCaptcha', response);
  }

 export default {
   name: 'Register',
   data () {
      return {
        newUser: { name: '', lastname: '', email: '', password: '', confirmPassword: '' },
        captchaInfo: { captchaKey: "6LfkxDwUAAAAAEPuCXV8_WI_5fLy48GiGToegZcC", isCaptchaChecked: false}
      }
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
       this.captchaInfo.isCaptchaChecked = sessionStorage.getItem('reCaptcha');

       if(!this.captchaInfo.isCaptchaChecked) {
            toastr.warning('First check the captcha box first.');
       } else {

           if(!name || !lastname || email || !password){
             toastr.warning('Please make sure all fields are properly filled');
           }
           else if(password != confirmPassword) {
             toastr.warning('Please make sure both passwords are equal.');
           }
           else if(password.length < 6) {
             toastr.warning('Please make sure the password has more than 6 characters.');
           }
            axios.post('users', {
               name: this.newUser.name,
               lastname: this.newUser.lastname,
               email: this.newUser.email,
               password: this.newUser.password
             })
             .then(res => {
               toastr.success('Thank you for joining us and welcome to the family! Now redirecting to the home page.');
               localStorage.setItem('userData', JSON.stringify(this.newUser));
               sessionStorage.removeItem('reCaptcha');
               this.$router.replace('Home');
             })
             .catch(err => toastr.warning(err));

          }
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

  .centered {
    left: 40%;
  }
</style>
