<template lang="html">
  <div id="newPostsView">
    <div id="menu">
      <label class="menuItems">Posts</label> |
      <label class="menuItems">New Post</label> |
      <label class="menuItems">MyPosts</label> |
      <label class="menuItems">Settings</label>
    </div>
    <h1>Create Post</h1>
    <div class="input-group">
      <span class="input-group-addon">Title:</span>
      <input placeholder="Title" class="form-control"></input>
    </div>
    <div>
      <span>Content:</span>
      <textarea></textarea>
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
export default {
}
</script>

<style lang="css">
  #newPostsView {
    text-align: center;
    align-items: center;
    padding: 5px;
  }

  #menu {
    background-color: gray;
    height: 40px;
  }

  .menuItems {
    font-size: x-large;
    font-weight: bold;
  }

  label:hover {
    color: white;
  }

  label:active {
    color: red;
  }

</style>
