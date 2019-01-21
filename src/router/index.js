import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/nav/Home'
import ProductDeatils from '@/components/product/ProductDetails'
import ShopCar from '@/components/shopcar/ShopCar'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/dist',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/dist/:productId',
      name: 'ProductDeatils',
      component: ProductDeatils,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    {
      path: '/dist/',
      name: 'ShopCar',
      component: ShopCar,
      meta: {
        keepAlive: false // 需要被缓存
      }
    }
  ]
})
