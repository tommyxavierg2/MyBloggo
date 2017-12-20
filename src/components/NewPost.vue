<template>
  <div>

    <ul id="navBar" class="list-inline align-left">
      <li><router-link class="navBarItems" to="/">Bloggo</router-link></li>
      <li><router-link v-if="user" class="navBarItems" :to="{name: 'newpost', params: {user: user}}">| New Post |</router-link></li>
      <li><router-link v-if="user" class="navBarItems" :to="{name: 'profile', params: {user: user}}">Profile</router-link></li>
     <li><button v-if="user" type="button" class="btn btn-primary icons-right-float" @click="logout">Logout</button></li>
    </ul>

    <h1>Create Post</h1>

    <form @submit.prevent="createPost">

      <div class="input-group">
        <span class="input-group-addon">Title:</span>
        <input placeholder="Title" v-model.trim="newPost.title" class="form-control" required></input>
      </div>
      <div class="input-group">
        <span class="input-group-addon">Content:</span>
        <textarea v-model.trim="newPost.content" rows="4" cols="40" class="form-control" required></textarea>
      </div>
      <div class="input-group">
        <span class="input-group-addon">
          <input type="checkbox" v-model="newPost.commentsAllowed"></input>
        </span>
        <input type="text" class="form-control" value="Allow comments?" readonly>
      </div>
      <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-danger btn-lg" @click="cancelPostCreation(newPost)">Cancel</button>
        <button type="button" class="btn btn-secondary btn-lg" @click="savePostDraft(newPost)">Save draft</button>
        <button type="submit" class="btn btn-primary btn-lg">Create Post</button>
      </div>

    </form>

  </div>
</template>

<script>

export default {
  name: 'newPostsView',
  data() {
    return {
      newPost: {
        avatar: "",
        comments: null,
        commentsAllowed: true,
        content: "",
        creationDate: "",
        edited: false,
        id: null,
        likes: null,
        title: "",
        userId: null,
        userName: ""
      },
      user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        id: null,
        avatar: "",
        likedPostId: []
      }
    }
  },

  created() {
    this.user = this.$route.params.user;
    if(!this.user) {
      toastr.warning('In order to perform any action you first need to log In');
      this.$router.replace('login');
    }
  },

  methods: {
    createPost() {
     let date = new Date().toString();
     axios.post('posts', {
       title: this.newPost.title,
       content: this.newPost.content,
       commentsAllowed: this.newPost.commentsAllowed,
       likes: this.newPost.likes,
       comments: this.newPost.comments,
       creationDate: date.substr(8, 16),
       userName: this.user.name + ' ' + this.user.lastname,
       userId: this.user.id,
       avatar: this.user.avatar,
       edited: false
     })
     .then(res => {
       this.clearData(this.newPost);
       toastr.success('Sucessfully posted');
       this.$router.replace('/');
     })
     .catch(err => toastr.error(err));
   },

   cancelPostCreation(postData) {
     if(confirm('Are you sure about canceling the post creation?') == true) {
       if(postData){
         this.clearData(postData);
         this.$router.replace('/');
       }
       else {
         this.$router.replace('/');
       }
     }
   },

   savePostDraft(postData) {
     axios.post('drafted_posts', postData)
     .then(res => {
       toastr.success('Post saved as draft');
       this.$router.replace('/');
     })
     .catch(err => toastr.error(err));
   },

   logout() {
     if(confirm('Are you sure about logging out?') == true) {
         localStorage.removeItem('userData');
         this.user = 0;
         toastr.success(`You've been logged out`);
         this.$router.replace('/');
     }
   },

   clearData(postData) {
     for (let key in postData) {
       postData[key] = '';
     }
   }
  }
}
</script>

<style lang="css">
</style>
