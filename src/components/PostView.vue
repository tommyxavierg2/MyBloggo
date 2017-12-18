<template>
  <div id="postView">
    <div id="navBar">
      <router-link class="navBarItems" to="/">Posts</router-link>
      <router-link v-if="user" class="navBarItems" :to="{name: 'newpost', params: {user: user}}">| New Post |</router-link>
      <router-link v-if="user" class="navBarItems" :to="{name: 'profile', params: {user: user}}">Profile</router-link>
      <button v-if="!user" type="button" class="btn btn-primary icons-right-float" @click="goToLogin">Login</button>
      <button v-if="!user" type="button" class="btn btn-primary icons-right-float" @click="goToRegister">Register</button>
      <button v-if="user" type="button" class="btn btn-primary icons-right-float">Logout</button>
    </div>
    <div>
      <router-link class="user-name-router icons-left-float" :to="{path: '/', params: {post: user}}">
        <i class="fa fa-arrow-circle-o-left">Return</i>
      </router-link>
      <router-link class="user-name-router" :to="{name: 'profile', params: {postUserId: post.userId, viewer: user}}">
        <img class="user-avatar" :src="post.avatar">
      </router-link> <br>
      <div>
        <router-link class="user-name-router" :to="{name: 'profile', params: {postUserId: post.userId, viewer: user}}">{{post.userName}}</router-link>
        <span class="titles"></span>
      </div>
    </div>
    <h4 class="titles">{{post.title}}</h4>
    <span>Created at: {{post.createdAt}}</span>
    <div class="post-view-content">
      <span readonly="isUserLogged">{{post.content}}</span>
    </div>
    <div>
      <button type="button" @click="addLike()" :disabled="!isUserLogged">Likes {{post.likes}}</button>
      <span>Comments {{post.comments}}</span>
    </div>
    <div v-if="user && post.commentsAllowed">
      <h4>New Comment</h4>
      <div class="input-group">
        <span class="input-group-addon">Content</span>
        <textarea class="form-control" v-model="newComment.comment"  @keyup.enter="addComment" v-bind:readonly="!isUserLogged"></textarea>
      </div>
      <div v-if="newComment.comment">
        <button type="button" class="btn btn-danger" @click="newComment.comment = ''">Cancel</button>
        <button type="button" class="btn btn-primary" @click="addComment">Place comment</button>
      </div>
    </div>
    <div>
      <h4>Comments
        <i class="fa fa-level-down icons-right-float" @click="comments.reverse()">Reverse</i>
      </h4>
      <div v-for="(comment, index) in comments" class="comments-display">
        <div class="row" @mouseover="optionsButtonsActive = !optionsButtonsActive">
          <div class="col-xs-4">
            <img :src="comment.userAvatar" class="comment-avatar-img">
            <span>{{comment.userName}}</span>
          </div>
          <span class="input-group-addon">{{comment.date}}</span>
          <div class="col-xs-8 input-group">
            <textarea v-model="comment.comment" class="form-control" @keyup.enter="editPostComments(index)" v-bind:readonly="isCommentEditable"></textarea>
          </div>
        </div>
        <div v-if="optionsButtonsActive && user.id == comment.userId">
          <button type="button" @click="isCommentEditable = !isCommentEditable">
            <i class="fa fa-pencil"></i>
          </button>
          <button v-if="!isCommentEditable" type="button" class="btn-danger" @click="isCommentEditable = !isCommentEditable">Cancel</button>
          <button type="button" @click="deleteComment(index)" class="icons-right-float">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-if="!user">
      <h3 v-if="!user">In order to place a comment you first need to be logged in</h3>
      <div class="input-group">
        <span class="input-group-btn">
          <button type="button" class="btn btn-primary btn-block" @click="goToLogin">Login</button>
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
      comments: [],
      newComment: {},
      isUserLogged: false,
      optionsButtonsActive: false,
      isCommentEditable: true
    }
  },

  created() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.getPost()

    if(this.post) {
        this.getComments();
    }
    else if(this.user){
      this.isUserLogged = true;
    }
    else {
      toastr.warning(`There's no post to show, please make sure to select a post first`);
      this.$router.replace('/');
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
      axios.post('comments', {
        comment: this.newComment.comment,
        postId: this.post.id,
        userId: this.user.id,
        userName: this.user.name,
        userAvatar: this.user.avatar,
        date: date.substr(8, 13)
      })
      .then(res => {
        this.post.comments++;
        this.updatePostComments();
        this.getComments();
        this.newComment.comment = '';
        toastr.success(`Your comment has been posted`);
      })
      .catch(err => toastr.error(err));
    },

    getPost() {
      this.post = this.$route.params.post;
    },

    getComments() {
      axios.get(`comments?postId=${this.post.id}&_limit=25`)
      .then(res => this.comments = res.data)
        .catch(err => toastr.error(err))
    },

    updatePostComments() {
      axios.put(`posts/${this.post.id}`, this.post)
      .then()
      .catch(err => toastr.error(err))
    },

    editPostComments(index) {
      let currentComment = this.comments[index];

      axios.put(`comments/${currentComment.id}`, currentComment)
      .then(res => {
        toastr.success('Comment edited');
        this.isCommentEditable = !this.isCommentEditable;
      })
      .catch(err => toastr.error(err))
    },

    deleteComment(index){
      let currentComment = this.comments[index];
      this.comments.splice(currentComment.id, 1);

      axios.delete(`comments/${currentComment.id}`)
      .then(res => {
        this.post.comments--;
        this.getComments();
        axios.put(`posts/${currentComment.postId}`, this.post)
          .then()
          .catch(err => toastr.error(err))
        toastr.success('Comment deleted');
      })
      .catch(err => toastr.error(err))
    },

    goToLogin() {
      this.$router.push({name: 'login', params: {post: this.post} });
    },

    goToRegister() {
      this.$router.replace('register');
    },

  }
}
</script>

<style lang="css">
</style>
