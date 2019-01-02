<template>
  <div>
    <mt-tabbar v-model="message">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: this.selected,
      atabs: this.tabs
    }
  },
  props: {
    selected: String,
    tabs: Array
  },
  watch: {
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
