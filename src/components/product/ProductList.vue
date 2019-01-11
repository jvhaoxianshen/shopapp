<template>
  <div class="product-container container" ref="mid">
    <mt-search
      v-model="searchValue"
      cancel-text="取消"
      placeholder="搜索">
    </mt-search>
    <div class="product-List" >
      <li class="product-card" @click="go(val.productId)" v-for="(val) in productList" :key="val.productId">
        <img :src="val.productInfo" alt="" class="pro-img">
        <p class="product-title">{{val.productName}}</p>
        <p class="product-price">{{'￥' + val.productPrice}}</p>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchValue: '', // 搜索内容
      productList: [] // 产品列表数据
    }
  },
  created: function () {
    this.getProductList()
  },
  methods: {
    // 进入产品详情页面
    go: function (productId) {
      this.$nextTick(function () {
        console.log(this.$refs.mid.scrollTop)
      })
      // this.$router.push({name: 'ProductDeatils', params: {productId: productId}})
    },
    // 获取产品列表数据
    getProductList: function () {
      this.$nextTick(function () {
        console.log(this.$refs.mid.scrollTop)
      })
      this.axios.post('water/product/list')
        .then(res => {
          res.data.forEach((val, index) => {
            console.log('../../assets' + val.productInfo)
            res.data[index].productInfo = require('../../assets' + val.productInfo)
          })
          this.productList = res.data
        })
    }
  },
  // 在页面离开时记录滚动位置
  beforeRouteLeave (to, from, next) {
    this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    console.log(this.scrollTop)
    // next()
  },
  // 进入该页面时，用之前保存的滚动位置赋值
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log(this.scrollTop)
      document.body.scrollTop = vm.scrollTop
    })
  }
}
</script>

<style scoped>
  .product-container {
    overflow: auto;
    background-color: #f3f3f3;
  }
  /*搜索区域*/
  .mint-search {
    height: 3rem;
    position: fixed;
    width: 100%;
  }
   /*产品列表样式*/
  .product-List {
    padding: 3rem 1.5% 4rem;
    overflow: auto;
  }
  /*产品卡片样式*/
  .product-card {
    width: 47%;
    height: 12.5rem;
    float: left;
    margin: 0.6rem 1.5% 0;
    background: #FFFFFF;
    border-radius: 8px;
    padding-top: 0.5rem;
  }
  /*产品卡片样式*/
  .pro-img {
    width: 78%;
  }
  /* 产品标题样式 */
  .product-title {
    font-size: 12px;
    margin: 0;
    padding: 0 0.8rem;
  }
  /* 产品价格样式 */
  .product-price {
    color: #E9373F;
    text-align: left;
    padding: 0 0.8rem;
  }
  .mint-swipe-indicator.is-active {
    background: #CCCCCC;
  }
</style>
