<template>
  <div class="container">
    <!-- 内容容器区开始 -->
    <mt-tab-container v-model="message" class="container">
      <mt-tab-container-item id="home">
        <homePage></homePage>
      </mt-tab-container-item>
      <mt-tab-container-item id="product">
        <productList></productList>
      </mt-tab-container-item>
      <mt-tab-container-item id="shopcar">
      </mt-tab-container-item>
      <mt-tab-container-item id="myinfo">
        <myInfo></myInfo>
      </mt-tab-container-item>
    </mt-tab-container>
    <!-- 内容容器区结束 -->
    <!-- 底部导航栏区开始 -->
    <mt-tabbar v-model="message" fixed>
      <mt-tab-item id="home">
        <img slot="icon" :src="this.atabs[0]">
        首页
      </mt-tab-item>
      <mt-tab-item id="product">
        <img slot="icon" :src="this.atabs[1]">
        产品
      </mt-tab-item>
      <mt-tab-item id="shopcar">
        <img slot="icon" :src="this.atabs[2]">
         购物车
      </mt-tab-item>
      <mt-tab-item id="myinfo">
        <img slot="icon" :src="this.atabs[3]">
        我的资料
      </mt-tab-item>
    </mt-tabbar>
    <!-- 底部导航栏区结束 -->
  </div>
</template>

<script>
import homePage from '../home/HomePage'
import productList from '../product/ProductList'
import shopCar from '../shopcar/ShopCar'
import myInfo from '../myinfo/MyInfo'
export default {
  components: { homePage, productList, shopCar, myInfo },
  data () {
    return {
      message: this.selected, // 选中的页面
      atabs: this.tabs, // 选中的图标
      swipeable: true // 是否支持左右滑动标志
    }
  },
  props: {
    selected: String,
    tabs: Array
  },
  watch: {
    // 切换导航栏
    message: function (val, oldVal) {
      switch (val) {
        case 'home':
          this.setTabbarIcon()
          this.tabs[0] = require('../../assets/icon/tabbar/home-active.svg')
          this.$router.push({name: 'Home', params: {type: 'home'}})
          break
        case 'product':
          this.setTabbarIcon()
          this.tabs[1] = require('../../assets/icon/tabbar/product-active.svg')
          this.$router.push({name: 'Home', params: {type: 'product'}})
          break
        case 'shopcar':
          this.setTabbarIcon()
          this.tabs[2] = require('../../assets/icon/tabbar/shopcar-active.svg')
          this.$router.push({name: 'ShopCar', params: {type: 'shopCarTab'}})
          break
        case 'myinfo':
          this.setTabbarIcon()
          this.tabs[3] = require('../../assets/icon/tabbar/myinfo-active.svg')
          this.$router.push({name: 'Home', params: {type: 'myinfo'}})
          break
      }
    }
  },
  methods: {
    // 底部所有图标变成灰色
    setTabbarIcon: function () {
      this.tabs[0] = require('../../assets/icon/tabbar/home.svg')
      this.tabs[1] = require('../../assets/icon/tabbar/product.svg')
      this.tabs[2] = require('../../assets/icon/tabbar/shopcar.svg')
      this.tabs[3] = require('../../assets/icon/tabbar/myinfo.svg')
    }
  }
}
</script>

<style >
.mint-tab-container-wrap {
  height: 100%;
}
</style>
