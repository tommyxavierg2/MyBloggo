<template>
  <div class="post-list list-inline">

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
          <router-link class="user-name-router" :to="{name: 'postview', params: {post: post, viewer: user}}">Posted on: {{post.creationDate}}</router-link>
          <i v-if="user.id == post.userId" class="fa fa-times icons-right-float" @click="deletePost(index)"></i>
        </div>
        <div>
          <router-link class="user-name-router titles" :to="{name: 'postview', params: {post: post, viewer: user}}">{{post.title}}</router-link>
        </div>
          <span readonly="!isUserLogged">{{post.content.substr(0, 200)}}</span>
        <div class="col-xs-6">
          <button type="button" @click="addLike(index, post, user.likedPostId)" :disabled="!isUserLogged">Likes {{post.likes}}</button>
          <router-link class="user-name-router" :to="{name: 'postview', params: {post: post, viewer: user}}">Comments {{post.comments}}</router-link>
        </div>
     </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: [ 'post', 'index', 'isUserLogged', 'user' ],
  methods: {

  }
}
</script>

<style lang="css">
</style>
