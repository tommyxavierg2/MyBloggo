<template>
  <div id="homeView">
    <div class="">
      /// Menu       /// Menu      /// Menu      /// Menu      /// Menu

    </div>
    <div>Bloggo..</div>
    <div>
        <ol>
          <li>
            <h3>title?</h3>
            <div class="">
              <img src="" alt="">
              <p>date?</p>
              <textarea>comment body?</textarea> <br>
              <label>likes?</label>
              <label>edited?</label>
            </div>
          </li>
        </ol>
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

  ol {
    border: 1px solid black;
  }

  li {
    border: 1px solid black;
  }
</style>
