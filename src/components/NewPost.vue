<template>
  <div id="newPostsView">
    <div id="menu">
      <router-link class="menuItems" to="posts">Posts</router-link> |
      <router-link class="menuItems" to="newpost">New Post</router-link> |
      <router-link class="menuItems" to="myposts">MyPosts</router-link> |
      <router-link class="menuItems" to="settings">Settings</router-link>
    </div>
    <h1>Create Post</h1>
    <div class="input-group">
      <span class="input-group-addon">Title:</span>
      <input placeholder="Title" class="form-control"></input>
    </div>
    <div>
      <span>Content:</span>
      <froala :tag="'textarea'" :config="config" v-model="model"></froala>
    </div>
    <div class="input-group">
      <span class="input-group-addon">
        <input type="checkbox"></input>
      </span>
      <input type="text" class="form-control" value="Allow comments?" readonly>
    </div>
    <div class="input-group">
      <span class="input-group-btn">
        <button type="button" class="btn btn-primary btn-block">Create Post</button>
      </span>
    </div>
  </div>
</template>

<script>
import VueFroala from 'vue-froala-wysiwyg';

export default {
  name: 'newPostsView',
  data() {
    return {
      config: {
        events: {
          'froalaEditor.initialized': function () {
           console.log('initialized')
         }
        }
      },
      model: 'Edit your content here!'
    }
  }
}
</script>

<style lang="css">
</style>
