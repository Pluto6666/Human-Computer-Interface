import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import SearchResult from '@/components/SearchResult'

Vue.use(Router)

export default new Router({
  routes: [
     {
        path: '/',
        redirect: '/index'
     },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
     {
      path: '/result',
      name: 'SearchResult',
      component: SearchResult
    },
  ]
})
