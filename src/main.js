// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
// import MintUI from 'mint-ui'
import './assets/css/main.css'
import './assets/css/my-mint.scss'
import { Checklist, Toast, Spinner, Swipe, SwipeItem, Button, Header, Tabbar, TabItem, TabContainer, TabContainerItem, Cell, Search } from 'mint-ui'
// 配置axios
import Qs from 'qs'
import axios from 'axios' // 导入axios
import VueAxios from 'vue-axios'
import Vuex from 'vuex' // 导入vuex包

var axiosInstance = axios.create({
  // baseURL: 'http://192.168.0.33:8088/shopApp-WXPage/', // 开发环境
  // baseURL: 'http://120.26.209.236:80/shopApp-WXPage/', //生产环境
  baseURL: 'http://localhost:8088/shopApp-WXPage/', // 开发环境
  transformRequest: [function (data) {
    data = Qs.stringify(data)
    return data
  }],
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
Vue.use(VueAxios, axiosInstance)
axios.defaults.timeout = 10000 // 超时时间

Vue.config.productionTip = false
Vue.component(Tabbar.name, Tabbar) // 底部导航菜单组件
Vue.component(TabItem.name, TabItem) // 底部导航菜单组件
Vue.component(TabContainer.name, TabContainer) // 页面容器样式
Vue.component(TabContainerItem.name, TabContainerItem) // 页面容器样式
Vue.component(Cell.name, Cell)
Vue.component(Search.name, Search) // 搜索框组件
Vue.component(Header.name, Header) // 顶部组件
Vue.component(Button.name, Button) // 按钮组件
Vue.component(Swipe.name, Swipe) // 轮播图样式
Vue.component(SwipeItem.name, SwipeItem) // 轮播图样式
Vue.component(Spinner.name, Spinner) // 加载样式
Vue.prototype.$toast = Toast // 提示框样式
Vue.component(Checklist.name, Checklist) // 选择框样式
// Vue.use(MintUI)
/* eslint-disable no-new */
Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    openid: 'o5exH1Byk1cPaCPQ0UZAKfTkA1Co', // 用户id
    shopCarProduct: [], // 购物车商品数据
    totalMoney: 0, // 总计金额
    allSelected: false // 全选状态
  },
  mutations: {
    // this.$store.commit('方法名称','按需传参数')
    // 点击加入购物车
    addToCar (state, productInfo) {
    },
    // 初始化购物车数据
    initializeShopCarProduct (state, data) {
      state.shopCarProduct = data
    },
    // 改变选中状态
    changeSelected (state, index) {
      state.shopCarProduct[index].selected = !state.shopCarProduct[index].selected
    },
    // 改变全选状态
    changeAllSelected (state) {
      state.allSelected = !state.allSelected
      var productObj
      state.shopCarProduct.forEach((val, index) => {
        if (state.allSelected) {
          productObj = {}
          state.shopCarProduct[index] = null
          productObj.buyNum = val.buyNum
          productObj.addDate = val.addDate
          productObj.custId = val.custId
          productObj.product = val.product
          productObj.productId = val.productId
          productObj.shopCarId = val.shopCarId + '*true'
          productObj.selected = state.allSelected
          Vue.set(state.shopCarProduct, index, productObj)
        } else {
          productObj = {}
          state.shopCarProduct[index] = null
          productObj.buyNum = val.buyNum
          productObj.addDate = val.addDate
          productObj.custId = val.custId
          productObj.product = val.product
          productObj.productId = val.productId
          productObj.shopCarId = val.shopCarId + '*false'
          productObj.selected = state.allSelected
          Vue.set(state.shopCarProduct, index, productObj)
        }
      })
    }
  },
  getters: {
    getOpenid: function (state) {
      return state.openid
    },
    getselected: (state) => (index) => {
      // 获取当前商品选中状态
      return state.shopCarProduct[index].selected
    },
    getTotalMoney: (state) => {
      // 获取选中商品总计
      state.totalMoney = 0
      state.shopCarProduct.forEach((val, index) => {
        if (val.selected) {
          state.totalMoney += parseInt(val.product.productPrice) * parseInt(val.buyNum)
        }
      })
      return state.totalMoney
    },
    getAllSelected: (state) => {
      // 获取当前商品选中状态
      return state.allSelected
    }
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: store
})
