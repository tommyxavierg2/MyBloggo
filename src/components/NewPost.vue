<template>
  <div>

    <h1 class="jumbotron titles">Create Post</h1>

    <div v-if="newPost.title || newPost.content" class="post-view">
      <h3>Preview</h3>
      <avatar :username="user.fullName" class="gravatar" :size="100"></avatar> <br>
      <span class="titles">{{user.name}} {{user.lastname}}</span>
      <span class="titles"></span>
      <h4 class="titles">{{newPost.title}}</h4>
      <span class="inline-display">Created at: {{newPost.creationDate}}</span>
      <span class="inline-display">Published on: {{newPost.publicationDate}}</span>
      <div class="post-view-content">
        <span readonly>{{newPost.content}}</span>
      </div>
    </div>

    <form @submit.prevent="createPost">

      <div class="input-group">
        <span class="input-group-addon">Title:</span>
        <input placeholder="Title" v-model.trim="newPost.title" class="form-control" required></input>
      </div>
      <div class="input-group">
        <span class="input-group-addon">Content:</span>
        <textarea v-model.trim="newPost.content" rows="4" cols="40" class="form-control" required placeholder="Here enter the post content"></textarea>
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
        comments: 0,
        commentsAllowed: true,
        content: "",
        creationDate: "",
        publicationDate: "",
        edited: false,
        id: null,
        likes: 0,
        title: "",
        userId: null,
        fullName: "",
        state: {
          published: false,
          drafted: false,
          deleted: false
        }
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
    this.user = JSON.parse(localStorage.getItem('userData'));
    if(!this.user) {
      toastr.warning('In order to perform any action you first need to log In');
      this.$router.replace('login');
    }
  },

  methods: {
    createPost() {
     let date = new Date().toString();
     this.newPost.state.published = true;
     this.newPost.creationDate = date.substr(8,16);
     this.newPost.publicationDate = date.substr(8,16);
     this.newPost.fullName = this.user.name + ' ' + this.user.lastname;
     this.newPost.userId = this.user.id;

     axios.post('posts', this.newPost)
     .then(res => {
       this.clearData(this.newPost);
       toastr.success('Sucessfully posted');
       this.$router.replace('/1');
     })
     .catch(err => toastr.error(err));
   },

   cancelPostCreation(postData) {
     if(confirm('Are you sure about canceling the post creation?') == true) {
       if(postData){
         this.clearData(postData);
         this.$router.replace('/1');
       }
       else {
         this.$router.replace('/1');
       }
     }
   },

   savePostDraft(postData) {
     let date = new Date().toString();
     postData.state.drafted = true;
     this.newPost.creationDate = date.substr(8,16);
     postData.userName = this.user.name + ' ' + this.user.lastname;
     postData.userId = this.user.id;
     postData.avatar = this.user.avatar;

     axios.post('posts', postData)
     .then(res => {
       toastr.success('Post saved as draft');
       this.$router.replace('/1');
     })
     .catch(err => toastr.error(err));
   },

   logout() {
     if(confirm('Are you sure about logging out?') == true) {
         localStorage.removeItem('userData');
         this.user = 0;
         toastr.success(`You've been logged out`);
         this.$router.replace('/1');
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
