<template>
  <div class="post-list container-fluid">

      <span class="icons-left-float">{{index+1}}</span>
        <i v-if="user.id == post.userId" class="fa fa-times icons-right-float" @click="deletePost(post, index)"></i>

        <div class="row">
          <div class="box titles">
            <router-link :to="{path: `postview/${post.id}`}">Posted on: {{post.creationDate}}</router-link> <br>
          </div>
          <div class="col-sm-3 col-md-6">
            <router-link :to="{name: 'profile', params: {postUserId: post.userId, viewer: user}}">
              <avatar :username="post.fullName" class="gravatar" :size="200"></avatar></router-link>
            <router-link class="user-name-router" :to="{name: 'profile', params: {postUserId: post.userId, viewer: user}}">
              <span class="titles">{{post.fullName}}</span></router-link>
          </div>
          <div class="col-sm-9 col-md-6">
            <router-link :to="{path: `postview/${post.id}`}">
              <h3 class="user-name-router titles">{{post.title}}</h3></router-link>
            <span readonly="!user.isUserLogged">{{content}}</span> <br>
            <button type="button" @click="addLike(index, post, user.likedPostId)" :disabled="!user.isUserLogged">Likes {{post.likes}}</button>
            <router-link class="user-name-router" :to="{path: `postview/${post.id}`}">Comments {{post.comments}}</router-link>
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
  props: [ 'post', 'index', 'user' ],
  computed: {
    content() {
      return this.post.content.substr(0, 200);
    }
  },
  methods: {
    addLike(index, post, userLikedPosts) {
        let postValidation = userLikedPosts.some(userPost => userPost == post.id);

        if(postValidation) {
            post.likes--;

            axios.put(`posts/${post.id}`, post)
              .then(res => {
                  let likedPostIndex = this.user.likedPostId.indexOf(post.id);
                  this.user.likedPostId.splice(likedPostIndex, 1);

                  axios.put(`users/${this.user.id}`, this.user)
                    .then(res => toastr.success('Post disliked'))
                    .catch(err => toastr.error(err));
              })
              .catch(err => toastr.error(err));
        }
        else {
          post.likes++;
          axios.put(`posts/${post.id}`, post)
          .then(res => {
              this.user.likedPostId.push(post.id);
              toastr.success('You liked the post');
              axios.put(`users/${this.user.id}`, this.user)
                .then().catch(err => toastr.error(err));
             })
          .catch(err => toastr.error(err));
       }
    },

    deletePost(post, index){
      if(confirm('Are you sure about deleting this post?') == true) {

          post.state.published = false;
          post.state.drafted = false;
          post.state.deleted = true;

          axios.put(`posts/${post.id}`, post)
            .then(res => {
                toastr.success('Post deleted');
            }).catch(err => toastr.error(err));
        }
    }
  }
}
</script>

<style lang="css">
</style>
