<template>
  <div>

    <h1 class="jumbotron titles">Settings</h1>

    <div v-if="!userValidation.validated">
      <h4>To change your personal information, please validate the following password</h4>
      <div class="input-group">
        <span class="input-group-addon">Email:</span>
        <input type="text" placeholder="Email" v-model.trim="userValidation.email" class="form-control" required>
      </div>
      <div class="input-group">
        <span class="input-group-addon">Password:</span>
        <input type="password" placeholder="Password" v-model.trim="userValidation.password" class="form-control" required>
      </div>
      <div class="d-flex justify-content-center">
         <button type="submit" class="btn btn-default btn-block" @click="userCredentialsValidation()">Validate</button>
      </div>
    </div>

    <ul class="nav nav-tabs nav-justified">
      <li><a class="tabs" data-toggle="tab" href="#general">General</a></li>
      <li><a class="tabs" data-toggle="tab" href="#profile">Profile</a></li>
    </ul>

    <div class="tab-content">

        <form v-if="userValidation.validated" id="general" class="tab-pane fade post-view" @submit.prevent="updateProfile(user.id)">
          <h3>Change your password</h3>
          <div class="input-group">
            <span class="input-group-addon">Password:</span>
            <input type="password" placeholder="Password" v-model.trim="user.password" class="form-control" required>
          </div>

          <div class="input-group">
            <span class="input-group-addon">Confirm password:</span>
            <input type="password" placeholder="Confirm Password" v-model.trim="user.confirmPassword" class="form-control" required>
          </div>

          <div v-if="user.password =! originalUserData.password" class="d-flex justify-content-center">
             <button type="button" class="btn btn-danger" @click="cancelEdition">Cancel</button>
             <button type="submit" class="btn btn-success">Save</button>
          </div>
        </form>

        <form v-if="userValidation.validated" id="profile" class="tab-pane fade post-view" @submit.prevent="updateProfile(user.id)">
          <h3>Change your profile information</h3>
          <avatar :username="fullName" class="gravatar" :size="100"></avatar><br>
          <div class="input-group">
            <span class="input-group-addon">Name:</span>
             <input type="text" class="form-control" v-model.trim="user.name" required>
          </div>
          <div class="input-group">
            <span class="input-group-addon">Lastname:</span>
             <input type="text" class="form-control" v-model.trim="user.lastname" required>
          </div>
          <div class="input-group">
            <span class="input-group-addon">Email:</span>
             <input type="email" class="form-control" v-model.trim="user.email" required>
          </div>
          <div class="d-flex justify-content-center">
             <button type="button" class="btn btn-danger" @click="cancelEdition">Cancel</button>
             <button type="submit" class="btn btn-success">Save</button>
          </div>
        </form>

    </div>

  </div>
</template>

<script>
  import tab from './tabs.vue';
  import tabcontent from './tabs_content.vue';

  export default {
    data() {
      return {
        user: {
          name: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: '',
          id: null,
          avatar: '',
          likedPostId: [],
          isUserLogged: false,
          remembered: false,
          profileState: false,
          fullName: ''
        },
        originalUserData: {
          name: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: '',
          id: null,
          likedPostId: [],
          isUserLogged: false,
          remembered: false,
          profileState: false,
          fullName: ''
        },
        tabsInfo: [],
        userValidation: {
          email: '',
          password: '',
          validated: false
        }
      }
    },
    components: {
      'app-tab': tab,
      'app-tab-content': tabcontent
    },

    created() {
      this.getUser();
      this.copyData(this.user, this.originalUserData);

      this.tabsInfo = [
        { name: 'General', ref: 'general' },
        { name: 'Profile', ref: 'profile' }
      ]
    },

    computed: {
      fullName() {
        return `${this.user.name} ${this.user.lastname}`;
      }
    },

    methods: {
      getUser() {
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.user.fullName = this.fullName;
      },

      userCredentialsValidation() {
        if(this.userValidation.email == this.user.email && this.userValidation.password == this.user.password) {
            this.userValidation.validated = true;
            toastr.success('Thanks for the validation and your time');
            return true
        }
        else {
          toastr.warning('I apologize but it seems the entered information is not correct, please confirm and try again');
          return false
        }
      },

      updateProfile(userId) {

        if(confirm('Do you want to apply these changes?') == true) {
          axios.put(`users/${userId}`, this.user)
           .then(res => {
             this.copyData(this.user, this.originalUserData);
             toastr.success('Profile updated');
           })
           .catch(err => toastr.error(err));
        }
        else {
          this.cancelEdition();
        }
      },

      cancelEdition() {
        if(confirm('Are you sure about these changes?') == true) {
          this.user.name = this.originalUserData.name;
          this.user.lastname = this.originalUserData.lastname;
          this.user.email = this.originalUserData.email;
          toastr.success('Profile edition cancelled');
        }
      },

      copyData(dataProvider, dataConsumer) {
        for (let key in dataProvider) {
          dataConsumer[key] = dataProvider[key];
        }
      }
    }
  }
</script>

<style lang="css">

</style>
