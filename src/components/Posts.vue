<template>
  <div id="postsView" class="">
    <div id="menu">
      <label class="menuItems">Posts</label> |
      <label class="menuItems">New Post</label> |
      <label class="menuItems">MyPosts</label> |
      <label class="menuItems">Settings</label>
    </div>
    <div class="middle">
      <h1 class="titles">Bloggo!, made for you.</h1>
      <h2>Recent posts</h2>
      <div id="postList" v-for="post in posts">
          <div class="row">
            <div class="col-xs-6">
              <p><strong>{{post.author}}</strong>{{post.creationDate}}</p>
              <img src="https://firebasestorage.googleapis.com/v0/b/todo-app-1feb3.appspot.com/o/%20H200i.jpg?alt=media&token=b2ad9168-0dad-4f1a-a83c-6ddce34cdeff" alt=""> <br>
            </div>
            <div class="col-xs-6 leftAlign">
              <h4 class="titles">{{post.title}}</h4>
              <button type="button">{{post.likes}}</button>
              <button type="button">{{post.comments}}</button>
              <button id="editedButton">{{post.edited}}</button>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        posts: [
                { title: 'Testing', author: 'Test Tester', creationDate: '10/12/17', content: 'Testing a test', comments: 0, likes: 0, edited: false },
                { title: 'Testing', author: 'Test Tester', creationDate: '10/12/17', content: 'Testing a test', comments: 0, likes: 0, edited: false }
              ]
    }
  }
}
</script>

<style lang="css">
  #postsView {
    text-align: center;
    align-items: center;
    padding: 5px;
  }

  #editedButton {
    border: none;
    background-color: transparent;
    outline: none;
  }

  #postList {
    width: 600px;
    border-top: 2px solid gray;
    border-left: 2px solid gray;
    border-right: 2px solid gray;
  }

  #menu {
    background-color: gray;
    height: 40px;
  }

  img {
    width: 300px;
    height: 150px;
    padding: 5px;
  }

  .middle {
    left: 20%;
    width: 80%;
  }

  .leftAlign {
    text-align: left;
  }

  .titles {
    font-weight: bold;
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
