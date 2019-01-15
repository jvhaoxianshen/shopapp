// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
// import MintUI from 'mint-ui'
import './assets/css/main.css'
import './assets/css/my-mint.scss'
import { Spinner, Swipe, SwipeItem, Button, Header, Tabbar, TabItem, TabContainer, TabContainerItem, Cell, Search } from 'mint-ui'

// 配置axios
import Qs from 'qs'
import axios from 'axios' // 导入axios
import VueAxios from 'vue-axios'
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
// Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
