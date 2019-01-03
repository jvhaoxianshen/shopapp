import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/nav/Home'
import ProductDeatils from '@/components/product/ProductDetails'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/ProductDeatils',
      name: 'ProductDeatils',
      component: ProductDeatils,
      meta: {
        keepAlive: true // 需要被缓存
      }
    }
  ]
})
