<template>
  <div id="registerView">
    <div id="menu">
      <router-link class="menuItems" to="posts">Posts</router-link>
    </div>
    <h1 class="titles">Register</h1>
    <div>
      <div class="input-group">
        <span class="input-group-addon">Name:</span>
        <input type="text" placeholder="Name" v-model="newUser.name"
               class="form-control">
      </div>
      <div class="input-group">
        <span class="input-group-addon">Lastname:</span>
        <input type="text" placeholder="Lastname" v-model="newUser.lastname"
               class="form-control">
      </div>
      <div class="input-group">
        <span class="input-group-addon">Email:</span>
        <input type="email" placeholder="Email@example.com" v-model="newUser.email"
               v-on:change="isEmailAvailable(newUser.email)" class="form-control">
      </div>
      <div class="input-group">
        <span class="input-group-addon">Password:</span>
        <input type="password" placeholder="Password" v-model="newUser.password"
                class="form-control">
      </div>
      <div class="input-group">
        <span class="input-group-addon">Confirm password:</span>
        <input type="password" placeholder="Confirm Password" v-model="newUser.confirmPassword"
               class="form-control">
      </div>
      <div id="captcha" class="g-recaptcha" v-bind:data-sitekey='captchaInfo.captchaKey' data-callback="captchaResponse"></div>
      <div class="input-group">
        <span class="input-group-btn">
          <button type="button" @click="registerNewUser" class="btn btn-primary btn-block">Register</button>
        </span>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  window.captchaResponse = (response) => {
    sessionStorage.setItem('reCaptcha', response);
  };

 export default {
   name: 'Register',
   data () {
      return {
        newUser: { },
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

           if (!this.captchaInfo.isCaptchaChecked) {
                toastr.warning('First check the captcha box first.');
           }
           else if(!this.newUser.name || !this.newUser.lastname || !this.newUser.email || !this.newUser.password) {
             toastr.warning('Please make sure all fields are properly filled');
           }
           else if(this.newUser.password != this.newUser.confirmPassword) {
             toastr.warning('Please make sure both passwords are equal.');
           }
           else if(this.newUser.password.length < 6) {
             toastr.warning('Please make sure the password has more than 6 characters.');
           } else {
             axios.post('users', {
                name: this.newUser.name,
                lastname: this.newUser.lastname,
                email: this.newUser.email,
                password: this.newUser.password,
                avatar: 'https://firebasestorage.googleapis.com/v0/b/todo-app-1feb3.appspot.com/o/default.png?alt=media&token=b1c8a2a0-3f31-4f33-ad89-e57bead0bc0d'
              })
              .then(res => {
                toastr.success('Thank you for joining us and welcome to the family! Now redirecting to the home page.');
                localStorage.setItem('userData', JSON.stringify(this.newUser));
                sessionStorage.removeItem('reCaptcha');
                this.$router.replace('posts');
              })
              .catch(err => toastr.warning(err));
           }
       }
    }
 }
</script>
<style media="screen">
</style>
