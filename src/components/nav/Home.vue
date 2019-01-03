<template>
  <div class="container">
    <!-- <container></container> -->
    <tabbar :selected="selected" :tabs="tabs"></tabbar>
  </div>
</template>

<script>
import tabbar from '../common/Tabbar'// 底部菜单切换区
export default {
  components: { tabbar },
  data () {
    return {
      selected: 'home', // 底部选中的菜单
      tabs: [require('../../assets/icon/tabbar/home-active.svg'),
        require('../../assets/icon/tabbar/product.svg'),
        require('../../assets/icon/tabbar/shopcar.svg'),
        require('../../assets/icon/tabbar/myinfo.svg')]
    }
  }
}
</script>

<style scoped>
</style>
