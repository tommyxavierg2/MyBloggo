<template>
  <div id="profileView">

    <h1>Profile</h1>

    <button v-if="!viewer" type="button" class="icons-right-float" @click="isProfileEditable = !isProfileEditable">
      Edit <i class="fa fa-pencil"></i></button>

    <div v-if="user">
      <h3>User information</h3>

        <div class="post-view">
          <avatar :username="fullName" class="gravatar" :size="100"></avatar><br>
          <label>Name:</label>
          <span>{{user.name}} {{user.lastname}}</span> <br>
          <label>Email:</label>
          <span>{{user.email}}</span>
        </div>

        <form v-if="isProfileEditable" class="post-view" @submit.prevent="updateProfile(user.id)">
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
             <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>

    </div>

      <h3>Posts</h3>

      <app-tab :tabs="tabsInfo.tabs" :tabs_content="published_posts" :user="user">
        <app-tab-content :tabs_content="published_posts" tab_id="published" :user="user"></app-tab-content>
        <app-tab-content :tabs_content="drafted_posts" tab_id="drafted" :user="user"></app-tab-content>
        <app-tab-content :tabs_content="deleted_posts" tab_id="deleted" :user="user"></app-tab-content>
      </app-tab>

  </div>
</template>

<script>
  import post from './post.vue';
  import tabs from './tabs.vue';
  import tabs_content from './tabs_content.vue';

  export default {
    data(){
      return {
        user: {
          name: "",
          lastname: "",
          email: "",
          password: "",
          id: null,
          avatar: "",
          likedPostId: [],
          isUserLogged: false
        },
        viewer: {
          name: "",
          lastname: "",
          email: "",
          password: "",
          id: null,
          avatar: "",
          likedPostId: []
        },
        originalUserData: {
          name: "",
          lastname: "",
          email: "",
          password: "",
          avatar: "",
          likedPostId: []
        },
        posts: [],
        tabsInfo: [],
        isProfileEditable: false,
      }
    },

    components: {
      'app-post': post,
      'app-tab': tabs,
      'app-tab-content': tabs_content
    },

    created() {
      this.user = this.$route.params.user;
      this.viewer = this.$route.params.viewer;
      this.tabsInfo = {
        tabs: [
          {name: 'Published', ref: '#published'},
          {name: 'Drafted', ref: '#drafted' },
          {name: 'Deleted', ref: '#deleted' }
        ]
      }
    },

    mounted() {
      this.init();
    },

    computed: {
      published_posts() {
        return this.posts.filter(post => post.state.published);
      },

      deleted_posts() {
        return this.posts.filter(post => post.state.deleted);
      },

      drafted_posts() {
        return this.posts.filter(post => post.state.drafted);
      },

      fullName() {
        return `${this.user.name} ${this.user.lastname}`;
      }
    },

    methods: {
      init(){
        if(this.user && !this.viewer) {
          this.getUserProfile(this.user.id);
          this.getPosts(this.user.id);
          this.copyData(this.user, this.originalUserData)
        }
        else if(!this.user && this.viewer) {
            this.user = this.$route.params.postUserId;
            this.getUserProfile(this.user);
            this.getPosts(this.user);
        }
        else {
          this.user = JSON.parse(localStorage.getItem('userData'));
          if(this.user) {
            this.getPosts(this.user.id);
            this.copyData(this.user, this.originalUserData)
          }
        }
      },

      getUserProfile(userId) {
        axios.get(`users?id=${userId}`)
        .then(res => {
          this.user = res.data[0];
          if(!this.viewer) {
            this.user.fullName = this.fullName;
            this.user.isUserLogged = true;
          }
        })
      },

      getPosts(userId) {
        axios.get(`posts?userId=${userId}&_limit=25`)
          .then(res => {
            this.posts = res.data;
          })
          .catch(err => toastr.warning(err));
      },

      updateProfile(userId) {

        if(!this.user.name || !this.user.lastname || !this.user.email) {
          toastr.warning('Please make sure all fields are properly filled');
        }
        else if(confirm('Do you want to apply these changes?') == true) {
          axios.put(`users/${userId}`, this.user)
           .then(res => {
             toastr.success('Profile updated');
             this.isProfileEditable = !this.isProfileEditable;
           })
           .catch(err => toastr.error(err));
        }
        else {
          this.cancelEdition();
        }
      },

      cancelEdition() {
          this.user.name = this.originalUserData.name;
          this.user.lastname = this.originalUserData.lastname;
          this.user.email = this.originalUserData.email;
          this.isProfileEditable = !this.isProfileEditable;
      },

      deletePost(post, index) {
        if(confirm('Are you sure about deleting this post?') == true) {

            let currentPost = this.posts.find(res => res.id == post.id);

            currentPost.state.drafted = false;
            currentPost.state.deleted = true;
            currentPost.state.published = false;

            axios.put(`posts/${currentPost.id}`, currentPost)
              .then(res => {
                  this.posts.splice(currentPost.id, 1);
                  toastr.success('Post deleted');
                  this.$router.replace('/');
              }).catch(err => toastr.error(err));
          }
      },

      logout() {
        if(confirm('Are you sure about logging out?') == true) {

            localStorage.removeItem('userData');
            this.user = 0;
            toastr.success(`You've been logged out`);
            this.$router.replace('/');

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

<style media="screen">
</style>
