<template>
  <div>
    <!-- 内容容器区开始 -->
    <mt-tab-container v-model="message" style="padding-bottom: 3rem;" :swipeable="true">
      <mt-tab-container-item id="home">
        <mt-cell v-for="n in 20" title="tab-container 1" :key="n">{{n}}</mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="product">
        <mt-cell v-for="n in 5" title="tab-container 2" :key="n"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="shopcar">
        <mt-cell v-for="n in 7" title="tab-container 3" :key="n"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="myinfo">
        <mt-cell v-for="n in 2" title="tab-container 4" :key="n"></mt-cell>
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
export default {
  data () {
    return {
      message: this.selected,
      atabs: this.tabs,
      swipeable: true
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
          break
        case 'product':
          this.setTabbarIcon()
          this.tabs[1] = require('../../assets/icon/tabbar/product-active.svg')
          break
        case 'shopcar':
          this.setTabbarIcon()
          this.tabs[2] = require('../../assets/icon/tabbar/shopcar-active.svg')
          break
        case 'myinfo':
          this.setTabbarIcon()
          this.tabs[3] = require('../../assets/icon/tabbar/myinfo-active.svg')
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

<style>

</style>
