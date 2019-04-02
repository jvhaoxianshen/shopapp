<template>
  <div class="container">
    <inputInfo v-if="show"></inputInfo>
    <!-- <container></container> -->
    <tabbar :selected="selected" :tabs="tabs"></tabbar>
  </div>
</template>

<script>
import tabbar from '../common/Tabbar'// 底部菜单切换区
import inputInfo from '../home/InputInfo'// 底部菜单切换区
export default {
  components: { tabbar, inputInfo },
  data () {
    return {
      selected: 'home', // 底部选中的菜单
      tabs: [require('../../assets/icon/tabbar/home-active.svg'),
        require('../../assets/icon/tabbar/product.svg'),
        require('../../assets/icon/tabbar/shopcar.svg'),
        require('../../assets/icon/tabbar/myinfo.svg')],
      show: false
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (oldVal.name === 'ShopCar' && val.name === 'Home') {
          this.$router.go(0)
        }
        if (val.path === '/app/myinfo' && oldVal.name === 'OrderList') {
          this.$router.go(0)
        }
      },
      // 深度观察监听
      deep: true
    },
    selected: function (val, oldVal) {
    }
  },
  created: function () {
    this.ifExist()
    if (this.$route.params.type.toString() === 'myinfo') {
      this.selected = 'myinfo'
      this.tabs = [require('../../assets/icon/tabbar/home.svg'),
        require('../../assets/icon/tabbar/product.svg'),
        require('../../assets/icon/tabbar/shopcar.svg'),
        require('../../assets/icon/tabbar/myinfo-active.svg')]
    } else if (this.$route.params.type.toString() === 'product') {
      this.selected = 'product'
      this.tabs = [require('../../assets/icon/tabbar/home.svg'),
        require('../../assets/icon/tabbar/product-active.svg'),
        require('../../assets/icon/tabbar/shopcar.svg'),
        require('../../assets/icon/tabbar/myinfo.svg')]
    } else if (this.$route.params.type.toString() === 'home') {
      this.selected = 'home'
      this.tabs = [require('../../assets/icon/tabbar/home-active.svg'),
        require('../../assets/icon/tabbar/product.svg'),
        require('../../assets/icon/tabbar/shopcar.svg'),
        require('../../assets/icon/tabbar/myinfo.svg')]
    }
  },
  methods: {
    ifExist: function () {
      let data = {
        custId: this.$store.getters.getOpenid
      }
      this.axios.post('water/user/selectNamePhone', data)
        .then(res => {
          if ((res.data[0].phoneNum === null || res.data[0].phoneNum === '') && (res.data[0].realName === null || res.data[0].realName === '')) {
            this.show = true
          }
        })
    }
  }
}
</script>

<style scoped>
</style>
