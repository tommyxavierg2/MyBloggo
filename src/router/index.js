import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Register from '@/components/Register'
import MyPosts from '@/components/MyPosts'
import Profile from '@/components/Profile'
import Posts from '@/components/Posts'
import NewPost from '@/components/NewPost'
import Settings from '@/components/Settings'

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
      path: '/myposts',
      name: 'myposts',
      component: MyPosts
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/newpost',
      name: 'newpost',
      component: NewPost
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
