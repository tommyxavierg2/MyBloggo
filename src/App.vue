<template>
  <div id="app">
    <ul class="navbar list-inline">
         <li><router-link class="navBarItems" to="/">Bloggo</router-link></li>
         <li><router-link  v-if="user"class="navBarItems" to="newpost">New Post</router-link></li>
         <li><router-link v-if="user" class="navBarItems" to="profile">Profile</router-link></li>
         <li>
           <div class="input-group" id="searchBox">
               <input type="text" class="form-control" placeholder="Search">
               <span class="input-group-addon">
                 <i class="fa fa-search"></i>
               </span>
           </div>
        </li>
        <li><button v-if="!user" type="button" class="btn btn-primary icons-right-float" @click="goToLogin">Login</button></li>
        <li><button v-if="!user" type="button" class="btn btn-primary icons-right-float" @click="goToRegister">Register</button></li>
        <li><button v-if="user" type="button" class="btn btn-primary icons-right-float" @click="logout">Logout</button></li>
       </ul>
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data() {
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
      }
    },

    created() {
      this.getUser();
    },

    methods: {
      getUser() {
        this.user = JSON.parse(localStorage.getItem('userData'));
      },

      addLike(index, post, userLikedPosts) {

        this.postValidation = userLikedPosts.some(userPost => post.id == userPost);
        let currentPost = this.published_posts[index];

        if(!this.postValidation) {
            this.published_posts[index].likes++;

            axios.put(`posts/${post.id}`, currentPost)
            .then(res => {
                this.user.likedPostId.push(post.id);
                toastr.success('You liked the post');

                axios.put(`users/${this.user.id}`, this.user)
                  .then().catch(err => toastr.error(err));
            })
            .catch(err => toastr.error(err));
        }
        else {
          this.published_posts[index].likes--;

          axios.put(`posts/${post.id}`, currentPost)
            .then(res => {
                let likedPostIndex = this.user.likedPostId.indexOf(post.id);
                this.user.likedPostId.splice(likedPostIndex, 1);

                axios.put(`users/${this.user.id}`, this.user)
                  .then(res => toastr.success('Post disliked'))
                  .catch(err => toastr.error(err));
            })
            .catch(err => toastr.error(err));
       }
      },

      deletePost(index){
        if(confirm('Are you sure about deleting this post?') == true) {

            let currentPost = this.published_posts[index];
            currentPost.state.published = false;
            currentPost.state.deleted = true;

            axios.put(`posts/${currentPost.id}`, currentPost)
              .then(res => {
                  this.published_posts.splice(currentPost.id, 1);
                  toastr.success('Post deleted');
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

      goToRegister() {
        this.$router.replace('register');
      },

      goToLogin() {
        this.$router.replace('login');
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Verdana', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #5D6D7E;
  padding: 10px;
}
</style>
