<template>
  <div>
    <ul id="navBar" class="list-inline">
      <li><router-link class="navBarItems" to="/">Posts</router-link></li>
      <li><router-link v-if="user" class="navBarItems" :to="{name: 'newpost', params: {user: user}}">| New Post |</router-link></li>
      <li><router-link v-if="user" class="navBarItems" :to="{name: 'profile', params: {user: user}}">Profile</router-link></li>
      <li>
        <div class="input-group icons-right-float" id="searchBox">
            <input type="text" class="form-control" placeholder="Search">
            <span class="input-group-addon">
              <i class="fa fa-search"></i>
            </span>
        </div>
     </li>
     <li><button v-if="user" type="button" class="btn btn-primary icons-right-float" @click="logout">Logout</button></li>
    </ul>
    <h1>Profile</h1>
    <div class="">
      <h3>User information</h3>
      <div>
        <div class="">
          <img :src="user.avatar" class="user-profile">
        </div>
        <div class="">
          <div>
            <label>Name:</label>
            <span>{{user.name}} {{user.lastname}}</span>
          </div>
          <div>
            <label>Email:</label>
            <span>{{user.email}}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h3>Posts</h3>
      <div>
        <ul class="nav nav-tabs nav-justified">
           <li class="active"><a class="tabs" data-toggle="tab" href="#published">Published</a></li>
           <li><a class="tabs" data-toggle="tab" href="#drafts">Drafts</a></li>
           <li><a class="tabs" data-toggle="tab" href="#deleted">Deleted</a></li>
        </ul>
      </div>
      <div class="tab-content">
        <div id="published" class="tab-pane fade">
          <div id="postList" class="post-list" v-for="(post, index) in posts">
            <div>
              <h4 class="titles">{{post.title}}</h4>
              <p>{{post.createdAt}}</p>
            </div>
            <div>
              <span>{{post.content}}</span>
            </div>
            <div>
              <button type="button">{{post.likes}} Likes</button>
              <button type="button">{{post.comments}} Comments</button>
              <button id="editedButton">Edited</button>
            </div>
          </div>
        </div>
        <div id="drafts" class="tab-pane fade">
          <h3>No post has been drafted yet</h3>
        </div>
        <div id="deleted" class="tab-pane fade deleted-posts-list" v-for="(post, index) in deleted_posts">
          <h3 v-if="!deleted_posts">No post has been deleted yet</h3>
          <div class="">
            <i class="fa fa-undo icons-right-float">Undo</i>
          </div>
          <div>
            <h4 class="titles">{{post.title}}</h4>
            <p>{{post.createdAt}}</p>
          </div>
          <div>
            <span>{{post.content}}</span>
          </div>
          <div>
            <button type="button" disabled>{{post.likes}} Likes</button>
            <button type="button" disabled>{{post.comments}} Comments</button>
            <button id="editedButton" disabled>Edited</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        user: {},
        viewer: {},
        posts: [],
        deleted_posts: []
      }
    },

    created: function() {
      this.user = this.$route.params.user;
      this.viewer = this.$route.params.viewer;

      if(this.user) {
        this.getUserProfile(this.user.id);
        this.getPosts(this.user.id);
        this.getDeletedPosts(this.user.id);
      }
      else if(!this.user && this.viewer) {
          this.user = this.$route.params.postUserId;
          this.getUserProfile(this.user);
          this.getPosts(this.user);
          this.getDeletedPosts(this.user);
      }
      else if (!this.user) {
        this.user = JSON.parse(localStorage.getItem('userData'));
        if(this.user) {
          this.getPosts(this.user.id);
          this.getDeletedPosts(this.user.id);
        }
        else {
          toastr.warning('In order to perform any action you first need to log In');
          this.$router.replace('login');
        }
      }
    },

    methods: {
      getUserProfile(userId) {
        axios.get(`users?id=${userId}`)
        .then(res => {
          this.user = res.data[0];
        })
      },

      getPosts(userId) {
        axios.get(`posts?userId=${userId}&_limit=25`)
          .then(res => this.posts = res.data)
          .catch(err => toastr.warning(err));
      },

      getDeletedPosts(userId) {
        axios.get(`deleted_posts?userId=${userId}&_limit=25`)
        .then(res => this.deleted_posts = res.data)
        .catch(err => toastr.error(err))
      },

      undoPostDeletion() {
       /* let date = new Date().toString();
         axios.post('posts', {
           title: this.newPost.title,
           content: this.newPost.content,
           commentsAllowed: this.newPost.commentsAllowed,
           likes: this.newPost.likes,
           comments: this.newPost.comments,
           createdAt: date.substr(8, 23),
           userName: this.user.name + ' ' + this.user.lastname,
           userId: this.user.id,
           avatar: "https://firebasestorage.googleapis.com/v0/b/todo-app-1feb3.appspot.com/o/default.png?alt=media&token=b1c8a2a0-3f31-4f33-ad89-e57bead0bc0d"
         })
         .then(res => {
           toastr.success('Sucessfully posted');
           this.newPost.title = '';
           this.newPost.content = '';
           this.newPost.commentsAllowed = '';
         })
         .catch(err => toastr.error(err)); */
      },

      logout() {
        localStorage.removeItem('userData');
        toastr.success(`You've been logged out`);
        this.$router.replace('/');
      }
    }
  }
</script>

<style media="screen">
</style>
