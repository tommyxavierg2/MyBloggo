<template>
  <div id="postView">

    <div class="post-view">
      <router-link class="user-name-router icons-left-float" :to="{path: '/', params: {post: user}}">
        <i class="fa fa-arrow-circle-o-left">Return</i></router-link>
        <router-link class="user-name-router" :to="{name: 'profile', params: {postUserId: post.userId, viewer: user}}">
          <avatar v-if="post.fullName" :username="post.fullName" class="gravatar" :size="100"></avatar></router-link>
        <router-link class="user-name-router titles" :to="{name: 'profile', params: {postUserId: post.userId, viewer: user}}">{{post.fullName}}</router-link>
        <span class="titles"></span>
        <button v-if="isUserLogged && post.userId == user.id" type="button" class="icons-right-float" @click="isPostContentEditable = !isPostContentEditable">
        Edit <i class="fa fa-pencil"></i></button>
      <h4 class="titles">{{post.title}}</h4>
      <span>Created at: {{post.creationDate}}</span>
      <div class="post-view-content">
        <span :readonly="isUserLogged">{{post.content}}</span>
      </div>
        <button type="button" @click="addLike()" :disabled="!isUserLogged" class="transparent-button">Likes {{post.likes}}</button>
        <span>Comments {{post.comments}} </span>
        <span v-if="post.edited">(Edited)</span>
    </div>

    <form v-if="user && isPostContentEditable" @submit.prevent="editPost(post)">
      <h4>Post edition</h4>

      <div class="input-group">
        <span class="input-group-addon">Title:</span>
        <input placeholder="Title" v-model.trim="post.title" class="form-control" autofocus required></input>
      </div>
      <div class="input-group">
        <span class="input-group-addon">Content:</span>
        <textarea v-model.trim="post.content" rows="4" cols="40" class="form-control" required></textarea>
      </div>
      <div class="input-group">
        <span class="input-group-addon">
          <input type="checkbox" v-model="post.commentsAllowed"></input>
        </span>
        <input type="text" class="form-control" value="Allow comments?" readonly>
      </div>
      <div class="input-group">
        <span class="input-group-btn">
          <button v-if="isUserLogged && post.userId == user.id" type="button" class="btn btn-warning" @click="deletePost(post)">Delete</button>
          <button type="button" class="btn btn-danger" @click="cancelPostEdition">Cancel</button>
          <button v-if="post.state.published" type="submit" class="btn btn-primary">Update</button>
          <button v-if="post.state.drafted || post.state.deleted" type="button" class="btn btn-success" @click="createPost(post)">Post</button>
        </span>
      </div>

    </form>

    <div v-if="user && post.commentsAllowed">
      <h4>New Comment</h4>
      <div class="input-group">
        <span class="input-group-addon">Content</span>
        <textarea class="form-control" v-model="newComment.comment"  @keyup.enter="addComment" :readonly="!isUserLogged"></textarea>
      </div>
      <div v-if="newComment.comment">
        <button type="button" class="btn btn-danger" @click="newComment.comment = ''">Cancel</button>
        <button type="button" class="btn btn-primary" @click="addComment">Place comment</button>
      </div>
    </div>

    <h4 v-if="comments">Comments <i class="fa fa-level-down icons-right-float" @click="comments.reverse()">Reverse</i></h4>

    <div v-for="(comment, index) in comments" class="comments-display">

      <div class="row post-list">
        <div class="col-xs-4">
          <span class="icons-left-float">{{index+1}}</span>
          <avatar :username="comment.fullName" class="gravatar" :size="100"></avatar>
          <span>{{comment.fullName}}</span>
        </div>
        <div class="col-xs-8">
          <button v-if="user && user.id == comment.userId && optionsButtonsActive" type="button" @click="isCommentEditable = !isCommentEditable">
            <i class="fa fa-pencil"></i></button>

          <button type="button" @click="deleteComment(index)" class="icons-right-float">
            <i class="fa fa-times"></i></button>
          <span>{{comment.date}}</span>
          <textarea v-model="comment.comment" @mouseover="optionsButtonsActive = !optionsButtonsActive" readonly class="form-control"></textarea> <br>

          <div v-if="!isCommentEditable">
            <div class="input-group">
              <span class="input-group-addon">Comment:</span>
              <input placeholder="Comment" v-model.trim="comment.comment" class="form-control" autofocus></input>
            </div> <br>
              <button type="button" class="btn btn-danger" @click="isCommentEditable = !isCommentEditable">Cancel</button>
              <button type="button" class="btn btn-primary" @click="editPostComments(index)">Save</button>
          </div> <br>
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
      user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        id: null,
        fullName: '',
        likedPostId: [],
        isUserLogged: false,
        remembered: false,
        profileState: false
      },
      post: {
        comments: 0,
        commentsAllowed: true,
        content: '',
        creationDate: '',
        publicationDate: '',
        edited: false,
        id: null,
        likes: 0,
        title: '',
        userId: null,
        fullName: '',
        state: {
          published: true,
          drafted: false,
          deleted: false
        }
      },
      originalPost: {
        comments: null,
        commentsAllowed: false,
        content: "",
        edited: false,
        title: "",
      },
      newComment: {
        comment: "",
        postId: null,
        userId: null,
        fullName: "",
        date: "",
        id: null
      },
      comments: [],
      optionsButtonsActive: false,
      isUserLogged: false,
      isCommentEditable: true,
      isPostEditable: false,
      isPostContentEditable: false
    }
  },

  created() {
    this.getUser();
  },

  mounted() {
    this.getPost();
  },

  computed: {
    fullName() {
      return this.post.fullName;
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
        fullName: `${this.user.name} ${this.user.lastname}`,
        date: date.substr(8, 16)
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

    getUser() {
      this.user = JSON.parse(localStorage.getItem('userData'));
      if(this.user) {
        this.user.isUserLogged = true;
        this.isUserLogged = this.user.isUserLogged;
      }
      else {
        this.isUserLogged = false;
        this.user = 0;
      }
    },

    getPost() {
      this.post = this.$route.params.id;

      if(this.post) {
         axios.get(`posts/${this.post}`)
          .then(res => {
            this.post = res.data;
            this.getComments();
            this.originalPost = {
              commentsAllowed: this.post.commentsAllowed,
              content: this.post.content.slice(),
              edited: this.post.edited,
              title: this.post.title.slice(),
            }
          })
          .catch(err => toastr.error(err));
      }
      else {
          toastr.warning(`Post not found`);
          this.$router.replace('/');
      }
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

    createPost(postData) {
      if(confirm('Are you sure about this?')) {
        let date = new Date().toString();
        postData.publicationDate = date.substr(8,16);
        postData.fullName = this.user.name + ' ' + this.user.lastname;
        postData.state.deleted = false;
        postData.state.drafted = false;
        postData.state.published = true;

        axios.put(`posts/${postData.id}`, postData)
        .then(res => {
          toastr.success('Sucessfully posted');
          this.$router.replace('/');
        })
        .catch(err => toastr.error(err));
      }
   },

    editPost(postData) {
      if(confirm('Are you sure you want to apply these changes?') == true) {

        axios.put(`posts/${postData.id}`, this.post)
        .then(res => {
          toastr.success('Post updated');
          this.isPostContentEditable = !this.isPostContentEditable;
          this.$router.replace('/');
        })
        .catch(err => toastr.error(err));
      } else {
        this.cancelPostEdition();
      }
    },

    cancelPostEdition() {
        this.post.commentsAllowed = this.originalPost.commentsAllowed,
        this.post.title = this.originalPost.title;
        this.post.content = this.originalPost.content;
        this.post.edited = this.post.edited;
        this.isPostContentEditable = !this.isPostContentEditable;
        this.$router.replace('/');
    },

    editPostComments(index) {
      let currentComment = this.comments[index];

      if(confirm('Are you sure about editing this comment?') == true) {
        axios.put(`comments/${currentComment.id}`, currentComment)
        .then(res => {
          toastr.success('Comment edited');
          this.isCommentEditable = !this.isCommentEditable;
        })
        .catch(err => toastr.error(err));
      }
    },

    deletePost(postData) {
      if(confirm('Are you sure about deleting this post?') == true) {

          postData.state.drafted = false;
          postData.state.deleted = true;
          postData.state.published = false;

          axios.put(`posts/${postData.id}`, postData)
            .then(res => {
                toastr.success('Post deleted');
                this.$router.replace('/');
            }).catch(err => toastr.error(err));
        }
    },

    deleteComment(index){
      let currentComment = this.comments[index];

      if(confirm('Are you sure about deleting this comment?') == true) {

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
      }
    },

    goToLogin() {
      this.$router.push({name: 'login', params: {post: this.post}});
    }
  }
}
</script>

<style lang="css">
</style>
