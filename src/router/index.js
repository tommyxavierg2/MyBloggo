import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Register from '@/components/Register'
import MyPosts from '@/components/MyPosts'
import Profile from '@/components/Profile'
import Posts from '@/components/Posts'
import NewPost from '@/components/NewPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/MyPosts',
      name: 'MyPosts',
      component: MyPosts
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/Posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/NewPost',
      name: 'NewPost',
      component: NewPost
    }
  ]
})
