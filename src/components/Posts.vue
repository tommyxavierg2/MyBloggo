<template>
  <div id="postsView">

      <h2 class="titles">Posts</h2>

      <div v-for="(post, index) in published_posts">
        <app-post :post="post" :index="index" :isUserLogged="isUserLogged" :user="user"></app-post>
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
          likedPostId: []
        },
        posts: [],
        isUserLogged: false,
        isUserPost: false,
        postValidation: null
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
      return this.posts.filter(post => post.state.published == true);
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
      this.user = JSON.parse(localStorage.getItem('userData'));
      if(!this.user) {
        this.user = 0;
      } else {
        this.isUserLogged = true;
      }
    },

    // logout() {
    //   if(confirm('Are you sure about logging out?') == true) {
    //       localStorage.removeItem('userData');
    //       this.user = 0;
    //       toastr.success(`You've been logged out`);
    //       this.$router.replace('/');
    //   }
    // },
    //
    // goToRegister() {
    //   this.$router.replace('register');
    // },
    //
    // goToLogin() {
    //   this.$router.replace('login');
    // }
  }
}
</script>

<style lang="css">
</style>
