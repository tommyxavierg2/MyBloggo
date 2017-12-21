<template>
  <div id="profileView">

    <ul id="navBar" class="list-inline align-left">
      <li><router-link class="navBarItems" to="/">Bloggo</router-link></li>
      <li><router-link v-if="user" class="navBarItems" :to="{name: 'newpost', params: {user: user}}">| New Post |</router-link></li>
      <li><router-link v-if="user" class="navBarItems" :to="{name: 'profile', params: {user: user}}">Profile</router-link></li>
      <li>
        <div class="input-group icons-right-float" id="searchBox">
            <input type="text" class="form-control" placeholder="Search">
            <span class="input-group-addon">
              <i class="fa fa-search"></i>
            </span>
        </div>
      </li>
      <li><button v-if="user" type="button" class="btn btn-primary icons-right-float" @click="logout">Logout</button></li>
    </ul>

    <h1>Profile</h1>

    <button v-if="!viewer" type="button" class="icons-right-float" @click="isProfileEditable = !isProfileEditable">
      Edit <i class="fa fa-pencil"></i></button>

    <div v-if="user">
      <h3>User information</h3>

        <div class="post-view">
          <img :src="user.avatar" class="user-profile"> <br>
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
      <ul class="nav nav-tabs nav-justified">
         <li><a class="tabs" data-toggle="tab" href="#published">Published</a></li>
         <li><a class="tabs" data-toggle="tab" href="#drafts">Drafts</a></li>
         <li><a class="tabs" data-toggle="tab" href="#deleted">Deleted</a></li>
      </ul>

      <div class="tab-content">

        <div id="published" class="tab-pane fade">
          <div v-for="(post, index) in published_posts" class="post-list">
            <i v-if="user.id == post.userId" class="fa fa-times icons-right-float" @click="deletePost(post, index)"></i>
            <span class="icons-left-float">{{index+1}}</span>
            <router-link class="user-name-router inline-display titles" :to="{name: 'postview', params: {post: post}}">{{post.title}}</router-link>
            <router-link class="user-name-router inline-display" :to="{name: 'postview', params: {post: post}}">Created on: {{post.creationDate}}</router-link>
            <router-link class="user-name-router inline-display" :to="{name: 'postview', params: {post: post}}">Published on: {{post.publicationDate}}</router-link>
            <span>{{post.content}}</span> <br>
            <button type="button" disabled>{{post.likes}} Likes</button>
            <button type="button" disabled>{{post.comments}} Comments</button>
            <span v-if="post.edited">(Edited)</span>
          </div>
        </div>

        <div id="drafts" class="tab-pane fade">
          <div v-for="(post, index) in drafted_posts" class="drafted_posts-list">
            <i v-if="user.id == post.userId" class="fa fa-times icons-right-float" @click="deletePost(post, index)"></i>
            <h3 v-if="!drafted_posts">No post has been drafted yet</h3>
            <span class="icons-left-float">{{index+1}}</span>
            <router-link class="drafted-router inline-display titles" :to="{name: 'postview', params: {post: post}}">{{post.title}}</router-link>
            <router-link class="drafted-router inline-display" :to="{name: 'postview', params: {post: post}}">Created on: {{post.creationDate}}</router-link>
            <router-link class="drafted-router inline-display" :to="{name: 'postview', params: {post: post}}">Published on: {{post.publicationDate}}</router-link>
            <span>{{post.content}}</span> <br>
            <span v-if="post.edited">(Edited)</span>
            <span>Likes {{post.likes}}</span>
            <span>Comments {{post.comments}}</span>
          </div>
        </div>

        <div id="deleted" class="tab-pane fade" >
          <div class="deleted-posts-list" v-for="(post, index) in deleted_posts">
            <h3 v-if="!deleted_posts">No post has been deleted yet</h3>
            <span class="icons-left-float">{{index+1}}</span>
            <router-link class="deleted-router inline-display titles" :to="{name: 'postview', params: {post: post}}">{{post.title}}</router-link>
            <router-link class="deleted-router inline-display" :to="{name: 'postview', params: {post: post}}">Created on: {{post.creationDate}}</router-link>
            <router-link class="deleted-router inline-display" :to="{name: 'postview', params: {post: post}}">Published on: {{post.publicationDate}}</router-link>
            <span>{{post.content}}</span> <br>
            <span v-if="post.edited">(Edited)</span>
            <span>Likes {{post.likes}}</span>
            <span>Comments {{post.comments}}</span>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
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
          likedPostId: []
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
        isProfileEditable: false,
      }
    },

    created() {
      this.user = this.$route.params.user;
      this.viewer = this.$route.params.viewer;
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
      }
    },

    methods: {
      init(){
        if(this.user) {
          this.getUserProfile(this.user.id);
          this.getPosts(this.user.id);
          this.copyData(this.user, this.originalUserData)
        }
        else if(!this.user && this.viewer) {
            this.user = this.$route.params.postUserId;
            this.getUserProfile(this.user);
            this.getPosts(this.user);
        }
        else if (!this.user) {
          this.user = JSON.parse(localStorage.getItem('userData'));
          if(this.user) {
            this.getPosts(this.user.id);
            this.copyData(this.user, this.originalUserData)
          }
          else {
            toastr.warning('In order to perform any action you first need to log In');
            this.$router.replace('login');
          }
        }
      },

      getUserProfile(userId) {
        axios.get(`users?id=${userId}`)
        .then(res => {
          this.user = res.data[0];
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
