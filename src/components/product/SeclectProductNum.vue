<template>
<div class="container" @touchmove.prevent v-if="show">
  <!-- 遮罩区域开始 -->
  <div class="mask" @click="closeSetNumWindow"></div>
  <!-- 遮罩区结束 -->
  <!-- 修改数量区开始 -->
  <div class="setNum-container">
    <img src="../../assets/icon/productDetail/close.svg" alt="" class="close-icon" @click="closeSetNumWindow">
    <!-- 产品介绍区开始 -->
    <div class="product-container">
      <img :src="proData.proPic[0].pic" alt="">
      <p class="product-price">{{'￥' + proData.productPrice}}</p>
       <p class="product-num">{{'库存' + proData.productNum}}</p>
      <p class="product-name">{{ proData.productName}}</p>
    </div>
    <!-- 产品介绍区结束 -->
    <!-- 修改数量区开始 -->
    <div class="product-setnumcontainer">
      <span>购买数量</span>
      <div class="product-setnumicon">
        <div class="posit posit-jian">
          <div class="posit-jianicon"></div>
        </div>
        <div class="posit posit-num">{{nums}}</div>
        <div class="posit posit-add">
          <div class="posit-addicon"></div>
        </div>
      </div>
    </div>
    <!-- 修改数量区结束 -->
  </div>
  <!-- 修改数量区结束 -->
</div>
</template>

<script>
export default {
  data () {
    return {
      show: this.setNumShow, // 是否显示
      proData: this.productDetail, // 商品数据
      nums: 0 // 商品数量
    }
  },
  props: {
    setNumShow: Boolean,
    productDetail: Object
  },
  created: function () {
    console.log(this.proData.proPic[0])
  },
  methods: {
    // 关闭数量设置框样式
    closeSetNumWindow: function () {
      this.$emit('toClose', false)
    },
    // 打开数量设置框
    openSetNumWindow: function () {
      this.show = true
    }
  }
}
</script>

<style scoped>
/* 组件容器样式 */
.container {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
}
.mask {
  width: 100%;
  height: 45%;
  opacity: 0.6;
 }
.setNum-container {
  width: 100%;
  background-color: #FFFFFF;
  height: 80%;
  position: fixed;
  bottom: 0;
  opacity: 1;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  -webkit-border-top-left-radius: 25px;
  -webkit-border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 1rem;
}
/* 关闭按钮样式 */
.close-icon {
  width: 1.6rem;
  float: right;
  z-index: 9999;
}
/* 产品简介区开始 */
.product-container {
  width: calc(100% - 2rem);
  width: -webkit-calc(100% - 2rem);
  height: 6rem;
}
.product-container img {
  width: 6rem;
  float: left;
}
.product-container p {
  padding-left: 6.3rem;
  text-align: left;
  line-height: 1.2rem;
}
.product-price {
  padding-top: 1.5rem;
  color: red;
}
.product-num {
  font-size: 12px;
  color: #7C7C6C;
}
.product-name {
  font-size: 12px;
  color: #333333;
}
/* 产品调整数量区样式 */
.product-setnumcontainer {
    width: 100%;
    line-height: 4rem;
    margin-top: 1rem;
    text-align: left;
    border-top: 1px solid #ECECEC;
    border-bottom: 1px solid #ECECEC;
    color: #333333;
    font-size: 14px;
}
/* 设置数量样式 */
.product-setnumicon {
  float: right;
  height: 1.6rem;
  width: 5.4rem;
  margin-top: 1.05rem;
}
.posit {
  float: left;
  font-size: 15px;
  width: 1.5rem;
  height: 1.6rem;
}
.posit-jian {
  background: #F5F5F5;
  -webkit-border-top-left-radius: 4px;
  border-top-left-radius: 4px;
  -webkit-border-bottom-left-radius: 4px;
  border-bottom-left-radius: 4px;
  margin-right: 0.1rem;
}
.posit-jianicon {
  background: url(../../assets/icon/productDetail/jian.svg) center center no-repeat;
  background-size: cover;
  height: 1.6rem;
  width: 0.6rem;
  margin-left: 0.55rem;
}
.posit-num {
  line-height: 1.6rem;
  width: 2.2rem;
  text-align: center;
  background: #EBEBEB;
  font-weight: 700;
  margin-right: 0.05rem;
}
.posit-add {
  background: #E7E7E7;
  -webkit-border-top-right-radius: 4px;
  border-top-right-radius: 4px;
  -webkit-border-bottom-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.posit-addicon {
  background: url(../../assets/icon/productDetail/add.svg) center center no-repeat;
  background-size: cover;
  height: 0.9rem;
  width: 0.7rem;
  margin-top: 0.25rem;
  margin-left: 0.4rem;
}
</style>
