<template>
  <div id="postsView" class="">
    <div id="menu">
      <router-link class="menuItems" to="posts">Posts</router-link> |
      <router-link class="menuItems" to="newpost">New Post</router-link> |
      <router-link class="menuItems" to="myposts">MyPosts</router-link> |
      <router-link class="menuItems" to="settings">Settings</router-link>
    </div>
    <div class="middle">
      <h1 class="titles">Bloggo!, made for you.</h1>
      <h2>Recent posts</h2>
      <div id="postList" v-for="post in posts">
          <div class="row">
            <div class="col-xs-6">
              <p><strong>{{post.author.name}}</strong>{{post.creationDate}}</p>
              <img class="user-avatar" :src="post.author.avatar" alt=""> <br>
            </div>
            <div class="col-xs-6 leftAlign">
              <h4 class="titles">{{post.title}}</h4>
              <button type="button">{{post.likes}}</button>
              <button type="button">{{post.comments}}</button>
              <button id="editedButton">{{post.edited}}</button>
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
        posts: [
          { title: 'Testing', author: { name: 'Test Tester', avatar: '' }, creationDate: '10/12/17', content: 'Testing a test', comments: 0, likes: 0, edited: false },
          { title: 'Testing', author: { name: 'Test Tester', avatar: '' }, creationDate: '10/12/17', content: 'Testing a test', comments: 0, likes: 0, edited: false }
        ],
        users: [
          {  }
        ]
    }
  }
}
</script>

<style lang="css">
</style>
