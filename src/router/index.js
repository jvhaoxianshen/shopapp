import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/nav/Home'
import ProductDeatils from '@/components/product/ProductDetails' // 产品详情组件
import ShopCar from '@/components/shopcar/ShopCar' // 购物车组件
import UpdateUserInfo from '@/components/myinfo/UpdateUserInfo' // 个人信息组件
import AddressManager from '@/components/address/AddressManager' // 地址管理组件
import AddAddress from '@/components/address/AddAddress' // 新增地址组件
import UpdateAddress from '@/components/address/UpdateAddress' // 修改地址组件
import GenerateOrder from '@/components/order/GenerateOrder' // 生成订单组件
import CompleteOrder from '@/components/order/CompleteOrder' // 生成订单成功提示组件
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { // 主页
      path: '/dist/',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    { // 购物车路由
      path: '/dist/ShopCar/:type',
      name: 'ShopCar',
      component: ShopCar,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    { // 产品详情路由
      path: '/dist/ProductDeatils/:productId',
      name: 'ProductDeatils',
      component: ProductDeatils,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    { // 更新用户信息路由
      path: '/dist/UpdateUserInfo',
      name: 'UpdateUserInfo',
      component: UpdateUserInfo,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    { // 地址列表路由
      path: '/dist/Address/:typed',
      name: 'AddressManager',
      component: AddressManager,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    { // 新增地址列表路由
      path: '/dist/AddAddress',
      name: 'AddAddress',
      component: AddAddress,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    { // 修改地址列表路由
      path: '/dist/UpdateAddress/:addressId',
      name: 'UpdateAddress',
      component: UpdateAddress,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    {// 生成订单路由
      path: '/dist/GenerateOrder/:orderType',
      name: 'GenerateOrder',
      component: GenerateOrder,
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    {// 生成订单完成
      path: '/dist/CompleteOrder',
      name: 'CompleteOrder',
      component: CompleteOrder,
      meta: {
        keepAlive: false // 需要被缓存
      }
    }
  ]
})
