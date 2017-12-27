import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/components/Login';
import Register from '@/components/Register';
import Profile from '@/components/Profile';
import PostsList from '@/components/PostsList';
import NewPost from '@/components/NewPost';
import PostView from '@/components/PostView';
import Settings from '@/components/Settings';

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
      component: Profile,
      meta: { requiresAuth: true},
      beforeEnter: (to, from, next) => {
        if(to.meta.requiresAuth) {
          let authUser = JSON.parse(localStorage.getItem('userData'));
          if(authUser) {
            next()
          }
          else {
            toastr.warning('In order to perform any action you first need to log In');
            next({name: 'login'})
          }
        }
      }
    },
    {
      path: '/',
      name: 'postslist',
      component: PostsList
    },
    {
      path: '/newpost',
      name: 'newpost',
      component: NewPost,
      meta: { requiresAuth: true},
      beforeEnter: (to, from, next) => {
        if(to.meta.requiresAuth) {
          let authUser = JSON.parse(localStorage.getItem('userData'));
          if(authUser) {
            next()
          }
          else {
            toastr.warning('In order to perform any action you first need to log In');
            next({name: 'login'})
          }
        }
      }
    },
    {
      path: '/postview/:id',
      name: 'postview/:id',
      component: PostView
    },
    {
      path: '/settings',
      name: '/settings',
      component: Settings,
      meta: { requiresAuth: true},
      beforeEnter: (to, from, next) => {
        if(to.meta.requiresAuth) {
          let authUser = JSON.parse(localStorage.getItem('userData'));
          if(authUser) {
            next()
          }
          else {
            toastr.warning('In order to perform any action you first need to log In');
            next({name: 'login'})
          }
        }
      }
    }
  ]

})
