<template>
  <div class="container">
    <!-- 加载样式开始 -->
    <transition name="slide-fade">
      <loadingPage v-if="loaderShow"></loadingPage>
    </transition>
    <!-- 加载样式结束 -->
    <!-- 选择商品数量样式开始 -->
    <transition name="gradual">
      <maskLayer  v-if="setNumShow"></maskLayer>
    </transition>
    <transition name="slide-fade">
      <seclectProductNum  v-if="setNumShow" :setNumShow="setNumShow" :productDetail="productDetail" @toClose="closeSetNumWindow"></seclectProductNum>
    </transition>
    <!-- 选择商品数量样式结束 -->
    <!-- 头部导航栏开始 -->
    <mt-header title="商品详情" fixed>
      <mt-button icon="back" slot="left" @click="back"></mt-button>
      <mt-button class="shopcar-but" slot="right"></mt-button>
    </mt-header>
    <!-- 头部导航栏结束 -->
    <!-- 内容区区开始 -->
    <div class="container-mid">
      <!-- 轮播图区开始 -->
      <div class="swipe-container">
        <mt-swipe :auto="3000">
          <mt-swipe-item v-for="(val) in productDetail.proPic" :key="val.picId">
            <img :src="val.pic" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <!-- 轮播图区结束 -->
      <!-- 产品标题区开始 -->
      <div class="product-title">
        <p class="product-name-container">
          <span class="product-ziyinflag">自营</span>
          <span class="product-name" v-cloak>{{productDetail.productName}}</span>
        </p>
        <p class="product-price" v-cloak>{{'￥' + productDetail.productPrice}}</p>
        <p class="product-info">
          <span>邮费：0</span>
          <span v-cloak>{{'库存：' + productDetail.productNum}}</span>
          <span>出产地：浙江杭州</span>
        </p>
      </div>
      <!-- 产品标题区结束 -->
      <!-- 产品介绍区一开始 -->
      <div class="product-introduction-one">
        <li>
          <img src="../../assets/icon/productDetail/yanfa.svg" alt="">
          <p>权威研发</p>
        </li>
        <li>
          <img src="../../assets/icon/productDetail/jianyan.svg" alt="">
          <p>层层检测</p>
        </li>
        <li>
          <img src="../../assets/icon/productDetail/qvdao.svg" alt="">
          <p>唯一渠道</p>
        </li>
        <li>
          <img src="../../assets/icon/productDetail/pinzhi.svg" alt="">
          <p>品质保证</p>
        </li>
      </div>
      <!-- 产品介绍区一结束 -->
      <!-- 产品介绍区二开始 -->
      <div class="product-introduction-two">
        <img src="../../assets/img/productIntroduction/ddw_jiesao.jpg" alt="">
      </div>
      <!-- 产品介绍区二结束 -->
    </div>
    <!-- 内容区结束 -->
    <!-- 底部按钮开始 -->
    <div class="footer-container">
      <li class="footer-kefu">
        <img src="../../assets/icon/productDetail/kefu.svg" alt="">
        <p>客服</p>
      </li>
      <li  class="footer-addshopcar" @click="addShopcar">加入购物车</li>
      <li class="footer-buy"  @click="buyNow">立即购买</li>
    </div>
    <!-- 底部按钮结束 -->
  </div>
</template>

<script>
import loadingPage from '../common/LoadingPage' // 加载样式
import seclectProductNum from './SeclectProductNum' // 选择商品数量样式
import maskLayer from './MaskLayer' // 遮罩层
export default {
  components: {loadingPage, seclectProductNum, maskLayer},
  data () {
    return {
      productDetail: {}, // 商品数据
      loaderShow: true, // 加载样式
      setNumShow: false // 点击加入购物或立即购买弹出选择数量样式
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
          res.data[0].proPic.forEach((val, index) => {
            // var context = require.context('../../assets', true, /\.jpg$/) console.log(context.keys())
            res.data[0].proPic[index].pic = require('../../assets' + val.pic) // context(val.pic)
          })
          this.productDetail = res.data[0]
          setTimeout(() => {
            this.loaderShow = false
          }, 500)
        })
    },
    // 加入购物车事件
    addShopcar: function () {
      this.openSetNumWindow()
    },
    // 立即购买事件
    buyNow: function () {
      this.openSetNumWindow()
    },
    // 关闭数量设置框样式
    closeSetNumWindow: function () {
      this.setNumShow = false
    },
    // 打开数量设置框
    openSetNumWindow: function () {
      this.setNumShow = true
    }
  }
}
</script>

<style scoped>
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(700px);
    opacity: 0;
  }
  /* 颜色渐变动画 */
  .gradual-enter-active, .gradual-leave-active {
    transition: opacity .8s;
  }
  .gradual-enter, .gradual-leave-to {
    opacity: 0;
  }
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
    padding-top: 40px;
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
  /* 产品标题区样式（包含产品价格，邮费，出产地等） */
  .product-title {
    width: 100%;
    height: 9rem;
    background-color: #FFFFFF;
    margin-top: 0.8rem;
    padding: 1.6rem 1rem;
  }
  .product-name-container {
    text-align: left
  }
  /* 自营标识样式 */
  .product-ziyinflag {
    width: 2.3rem;
    height: 1.3rem;
    line-height: 1.4rem;
    display: inline-block;
    text-align: center;
    background-color: red;
    color: #FFFFFF;
    border-radius: 5px;
    font-size: 13px;
  }
  .product-name {
    font-size: 18px;
    color: #7c7c6c;
    margin-left: 0.5rem;
  }
  .product-price {
    margin-top: 1rem;
    text-align: left;
    color: red;
  }
  .product-info {
    text-align: left;
    color: #7c7c7c;
    font-size: 13px;
    margin-top: 1rem;
  }
  .product-info span {
    margin-right: 1.8rem;
  }
  /* 产品介绍区一样式 */
  .product-introduction-one {
    height: 5rem;
    width: 100%;
    background-color: #FFFFFF;
    margin-top: 0.8rem;
    padding: 0.8rem 0 0.5rem;
  }
  .product-introduction-one li {
    width: 25%;
    height: 100%;
    float: left;
  }
  .product-introduction-one li img {
    height: 50%;
  }
  .product-introduction-one li p {
    color: #7C7C6C;
    font-size: 13px;
    margin-top: 0.4rem;
  }
  /* 产品介绍区二样式 */
  .product-introduction-two {
    margin: 0.8rem 0 3.5rem;
  }
  .product-introduction-two img {
    width: 100%;
  }
  /* 底部样式 */
  .footer-container {
    height: 3.4rem;
    width: 100%;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
  }
  .footer-container li {
    float: left;
    text-align: center;
    line-height: 3.4rem;
  }
  .footer-container .footer-kefu {
    width: 30%;
    line-height: 1.2rem;
  }
  .footer-container .footer-kefu img {
    width: 1.3rem;
    margin-top: 0.3rem;
  }
  .footer-container .footer-kefu p {
    font-size: 14px;
    color: #7c7c7c;
  }
  .footer-container .footer-addshopcar {
    width: 35%;
    background-color: #00BFFF;
    opacity: 0.8;
    color: #FFFFFF;
  }
  .footer-container .footer-buy {
    width: 35%;
    background-color: #00BFFF;
    color: #FFFFFF;
  }
</style>
