<template>
  <div id="profileView">
    <div id="menu">
      <router-link class="menuItems" to="posts">Posts</router-link>
      <router-link v-if="user" class="menuItems" :to="{name: 'newpost', params: {user: user}}">| New Post |</router-link>
      <router-link v-if="user" class="menuItems" :to="{name: 'profile', params: {user: user}}">Profile</router-link>
      <router-link v-if="user" class="menuItems" :to="{name: 'settings', params: {user: user}}">|Settings</router-link>
    </div>
    <h1>Profile</h1>
    <div class="">
      <h3>User information</h3>
      <div class="">

      </div>
    </div>
    <div class="row">
      <h3>Post list</h3>
      <div class="col-xs-6">
        <div id="postList">
              <div>
                <h4 class="titles">Title</h4>
                <p>CreationDate</p>
              </div>
              <div>
                <span>Post body</span>
              </div>
              <div>
                <button type="button">Likes</button>
                <button type="button">Comments</button>
                <button id="editedButton">Edited</button>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        user: {}
      }
    },

    created: function() {
      this.user = this.$route.params.user;
      if(!this.user) {
        toastr.warning('In order to perform any action you first need to log In');
        this.$router.replace('login');
      }
    },

    methods: {
    }
  }
</script>

<style media="screen">
</style>
