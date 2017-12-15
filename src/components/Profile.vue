<template>
  <div id="profileView">
    <div id="menu">
      <router-link class="menuItems" :to="{path: '/', params: {user: user}}">Posts</router-link>
      <router-link v-if="user" class="menuItems" :to="{name: 'newpost', params: {user: user}}">| New Post |</router-link>
      <router-link v-if="user" class="menuItems" :to="{name: 'profile', params: {user: user}}">Profile</router-link>
      <router-link v-if="user" class="menuItems" :to="{name: 'settings', params: {user: user}}">|Settings</router-link>
    </div>
    <h1>Profile</h1>
    <div class="">
      <h3>User information</h3>
      <div>
        <div class="">
          <img :src="user.avatar" class="user-profile">
        </div>
        <div class="">
          <div>
            <label>Name:</label>
            <span>{{user.name}} {{user.lastname}}</span>
          </div>
          <div>
            <label>Email:</label>
            <span>{{user.email}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <h3>Post list</h3>
        <div id="postList" class="post-list" v-for="(post, index) in posts">
          <div>
            <h4 class="titles">{{post.title}}</h4>
            <p>{{post.createdAt}}</p>
          </div>
          <div>
            <span>{{post.content}}</span>
          </div>
          <div>
            <button type="button">{{post.likes}} Likes</button>
            <button type="button">{{post.comments}} Comments</button>
            <button id="editedButton">Edited</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        user: {},
        viewer: {},
        posts: {}
      }
    },

    created: function() {
      this.user = this.$route.params.user;
      this.viewer = this.$route.params.viewer;

      if(!this.user && this.viewer) {
          this.user = this.$route.params.postUserId;
          this.getUserProfile();
          this.getPosts();
      } else if(!this.user && !this.viewer) {
          toastr.warning('In order to perform any action you first need to log In');
          this.$router.replace('login');
      }
    },

    methods: {
      getUserProfile() {
        axios.get(`users?id=${this.user}`)
        .then(res => {
          this.user = res.data[0];
        })
      },

      getPosts() {
        axios.get(`posts?userId=${this.user}`)
          .then(res => this.posts = res.data)
          .catch(err => toastr.warning(err));
      },
    }
  }
</script>

<style media="screen">
</style>
