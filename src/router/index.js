import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home'
import Search from '@/components/search'
import RadioList from '@/components/radiolist'
import RadioInfo from '@/components/radioinfo'
import Player from '@/components/player'
import Scroll from '@/components/common/scroll'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: "/home"
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/radiolist',
      name: 'radioList',
      component: RadioList
    },
    {
      path: '/radioInfo',
      name: 'radioInfo',
      component: RadioInfo
    },
    {
      path: '/player/:songid',
      name: 'player',
      component: Player,
      props: true
    },
    {
      path: '/scroll',
      name: 'scroll',
      component: Scroll,
      props: true
    },
  ]
})
