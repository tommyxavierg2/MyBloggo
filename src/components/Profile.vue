<template>
  <div class="">
    <h1>MyProfile</h1>
    <div class="">
      <h1>Profile image</h1>
      <img src="" alt="">
    </div>
    <div class="">
      <h1>User Information</h1>
      <div class="input-group">
        <label>Username:</label>
        <label></label>
      </div>
      <div class="input-group">
        <label>Password:</label>
        <input type="password" placeholder="Password" v-model='password'></input>
      </div>
      <div>
        <button type="button" @click="test">Enter</button>
      </div>
    </div>
    <div class="">
      <h1>User posts</h1>
    </div>
  </div>
</template>

<script>
  var userData = {
    name: '',
    email: '',
    avatar: '',
    type: '' //Public ? Private
  }

  export default {
    data() {
      return userData
    }

  }
</script>

<style lang="css">
</style>
