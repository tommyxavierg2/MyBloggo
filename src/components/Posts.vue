<template>
  <div id="postsView">

    <ul id="navBar" class="list-inline align-left">
      <li><router-link class="navBarItems" to="/">Bloggo</router-link></li>
      <li><router-link v-if="user" class="navBarItems" :to="{name: 'newpost', params: {user: user}}">| New Post |</router-link></li>
      <li><router-link v-if="user" class="navBarItems" :to="{name: 'profile', params: {user: user}}">Profile</router-link></li>
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

      <h2 class="titles">Posts</h2>

      <div v-for="(post, index) in posts" class="post-list">

          <span class="icons-left-float">{{index+1}}</span>

          <div class="row post-list">
            <div class="col-xs-6">
              <router-link class="user-name-router" :to="{name: 'profile', params: {postUserId: post.userId, viewer: user}}">
                <img class="user-avatar" :src="post.avatar">
              </router-link> <br>
              <router-link class="user-name-router" :to="{name: 'profile', params: {postUserId: post.userId, viewer: user}}">
                <span class="titles">{{post.userName}}</span>
              </router-link>
            </div>
            <div>
              <router-link class="user-name-router" :to="{name: 'postview', params: {post: post}}">Posted on: {{post.creationDate}}</router-link>
              <i v-if="user.id == post.userId" class="fa fa-times icons-right-float" @click="deletePost(index)"></i>
            </div>
            <div>
              <router-link class="user-name-router titles" :to="{name: 'postview', params: {post: post}}">{{post.title}}</router-link>
            </div>
              <span readonly="!isUserLogged">{{post.content.substr(0, 200)}}</span>
            <div class="col-xs-6">
              <button type="button" @click="addLike(index, post, user.likedPostId)" :disabled="!isUserLogged">Likes {{post.likes}}</button>
              <router-link class="user-name-router" :to="{name: 'postview', params: {post: post}}">Comments {{post.comments}}</router-link>
            </div>
         </div>

      </div>

  </div>

</template>

<script>
export default {
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
        posts: [],
        isUserLogged: false,
        isUserPost: false,
        postValidation: null
       }
  },

  created() {
    this.getPosts();
    this.getUserData();
  },

  methods: {
    addLike(index, post, userLikedPosts) {

      this.postValidation = userLikedPosts.some(userPost => post.id == userPost);

      if(!this.postValidation) {
          this.posts[index].likes++;

          axios.put(`posts/${post.id}`, this.posts[index])
          .then(res => {
              this.user.likedPostId.push(post.id);
              toastr.success('You liked the post');

              axios.put(`users/${this.user.id}`, this.user)
                .then().catch(err => toastr.error(err));
          })
          .catch(err => toastr.error(err));
      }
      else {
        this.posts[index].likes--;

        axios.put(`posts/${post.id}`, this.posts[index])
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

    getPosts() {
      axios.get('posts?_limit=25')
        .then(res => this.posts = res.data.reverse())
        .catch(err => toastr.error(err));
    },

    deletePost(index){
      if(confirm('Are you sure about deleting this post?') == true) {

          let currentPost = this.posts[index];

          axios.post('deleted_posts', currentPost)
            .then(res => {
                this.posts.splice(currentPost.id, 1);

                axios.delete(`posts/${currentPost.id}`)
                 .then(res => {
                    this.getPosts();
                    toastr.success('Post deleted');
                 })
                .catch(err => toastr.error(err))

            }).catch(err => toastr.error(err))
        }
    },

    getUserData() {
      this.user = JSON.parse(localStorage.getItem('userData'));
      if(!this.user) {
        this.user = 0;
      } else {
        this.isUserLogged = true;
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

<style lang="css">
</style>
