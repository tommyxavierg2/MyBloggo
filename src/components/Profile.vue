<template>
  <div id="profileView">

    <h1 class="jumbotron titles">Profile</h1>

    <div v-if="user">
      <h3>User information</h3>

        <div class="post-view">
          <avatar :username="fullName" class="gravatar" :size="100"></avatar><br>
          <label>Name:</label>
          <span>{{user.name}} {{user.lastname}}</span> <br>
          <label>Email:</label>
          <span>{{user.email}}</span>
        </div>

    </div>

      <h3>Posts</h3>

      <app-tab :tabs="tabsInfo.tabs" :tabs_content="published_posts" :user="user">
        <app-tab-content :tabs_content="published_posts" tab_id="published" :user="user"></app-tab-content>
        <app-tab-content :tabs_content="drafted_posts" tab_id="drafted" :user="user"></app-tab-content>
        <app-tab-content :tabs_content="deleted_posts" tab_id="deleted" :user="user"></app-tab-content>
      </app-tab>

  </div>
</template>

<script>
  import post from './post.vue';
  import tabs from './tabs.vue';
  import tabs_content from './tabs_content.vue';

  export default {
    data(){
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
        viewer: {
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
        tabsInfo: [],
        postUserId: 0
      }
    },

    components: {
      'app-post': post,
      'app-tab': tabs,
      'app-tab-content': tabs_content
    },

    created() {
      this.user = JSON.parse(localStorage.getItem('userData'));
      this.viewer = this.$route.params.viewer;
      this.postUserId = this.$route.params.postUserId;

      this.tabsInfo = {
        tabs: [
          {name: 'Published', ref: '#published'},
          {name: 'Drafted', ref: '#drafted' },
          {name: 'Deleted', ref: '#deleted' }
        ]
      }
    },

    mounted() {
      this.init();
    },

    computed: {
      published_posts() {
        return this.posts.filter(post => post.state.published);
      },

      deleted_posts() {
        return this.posts.filter(post => post.state.deleted);
      },

      drafted_posts() {
        return this.posts.filter(post => post.state.drafted);
      },

      fullName() {
        return `${this.user.name} ${this.user.lastname}`;
      }
    },

    methods: {
      init(){
        if(this.postUserId && this.viewer) {
            this.getUserProfile(this.postUserId);
            this.getPosts(this.postUserId);
        }
        else if(this.user && !this.viewer) {
            this.getUserProfile(this.user.id);
            this.getPosts(this.user.id);
        }
        else {
          toastr.warning('In order to see other users information you firstn need to log in');
          this.$router.replace('login');
        }
      },

      getUserProfile(userId) {
        axios.get(`users?id=${userId}`)
        .then(res => {
          this.user = res.data[0];
          if(!this.viewer) {
            this.user.fullName = this.fullName;
            this.user.isUserLogged = true;
          }
        })
      },

      getPosts(userId) {
        axios.get(`posts?userId=${userId}&_limit=25`)
          .then(res => {
            this.posts = res.data;
          })
          .catch(err => toastr.warning(err));
      },

      deletePost(post, index) {
        if(confirm('Are you sure about deleting this post?') == true) {

            let currentPost = this.posts.find(res => res.id == post.id);

            currentPost.state.drafted = false;
            currentPost.state.deleted = true;
            currentPost.state.published = false;

            axios.put(`posts/${currentPost.id}`, currentPost)
              .then(res => {
                  this.posts.splice(currentPost.id, 1);
                  toastr.success('Post deleted');
              }).catch(err => toastr.error(err));
          }
      },

      logout() {
        if(confirm('Are you sure about logging out?') == true) {

            localStorage.removeItem('userData');
            this.user = 0;
            toastr.success(`You've been logged out`);
            this.$router.replace('/1');

        }
      }
    }
  }
</script>

<style media="screen">
</style>
