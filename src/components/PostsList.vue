<template>
  <div id="postsView">

      <h1 class="jumbotron titles">Posts</h1>

      <h2 v-if="!posts">There are no post to show</h2>

      <!-- <div class="align-right box">
        <h3 class="box align-left">Search</h3>
        <div class="input-group" id="searchBox">
            <input type="text" class="form-control" placeholder="Search">
            <span class="input-group-addon">
              <i class="fa fa-search"></i>
            </span>
        </div>
      </div> -->

      <div v-for="(post, index) in posts">
        <app-post :post="post" :index="index" :user="user"></app-post>
      </div>

      <pagination :records="posts.length" :per-page="20" @paginate="getPaginationPosts"></pagination>

  </div>

</template>

<script>
 import post from './post.vue';
 import {Pagination} from 'vue-pagination-2';

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
        posts: [],
        isUserPost: false,
        page: 1
       }
  },

  components: {
    'app-post': post,
    'pagination': Pagination
  },

  created() {
    this.getUserData();
  },

  mounted() {
    this.getPosts();
  },

  computed: {
    published_posts() {
      return this.posts;
    }
  },

  methods: {
    getPosts() {
      axios.get(`posts?_sort=id&_order=desc&_page=${this.page}&state.published=true&_limit=25`)
        .then(res => {
          this.posts = res.data;
          this.page++;
        })
        .catch(err => toastr.error(err));
    },

    getPaginationPosts() {

      axios.get(`posts?_sort=views&_order=desc&_page=${this.page}&_limit=25&state.published=true`)
        .then(res => {
          let data = res.data;

          if(data) {
            data.forEach(val => {
                this.posts.push(val);
            });
            this.page++;
          }
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
