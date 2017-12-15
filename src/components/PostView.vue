<template>
  <div id="postView">
    <div id="menu">
      <router-link class="menuItems" to="posts">Posts</router-link>
      <router-link v-if="user" class="menuItems" :to="{name: 'newpost', params: {user: user}}">| New Post |</router-link>
      <router-link v-if="user" class="menuItems" :to="{name: 'profile', params: {user: user}}">Profile</router-link>
      <router-link v-if="user" class="menuItems" :to="{name: 'settings', params: {user: user}}">|Settings</router-link>
    </div>
    <div class="row">
      <div class="col-xs-4">
        <img class="user-avatar" :src="post.avatar" alt="">
      </div>
      <div class="col-xs-8">
        <label>{{post.name}}</label>
        <label>{{post.createdAt}}</label>
        <h4 class="titles">{{post.title}}</h4>
      </div>
      <div>
        <button type="button" v-on:click="addLike()">Likes {{post.likes}}</button>
        <button type="button">Comments {{post.comments}}</button>
      </div>
    </div>
    <div class="post-view-content">
      <span>{{post.content}}</span>
    </div>
    <h4 v-if="comments">Comments</h4>
    <div v-for="comment in comments" class="comments-display">
      <div class="row">
        <div class="col-xs-4">
          <img :src="comment.userAvatar" class="comment-avatar-img">
          <span>{{comment.userName}}</span>
        </div>
        <div class="col-xs-8 input-group">
          <span class="input-group-addon">{{comment.date}}</span>
          <textarea v-model="comment.comment" class="form-control"></textarea>
        </div>
      </div>
    </div>
    <h3 v-if="!user">In order to place a comment you first need to be logged in</h3>
    <div v-if="!user">
      <div class="input-group">
        <span class="input-group-btn">
          <button type="button" class="btn btn-primary btn-block" @click="goToLogin">Login</button>
        </span>
      </div>
    </div>
    <div v-if="user">
      <h4>New Comment</h4>
      <div class="input-group">
        <span class="input-group-addon">Content</span>
        <textarea class="form-control" v-model="newComment.comment"></textarea>
      </div>
      <div v-if="newComment" class="input-group">
        <span class="input-group-btn">
          <button type="button" class="btn btn-primary btn-block" @click="addComment()">Comment</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      post: {},
      comments: {},
      newComment: {},
      postId: null
    }
  },

  created() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.postId = this.$route.params.postId;
    if(!this.postId) {
      this.getPost();
      this.getComments();
    } else {
      
    }
  },

  methods: {
    addLike() {
      this.post.likes++;
      axios.put(`posts/${this.post.id}`, this.post)
      .then(res => toastr.success('You liked the post'))
    },

    addComment() {
      let date = new Date().toString();
      this.post.comments++;
      axios.post('comments', {
        comment: this.newComment.comment,
        postId: this.post.id,
        userId: this.user.id,
        userName: this.user.name,
        userAvatar: this.user.avatar,
        date: date.substr(8, 24)
      })
      .then(res => {
        toastr.success(`You've posted`);
        this.getComments();
      })
      .catch(err => toastr.warning(err));
    },

    getComments() {
      axios.get(`comments?postId=${this.post.id}`)
      .then(res => this.comments = res.data)
        .catch(err => toastr.warning(err))
    },

    getPost() {
      this.post = this.$route.params.post;
    },

    updatePost() {
      this.post.comments++;
      axios.put(`posts?id=${this.post.id}`, this.post)
      .then()
      .catch(err => toastr.warning(err))
    },

    goToLogin() {
      this.$router.push({name: 'login', params: {postId: this.post.id}});
    }
  }
}
</script>

<style lang="css">
 .post-view-content {
   background-color: white;
   border: 2px solid gray;
   border-radius: 10%;
 }

 .comment-avatar-img {
   width: 100px;
   height: 50px;
 }

 .comments-display {
   border: 1px solid gray;
   background: white;
 }
</style>
