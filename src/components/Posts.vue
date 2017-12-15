<template>
  <div id="postsView" class="">
    <div id="menu">
      <router-link class="menuItems" to="posts">Posts</router-link>
      <router-link v-if="user" class="menuItems" :to="{name: 'newpost', params: {user: user}}">| New Post |</router-link>
      <router-link v-if="user" class="menuItems" :to="{name: 'profile', params: {user: user}}">Profile</router-link>
      <router-link v-if="user" class="menuItems" :to="{name: 'settings', params: {user: user}}">|Settings</router-link>
    </div>
    <div class="middle">
      <h1 class="titles">Bloggo!, made for you.</h1>
      <h2>Posts</h2>
      <div id="postList" v-for="(post, index) in posts" class="post-list">
          <div class="row post-list">
            <div class="col-xs-6">
              <img class="user-avatar" :src="post.avatar" alt=""> <br>
              <router-link class="user-name-router" :to="{name: 'postview', params: {post: post}}">{{post.userName}}</router-link>
            </div>
            <router-link class="user-name-router" :to="{name: 'postview', params: {post: post}}">Date: {{post.createdAt}}</router-link>

            <div>
              <h4 class="titles">{{post.title}}</h4>
              <span>{{post.content.substr(0, 200)}}</span>
            </div>
            <div class="col-xs-6">
              <button type="button" v-on:click="addLike(index, post)">Likes {{post.likes}}</button>
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
        posts: {},
        user: {}
       }
  },

  created() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    axios.get('posts')
      .then(res => this.posts = res.data)
      .catch(err => toastr.warning(err));
  },

  methods: {
    addLike(index, post) {
      this.posts[index].likes++;
      axios.put(`posts/${post.id}`, this.posts[index])
      .then(res => toastr.success('You liked the post'))
    },

    settings() {

    }
  }
}
</script>

<style lang="css">
  img {
    width: 150px;
    height: 100px;
    padding: 5px;
    border: 1px solid black;
  }

  .user-name-router {
    color: black;
  }

  .post-list {
    border: 1px solid gray;
    background-color: white;
    border-radius: 15%;
  }
</style>
