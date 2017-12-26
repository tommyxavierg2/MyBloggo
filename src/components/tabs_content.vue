<template>
    <div :id="tab_id" class="tab-pane fade">
      <div v-for="(content, index) in tabs_content">
        <app-post :post="content" :index="index" :user="user"></app-post>
      </div>
    </div>

    </div>
</template>

<script>
  import post from './post.vue';

  export default {
    data() {
      return {

      }
    },
    props: ['tabs_content', 'user', 'tab_id'],
    components: {
      'app-post': post
    }
  }

</script>
