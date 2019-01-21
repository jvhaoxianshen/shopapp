<template>
<div class="container">
  <!-- 头部导航栏开始 -->
  <mt-header title="购物车" fixed>
    <mt-button icon="back" slot="left" @click="back"></mt-button>
    <mt-button class="shopcar-but" slot="right" ></mt-button>
  </mt-header>
  <!-- 头部导航栏结束 -->
  <!-- 购物车商品区开始 -->
  <div class="mid-container">
    <li class="shopcar-product">
      <!-- 单选框区开始 -->
      <div class="check-box">
        <checkBox></checkBox>
      </div>
      <!-- 单选框区结束 -->
      <!-- 图片区开始 -->
      <div class="pic-container">
        <img src="../../../dist/static/img/pro1-1.73f3c81.jpg" alt="">
      </div>
      <!-- 图片区结束 -->
      <!-- 商品信息和数量区域开始 -->
      <div class="product-info">
        <p>纯净水（氘含量50ppm）12瓶/箱</p>
        <span class="product-pice">￥1536</span>
        <!-- 数量调整区开始 -->
        <div class="product-nums">
          <span class="num-set">-</span>
          <span class="num">10</span>
          <span class="num-set num-set-add">+</span>
        </div>
        <!-- 数量调整区结束 -->
      </div>
      <!-- 商品信息和数量区域结束 -->
    </li>
  </div>
  <!-- 购物车商品区结束 -->
</div>
</template>

<script>
import checkBox from '../common/CheckBox'
export default {
  components: {checkBox},
  data () {
    return {
    }
  },
  methods: {
    // 返回上一页事件
    back: function () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.mid-container {
  height: 100%;
  padding-top: 40px;
}
/* 购物车商品区 */
.shopcar-product {
  height: 6.5rem;
  position: relative;
  border-bottom: 1px solid #FCF8E3;
 }
 /* 多选框样式 */
 .check-box {
  display: inline-block;
  height:100% ;
  width: 10%;
  float: left;
  padding-top: 2rem;
  padding-bottom: 2rem;
 }
 /* 图片区 */
.pic-container {
  height: 100%;
  width: 25%;
  float: left;
}
.pic-container img {
  width: 98%;
}
/* 商品信息区样式 */
.product-info {
  height: 100%;
  width: 65%;
  float: left;
  padding: 0.6rem;
  font-size: 14px;
  text-align: left;
  color: #7C7C7C;
}
/* 产品价格区 */
.product-pice {
  position: absolute;
  bottom: 1.5rem;
  color: red;
  font-size: 16px;
}
/* 商品数量调整区 */
.product-nums {
  position: absolute;
  bottom: 1.5rem;
  right: 1rem;
}
.product-nums span {
  display: block;
  float: left;
  line-height: 1.2rem;
  text-align: center;
  padding-bottom: 0.2rem;
  border-radius: 3px;
}
.num-set {
  width: 1.2rem;
  font-size: 25px;
  background-color: #f3f3f3;
}
.num {
  font-size: 15px;
  padding: 0 0.5rem;
}
.product-nums .num-set-add {
  font-size: 20px;
  padding: 0.2rem 0 0rem;
}
</style>
