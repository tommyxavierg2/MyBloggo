import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import Posts from '@/components/Posts'
import NewPost from '@/components/NewPost'
import PostView from '@/components/PostView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/',
      name: 'posts',
      component: Posts
    },
    {
      path: '/newpost',
      name: 'newpost',
      component: NewPost
    },
    {
      path: '/postview',
      name: 'postview',
      component: PostView
    }
  ]
})
