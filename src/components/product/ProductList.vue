<template>
  <div class="product-container container" ref="mid">
    <form action="" v-on:submit.prevent="">
      <mt-search
        v-model="searchValue"
        cancel-text="取消"
        @keyup.enter.native="search"
        placeholder="搜索" autofocus>
      </mt-search>
    </form>
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
      productList: [], // 产品列表数据
      scrollTop: ''
    }
  },
  created: function () {
    this.getProductList()
  },
  methods: {
    // 进入产品详情页面
    go: function (productId) {
      this.$nextTick(() => {
        // 进入之前页面记录滚动条位置
        this.scrollTop = this.$refs.mid.scrollTop
      })
      this.$router.push({name: 'ProductDeatils', params: {productId: productId}})
    },
    // 获取产品列表数据
    getProductList: function () {
      this.axios.post('water/product/list')
        .then(res => {
          res.data.forEach((val, index) => {
            // res.data[index].productInfo = require('../../assets' + val.productInfo)
            res.data[index].productInfo = '/static' + val.productInfo
          })
          this.productList = res.data
        })
        .catch(() => {
          this.$toast('网络开小差了')
        })
    }
  },
  watch: {
    $route (to, from) {
      // 从其他页面进入该页面滚动条返回之前位置
      if (from.name === 'ProductDeatils') {
        this.$nextTick(() => {
          this.$refs.mid.scrollTop = this.scrollTop
        })
      }
    }
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
    z-index: 999;
  }
   /*产品列表样式*/
  .product-List {
    padding: 3rem 1.5% 4rem;
    overflow: auto;
  }
  /*产品卡片样式*/
  .product-card {
    width: 47%;
    height: 14rem;
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
