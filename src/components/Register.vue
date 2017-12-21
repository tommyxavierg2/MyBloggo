<template>
  <div id="registerView">

    <ul id="navBar" class="list-inline align-left">
      <li><router-link class="navBarItems" to="/">Bloggo</router-link></li>
    </ul>

    <h1 class="titles">Register</h1>

    <form @submit.prevent="registerNewUser">

      <div class="input-group">
        <span class="input-group-addon">Name:</span>
        <input type="text" placeholder="Name" v-model.trim="newUser.name" class="form-control" required>
      </div>

      <div class="input-group">
        <span class="input-group-addon">Lastname:</span>
        <input type="text" placeholder="Lastname" v-model.trim="newUser.lastname" class="form-control" required>
      </div>

      <div class="input-group">
        <span class="input-group-addon">Email:</span>
        <input type="email" placeholder="Email@example.com" v-model.trim="newUser.email" v-on:change="isEmailAvailable(newUser.email)"
               class="form-control" required>
      </div>

      <div class="input-group">
        <span class="input-group-addon">Password:</span>
        <input type="password" placeholder="Password" v-model.trim="newUser.password" class="form-control" required>
      </div>

      <div class="input-group">
        <span class="input-group-addon">Confirm password:</span>
        <input type="password" placeholder="Confirm Password" v-model.trim="newUser.confirmPassword" class="form-control" required>
      </div>

      <div id="captcha" class="g-recaptcha" v-bind:data-sitekey='captchaInfo.captchaKey' data-callback="captchaResponse"></div>

      <div class="input-group">
        <span class="input-group-btn">
          <button type="submit" class="btn btn-primary btn-block">Register</button>
        </span>
      </div>

    </form>

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
        newUser: {
          name: "",
          lastname: "",
          email: "",
          password: "",
          id: null,
          avatar: "",
          likedPostId: []
        },
        captchaInfo: {
          captchaKey: "6LfkxDwUAAAAAEPuCXV8_WI_5fLy48GiGToegZcC",
          isCaptchaChecked: ''
        }
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
             axios.post('users', this.newUser)
              .then(res => {
                 toastr.success('Thank you for joining us and welcome to the family! Now redirecting to the home page.');
                 localStorage.setItem('userData', JSON.stringify(res.data));
                 sessionStorage.removeItem('reCaptcha');
                 this.$router.replace('/');
              })
              .catch(err => toastr.warning(err));
           }
       }
    }
 }
</script>
<style media="screen">
</style>
