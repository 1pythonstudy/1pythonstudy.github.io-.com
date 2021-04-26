import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Ranking_List from '../views/Ranking_List.vue'
import play_list from '../views/play_list.vue'
import radio from '../views/radio.vue'
import my from '../views/my.vue'
import download from '../views/download.vue'
import search from '../views/search.vue'
import List from '../components/List.vue'
import personality from '../components/personality.vue'
import seting from '../components/seting.vue'
import login from '../components/login.vue'
import register from '../components/register.vue'
import forget from '../components/forget.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      component: register,
      meta:{
        isLogin: false
      }
    },
    {
      path: '/login',
      component: login,
      meta:{
        isLogin: false
      }
    },
    {
      path: '/',
      component: play_list
    },
    {
      path: '/list',
      component: Ranking_List
    },
    {
      path: '/play',
      component: play_list,
    },
    {
      path: '/my',
      component: my,
      name:'my',
      meta:{
        isLogin: true,
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/search',
      component: search,
      name:'search'
    },
    {
      path: '/radio',
      component: radio
    },
    {
      path: '/download',
      component: download,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/tolist/:id/:type',
      component: List
    },
    {
      path: '/personality/:id',
      component: personality,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/seting/:id',
      component: seting
    },
    {
      path: '/forget',
      component: forget
    }
  ]
})


