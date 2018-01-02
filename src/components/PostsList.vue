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

<<<<<<< HEAD
      <pagination :records="total" :per-page="20" @paginate="getPosts"></pagination>
=======
      <pagination :records="posts.length" :per-page="offset" @paginate="getPosts"></pagination>
>>>>>>> 7b47f181b01f65bab9c9e2b82d67552f3e788cb1

  </div>

</template>

<script>
 import post from './post.vue';
 import {Pagination} from 'vue-pagination-2';
 import VuePaginator from 'vuejs-paginator';

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
        page: 1,
<<<<<<< HEAD
        offset: 24,
        total: 25
=======
        offset: 24
>>>>>>> 7b47f181b01f65bab9c9e2b82d67552f3e788cb1
       }
  },

  components: {
    'app-post': post,
    'pagination': Pagination
  },

  created() {
    this.page = this.$route.params.id;
<<<<<<< HEAD
  },

  mounted() {
    this.getPosts(this.page);
    this.getUserData;
=======

    this.getPosts(this.page);
    this.getUserData();
>>>>>>> 7b47f181b01f65bab9c9e2b82d67552f3e788cb1
  },

  computed: {
    getUserData() {
      this.user = JSON.parse(localStorage.getItem('userData'));

      if(this.user) {
          this.user.isUserLogged = true;
      } else {
        this.user = 0;
      }
    }
  },

  methods: {
    getPosts(page) {
      axios.get(`posts?_sort=id&_order=desc&_page=${page}&state.published=true&_limit=25`)
        .then(res => {
<<<<<<< HEAD
            this.posts = res.data;
            this.total = parseInt(res.headers['x-total-count']);
            this.$router.push({path: `/${page}`, params: {id: page}});
        })
        .catch(err => toastr.error(err));
=======
            if(res.data.length < this.offset) {
              this.offset = 5;
              this.posts = res.data;
              this.$router.push({path: `/${page}`, params: {id: page}});
            }
            else {
              this.offset = 24;
              this.posts = res.data;
              this.$router.push({path: `/${page}`, params: {id: page}});
            }

            // let data = res.data;
            // data.forEach(val => {
            //     this.posts.push(val);
            // });
        })
        .catch(err => toastr.error(err));
    },

    getUserData() {
      this.user = JSON.parse(localStorage.getItem('userData'));

      if(this.user) {
          this.user.isUserLogged = true;
      }
>>>>>>> 7b47f181b01f65bab9c9e2b82d67552f3e788cb1
    }
  }
}
</script>

<style lang="css">
</style>
