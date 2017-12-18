<template>
  <div id="postsView">
    <div id="navBar">
      <router-link class="navBarItems" to="/">Posts</router-link>
      <router-link v-if="user" class="navBarItems" :to="{name: 'newpost', params: {user: user}}">| New Post |</router-link>
      <router-link v-if="user" class="navBarItems" :to="{name: 'profile', params: {user: user}}">Profile</router-link>
      <button v-if="!user" type="button" class="btn btn-primary icons-right-float" @click="goToLogin">Login</button>
      <button v-if="!user" type="button" class="btn btn-primary icons-right-float" @click="goToRegister">Register</button>
      <button v-if="user" type="button" class="btn btn-primary icons-right-float" @click="logout">Logout</button>
    </div>
    <div class="middle">
      <h1 class="titles">Bloggo!, made for you.</h1>
      <h2>Posts</h2>
      <div v-for="(post, index) in posts" class="post-list">
        <div class="icons-left-float">
          <span>{{index+1}}</span>
        </div>
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
              <router-link class="user-name-router" :to="{name: 'postview', params: {post: post}}">Created at: {{post.createdAt}}</router-link>
              <i v-if="user.id == post.userId" class="fa fa-times icons-right-float" @click="deletePost(index)"></i>
            </div>
            <div>
              <h4>
                <router-link class="user-name-router titles" :to="{name: 'postview', params: {post: post}}">{{post.title}}</router-link>
              </h4>
            </div>
            <div>
              <span readonly="!isUserLogged">{{post.content.substr(0, 200)}}</span>
            </div>
            <div class="col-xs-6">
              <button type="button" v-on:click="addLike(index, post)" :disabled="!isUserLogged">Likes {{post.likes}}</button>
              <router-link class="user-name-router" :to="{name: 'postview', params: {post: post}}">Comments {{post.comments}}</router-link>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        posts: [],
        user: {},
        isUserLogged: false,
        isUserPost: false
       }
  },

  created() {
    this.getPosts();
    this.getUserData();
  },

  methods: {
    addLike(index, post) {
      this.posts[index].likes++;
      axios.put(`posts/${post.id}`, this.posts[index])
      .then(res => toastr.success('You liked the post'))
    },

    getPosts() {
      axios.get('posts?_limit=25')
        .then(res => this.posts = res.data.reverse())
        .catch(err => toastr.error(err));
    },

    deletePost(index){
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

          })
          .catch(err => toastr.error(err))
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
      localStorage.removeItem('userData');
      this.user = 0;
      toastr.success(`You've been logged out`);
      this.$router.replace('/');
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
