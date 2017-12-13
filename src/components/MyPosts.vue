<template>
  <div id="homeView">
    <div id="menu">
      <label class="menuItems">Posts</label> |
      <label class="menuItems">MyPosts</label> |
      <label class="menuItems">Settings</label>
    </div>
    <h1>Posts</h1>
    <div class="row">
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
    align-items: center;
    padding: 5px;
  }

  #menu {
    background-color: gray;
    height: 40px;
  }

  #postList {
    width: 600px;
    border: 2px solid gray;
  }

  #editedButton {
    border: none;
    background-color: transparent;
    outline: none;
  }

  .menuItems {
    font-size: x-large;
    font-weight: bold;
  }

  .leftAlign {
    text-align: left;
  }

  .titles {
    font-weight: bold;
  }

  label:hover {
    color: white;
  }

  label:active {
    color: red;
  }
</style>
