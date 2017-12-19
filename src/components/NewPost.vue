<template>
  <div>
    <ul id="navBar" class="list-inline">
      <li><router-link class="navBarItems" to="/">Posts</router-link></li>
      <li><router-link v-if="user" class="navBarItems" :to="{name: 'newpost', params: {user: user}}">| New Post |</router-link></li>
      <li><router-link v-if="user" class="navBarItems" :to="{name: 'profile', params: {user: user}}">Profile</router-link></li>
     <li><button v-if="user" type="button" class="btn btn-primary icons-right-float" @click="logout">Logout</button></li>
    </ul>
    <h1>Create Post</h1>
    <div class="input-group">
      <span class="input-group-addon">Title:</span>
      <input placeholder="Title" v-model="newPost.title" class="form-control"></input>
    </div>
    <div class="input-group">
      <span class="input-group-addon">Content:</span>
      <textarea v-model="newPost.content" rows="4" cols="40" class="form-control"></textarea>
    </div>
    <div class="input-group">
      <span class="input-group-addon">
        <input type="checkbox" v-model="newPost.commentsAllowed"></input>
      </span>
      <input type="text" class="form-control" value="Allow comments?" readonly>
    </div>
    <div class="input-group">
      <span class="input-group-btn">
        <button type="button" class="btn btn-primary btn-block" @click="createPost">Create Post</button>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'newPostsView',
  data() {
    return {
      newPost: { title: '', content: '', commentsAllowed: true, likes: 0, comments: 0, avatar: ''},
      user: {},
      config: {
        events: {
          'froalaEditor.initialized': function () {
           console.log('initialized')
         }
        }
      },
      model: 'Edit your content here!'
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
       createdAt: date.substr(8, 23),
       userName: this.user.name + ' ' + this.user.lastname,
       userId: this.user.id,
       avatar: "https://firebasestorage.googleapis.com/v0/b/todo-app-1feb3.appspot.com/o/default.png?alt=media&token=b1c8a2a0-3f31-4f33-ad89-e57bead0bc0d",
       edited: false
     })
     .then(res => {
       this.newPost.title = '';
       this.newPost.content = '';
       this.newPost.commentsAllowed = '';
       toastr.success('Sucessfully posted');
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
   }
  }
}
</script>

<style lang="css">
</style>
