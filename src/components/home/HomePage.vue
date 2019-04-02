<template>
<div class="container">
  <!-- 轮播图区开始 -->
  <div class="swipe-container">
    <mt-swipe :auto="3000">
      <mt-swipe-item >
        <img src="/static/img/home/homePic1.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item >
        <img src="/static/img/home/homePic2.jpg" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
  <!-- 轮播图区结束 -->
  <!-- 提示区域 -->
  <div class="tips-container">
    <p>商品</p>
  </div>
  <p class="tips1">专家提醒：低氘水要长期饮用才能发挥作用</p>
  <p class="tips2">客服热线：0571-83819690</p>
  <!-- 提示区域开始 -->
  <!-- 产品区域开始 -->
  <div class="product-List" >
    <li class="product-card" @click="go(val.productId)" v-for="(val) in productList" :key="val.productId">
      <img :src="val.productInfo" alt="" class="pro-img">
      <p class="product-title">{{val.productName}}</p>
      <p class="product-price">{{'￥' + val.productPrice}}</p>
    </li>
  </div>
  <!-- 产品区域结束 -->
  <p class="tips3">温馨提示：本产品仅用于保健，不能代替任何药物</p>
</div>
</template>

<script>
export default {
  data () {
    return {
      productList: [] // 产品列表数据
    }
  },
  created: function () {
    this.initProductList()
  },
  methods: {
    // 进入产品详情页面
    go: function (productId) {
      this.$router.push({name: 'ProductDeatils', params: {productId: productId}})
    },
    // 获取产品列表数据
    initProductList: function () {
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
  }
}
</script>

<style scoped>
.container {
  background-color: #F8F8F8;
  overflow: auto;
}
/* 轮播图容器样式 */
.swipe-container {
  background: #fff;
  height: 13rem;
}
.swipe-container img {
  width: 100%;
}
/* 提示区域样式 */
.tips-container {
  line-height: 3rem;
  background: #fff;
  margin-top: 0.5rem;
  color: #26A2FF;
}
.tips1 {
  line-height: 2rem;
  font-size: 12px;
  color: red;
  padding: 0.5rem;
  padding-bottom: 0;
}
.tips2 {
  line-height: 1rem;
  font-size: 14px;
  color: red;
}
.tips3 {
  line-height: 1.8rem;
  font-size: 14px;
  color: #7C7C6C;
  padding-bottom: 4rem;
}
/*产品列表样式*/
.product-List {
  padding: 0 1.5% 1rem;
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
</style>
