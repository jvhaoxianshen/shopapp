<template>
  <div class="container">
    <!-- 头部导航栏开始 -->
    <mt-header title="商品详情" fixed>
      <mt-button icon="back" slot="left" @click="back"></mt-button>
      <mt-button class="shopcar-but" slot="right"></mt-button>
    </mt-header>
    <!-- 头部导航栏结束 -->
    <!-- 内容区区开始 -->
    <div class="container-mid">
      <div class="swipe-container">
        <mt-swipe :auto="3000">
          <mt-swipe-item v-for="(val) in productDetail.proPic" :key="val.picId">
            <img :src="val.pic" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
    <!-- 内容区结束 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      productDetail: {}
    }
  },
  created: function () {
    this.getProductDetail()
  },
  methods: {
    // 返回上一页事件
    back: function () {
      this.$router.back()
    },
    // 获取商品详情事件
    getProductDetail: function () {
      let data = {
        productId: this.$route.params.productId
      }
      this.axios.post('water/product/info', data)
        .then(res => {
          console.log(res.data)
          res.data[0].proPic.forEach((val, index) => {
            // var context = require.context('../../assets', true, /\.jpg$/) console.log(context.keys())
            res.data[0].proPic[index].pic = require('../../assets' + val.pic) // context(val.pic)
          })
          this.productDetail = res.data[0]
        })
    }
  }
}
</script>

<style scoped>
  /* 组件最外层容器样式 */
  .container {
    height: 100%;
  }
  /* 顶部导航栏购物按钮样式 */
  .shopcar-but {
    background: url(../../assets/icon/productDetail/shopcar.svg) no-repeat center center;
    width: 1.5rem;
    background-size: contain;
  }
  /* 产品介绍区容器样式 */
  .container-mid {
    height: 100%;
    margin-top: 40px;
    background-color: #F3F3F3;
  }
  /* 轮播图容器样式 */
  .swipe-container {
    height: 330px;
    background: #fff;
  }
  .swipe-container img {
    width: 90%;
  }
</style>
