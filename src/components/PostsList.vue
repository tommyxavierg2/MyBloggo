<template>
  <div id="postsView">

      <h2 class="titles">Posts</h2>

      <h2 v-if="!posts">There are no post to show</h2>

      <div v-for="(post, index) in published_posts">
        <app-post :post="post" :index="index" :user="user"></app-post>
      </div>

  </div>

</template>

<script>
 import post from './post.vue';

export default {
  data() {
    return {
        user: {
          name: "",
          lastname: "",
          email: "",
          password: "",
          id: null,
          avatar: "",
          likedPostId: [],
          isUserLogged: false
        },
        posts: [],
        isUserPost: false
       }
  },

  components: {
    'app-post': post
  },

  created() {
    this.getUserData();
  },

  mounted() {
    this.getPosts();
  },

  computed: {
    published_posts() {
      return this.posts.filter(post => post.state.published);
    }
  },

  methods: {
    getPosts() {
      axios.get('posts?_limit=25')
        .then(res => {
          this.posts = res.data.reverse();
        })
        .catch(err => toastr.error(err));
    },

    getUserData() {
      let temporaryUserData = JSON.parse(localStorage.getItem('userData'));

      if(!temporaryUserData) {
          this.user = 0;
      } else {
         temporaryUserData.isUserLogged = true;
         this.user = temporaryUserData;
      }
    }
  }
}
</script>

<style lang="css">
</style>
