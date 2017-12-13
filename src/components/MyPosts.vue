<template>
  <div id="homeView">
    <div id="menu">
      <label class="menuItems">Posts</label> |
      <label class="menuItems">MyPosts</label> |
      <label class="menuItems">Settings</label>
    </div>
    <h1>Your posts</h1>
    <div>
      <label>Title:</label>
      <input placeholder="Title"></input>
      <label>Content:</label>
      <textarea placeholder="Title"></textarea>
      <label for="">Allow comments</label>
      <input type="checkbox"></input>
    </div>
  </div>
</template>

<script>import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3000";
import toastr from 'toastr'
toastr.options = {
  timeOut: 2000,
  positionClass: 'toast-top-right',
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
}

var userData
  export default {
    data(){
      return {}
    },

    created: function() {
      userData = localStorage.getItem('userData');
      if(!userData) {
        toastr.success('In order to comment, like or place a post you first need to log In');
      }
    }
  }
</script>

<style media="screen">
  #homeView {
    text-align: center;
  }
</style>
