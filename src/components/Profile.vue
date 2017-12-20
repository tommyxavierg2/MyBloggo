<template>
  <div id="profileView">

    <ul id="navBar" class="list-inline align-left">
      <li><router-link class="navBarItems" to="/">Bloggo</router-link></li>
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

    <button v-if="!viewer" type="button" class="icons-right-float" @click="isProfileEditable = !isProfileEditable">
      Edit <i class="fa fa-pencil"></i></button>

    <div v-if="user">
      <h3>User information</h3>

        <div class="post-view">
          <img :src="user.avatar" class="user-profile"> <br>
          <label>Name:</label>
          <span>{{user.name}} {{user.lastname}}</span> <br>
          <label>Email:</label>
          <span>{{user.email}}</span>
        </div>

        <form v-if="isProfileEditable" class="post-view" @submit.prevent="updateProfile(user)">
          <div class="input-group">
            <span class="input-group-addon">Name:</span>
             <input type="text" class="form-control" v-model.trim="user.name" required>
          </div>
          <div class="input-group">
            <span class="input-group-addon">Lastname:</span>
             <input type="text" class="form-control" v-model.trim="user.lastname" required>
          </div>
          <div class="input-group">
            <span class="input-group-addon">Email:</span>
             <input type="email" class="form-control" v-model.trim="user.email" required>
          </div>
          <div class="d-flex justify-content-center">
             <button type="text" class="btn btn-danger" @click="cancelEdition">Cancel</button>
             <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>

    </div>

      <h3>Posts</h3>
      <ul class="nav nav-tabs nav-justified">
         <li><a class="tabs" data-toggle="tab" href="#published">Published</a></li>
         <li><a class="tabs" data-toggle="tab" href="#drafts">Drafts</a></li>
         <li><a class="tabs" data-toggle="tab" href="#deleted">Deleted</a></li>
      </ul>

      <div class="tab-content">
        <div id="published" class="tab-pane fade">
          <div id="postList" class="post-list" v-for="(post, index) in posts">
            <span class="icons-left-float">{{index+1}}</span>
            <h4 class="titles">{{post.title}}</h4>
            <p>{{post.creationDate}}</p>
            <span>{{post.content}}</span> <br>
            <button type="button" disabled>{{post.likes}} Likes</button>
            <button type="button" disabled>{{post.comments}} Comments</button>
            <span v-if="post.edited">(Edited)</span>
          </div>
        </div>

        <div id="drafts" class="tab-pane fade" v-for="(post, index) in drafted_posts">
          <span class="icons-left-float">{{index+1}}</span>
          <h3 v-if="!drafted_posts">No post has been drafted yet</h3>
          <h4 class="titles">{{post.title}}</h4>
          <p>{{post.creationDate}}</p>
          <span>{{post.content}}</span> <br>
          <button type="button" disabled>{{post.likes}} Likes</button>
          <button type="button" disabled>{{post.comments}} Comments</button>
          <span v-if="post.edited">(Edited)</span>
        </div>

        <div id="deleted" class="tab-pane fade deleted-posts-list" v-for="(post, index) in deleted_posts">
          <span class="icons-left-float">{{index+1}}</span>
           <h3 v-if="!deleted_posts">No post has been deleted yet</h3>
           <div v-if="!viewer">
             <i class="fa fa-undo icons-right-float">Undo</i>
          </div>
            <h4 class="titles">{{post.title}}</h4>
            <p>{{post.creationDate}}</p>
            <span>{{post.content}}</span> <br>
            <button type="button" disabled>{{post.likes}} Likes</button>
            <button type="button" disabled>{{post.comments}} Comments</button>
            <span v-if="post.edited">(Edited)</span>
        </div>
      </div>

  </div>
</template>

<script>
  export default {
    data(){
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
        viewer: {
          name: "",
          lastname: "",
          email: "",
          password: "",
          id: null,
          avatar: "",
          likedPostId: []
        },
        originalUserData: {
          name: "",
          lastname: "",
          email: "",
          password: "",
          avatar: "",
          likedPostId: []
        },
        posts: [],
        deleted_posts: [],
        drafted_posts: [],
        isProfileEditable: false,
      }
    },

    created: function() {
      this.user = this.$route.params.user;
      this.viewer = this.$route.params.viewer;

      if(this.user) {
        this.getUserProfile(this.user.id);
        this.getPosts(this.user.id);
        this.getDeletedPosts(this.user.id);
        this.getDraftedPosts(this.user.id);
        this.originalUserData = {
          name: this.user.name.slice(),
          lastname: this.user.lastname.slice(),
          email: this.user.email.slice(),
          password: this.user.password.slice(),
          avatar: this.user.avatar.slice(),
          likedPostId: [this.user.likedPostId]
        };
      }
      else if(!this.user && this.viewer) {
          this.user = this.$route.params.postUserId;
          this.getUserProfile(this.user);
          this.getPosts(this.user);
          this.getDeletedPosts(this.user);
          this.getDraftedPosts(this.user.id);
      }
      else if (!this.user) {
        this.user = JSON.parse(localStorage.getItem('userData'));
        if(this.user) {
          this.getPosts(this.user.id);
          this.getDeletedPosts(this.user.id);
          this.getDraftedPosts(this.user.id);
          this.originalUserData = {
            name: this.user.name.slice(),
            lastname: this.user.lastname.slice(),
            email: this.user.email.slice(),
            password: this.user.password.slice(),
            avatar: this.user.avatar.slice(),
            likedPostId: [this.user.likedPostId]
          };
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
          .then(res => this.posts = res.data.reverse())
          .catch(err => toastr.warning(err));
      },

      getDeletedPosts(userId) {
        axios.get(`deleted_posts?userId=${userId}&_limit=25`)
        .then(res => this.deleted_posts = res.data.reverse())
        .catch(err => toastr.error(err))
      },

      getDraftedPosts(userId) {
        axios.get(`drafted_posts?userId=${userId}`)
        .then(res => {
          this.drafted_posts = res.data;
        })
        .catch(err => toastr.error(err));
      },

      updateProfile(userData) {

        if(!this.user.name || !this.user.lastname || !this.user.email) {
          toastr.warning('Please make sure all fields are properly filled');
        }
        else if(confirm('Do you want to apply these changes?') == true) {
          axios.put(`users?id=${userData.id}`, userData)
           .then(res => {
             toastr.success('Profile updated');
             this.isProfileEditable = !this.isProfileEditable;
           })
           .catch(err => toastr.error(err));
        }
        else {
          this.cancelEdition();
        }
      },

      cancelEdition() {
        this.user.name = this.originalUserData.name;
        this.user.lastname = this.originalUserData.lastname;
        this.user.email = this.originalUserData.email;
        this.isProfileEditable = !this.isProfileEditable;
      },

      undoPostDeletion() {
       /* let date = new Date().toString();
         axios.post('posts', {
           title: this.newPost.title,
           content: this.newPost.content,
           commentsAllowed: this.newPost.commentsAllowed,
           likes: this.newPost.likes,
           comments: this.newPost.comments,
           creationDate: date.substr(8, 23),
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
        if(confirm('Are you sure about logging out?') == true) {
            localStorage.removeItem('userData');
            this.user = 0;
            toastr.success(`You've been logged out`);
            this.$router.replace('/');
        }
      }
    }
  }
</script>

<style media="screen">
</style>
