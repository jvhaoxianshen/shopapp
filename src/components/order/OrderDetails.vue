<template>
<div class="container">
  <!-- 头部导航栏开始 -->
  <mt-header title="订单详情" fixed>
    <mt-button icon="back" slot="left" @click="back"></mt-button>
  </mt-header>
  <!-- 头部导航栏结束 -->
  <!-- 订单信息区开始 -->
  <div class="info-content">
    <!-- 地址区域开始 -->
    <div class="address-container">
      <div class="address-icon">
        <img src="../../assets/icon/order/address.svg" alt="" >
      </div>
      <div class="address-info">
        <p class="name-phone">
          <span>{{'毛少苗'}}</span>
          <span class="phone">{{'17681926710'}}</span>
        </p>
        <p class="address">
          {{'浙江省杭州市萧山区湘滨路1711号杭州爱纬斯电子有限公司'}}
        </p>
      </div>
    </div>
    <!-- 地址区域结束 -->
    <!-- 商品信息区开始 -->
    <div class="container-goods">
      <!-- 商品头部开始 -->
      <p class="title">
        <span class="flag">自营</span>
        <span>门捷列夫生物科技</span>
        <span class="order-status" v-if="orderInfo.dindanFlag === '0'">等待买家付款</span>
        <span class="order-status" v-if="orderInfo.dindanFlag === '1'">等待发货</span>
        <span class="order-status" v-if="orderInfo.dindanFlag === '2'">卖家已发货</span>
        <span class="order-status" v-if="orderInfo.dindanFlag === '3'">交易完成</span>
      </p>
      <!-- 商品头部结束 -->
      <!-- 商品信息区开始 -->
      <div class="order-info" v-for="(val) in orderInfo.dindanInfo" :key="val.productId">
        <div class="order-img">
          <img :src="'/static' + val.productPic" alt="">
        </div>
        <div class="order-detail">
          <p class="name">{{val.productName}}</p>
          <p class="price">{{'￥' + val.productPrice}}</p>
          <p class="nums">{{'x' + val.buyNum}}</p>
        </div>
      </div>
      <!-- 商品信息区结束 -->
      <!-- 商品信息底部开始 -->
      <div class="footer-container">
        <p>
          <span>商品总价：</span>
          <span class="pice-right">{{'￥' + goodsTotalMoney}}</span>
        </p>
        <p>
          <span>优惠金额：</span>
          <span class="pice-right">{{'￥' + orderInfo.cutPrice}}</span>
        </p>
        <p>
          <span>运费：</span>
          <span class="pice-right">{{'￥' + orderInfo.freight}}</span>
        </p>
      </div>
      <!-- 商品信息底部结束 -->
    </div>
    <!-- 商品信息区域结束 -->
    <!-- 订单金额区开始 -->
    <div class="order-money">
      <span class="order-money-title">需付款：</span>
      <span class="order-money-price">
        ￥<span class="order-money-num">{{orderInfo.dindanMoney}}</span>
      </span>
    </div>
    <!-- 订单金额区结束 -->
    <!-- 订单创建时间等信息区域开始 -->
    <div class="order-detail-container">
      <p class="order-detail-title">
        <span>订单信息</span>
      </p>
      <div class="order-detail-info">
        <p class="order-id">
          <span>订单编号：</span>
          <span>{{orderInfo.dindanId}}</span>
        </p>
        <p>
          <span>创建时间：</span>
          <span>{{orderInfo.addDate}}</span>
        </p>
      </div>
    </div>
    <!-- 订单创建时间等信息区域结束 -->
  </div>
  <!-- 订单信息区结束 -->
  <!-- 底部开始 -->
  <div class="footer">
    <mt-button size="small" plain type="primary" v-if="orderInfo.dindanFlag === '0'" @click="payMoney()">付款</mt-button>
    <mt-button size="small" plain type="primary" v-if="orderInfo.dindanFlag === '2'">查看物流</mt-button>
  </div>
  <!-- 底部结束 -->
  <div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      orderInfo: [], // 订单信息
      goodsTotalMoney: 0 // 商品总价
    }
  },
  created: function () {
    this.initOrderInfo()
  },
  methods: {
    // 返回上一页事件
    back: function () {
      this.$router.back()
    },
    // 初始化商品数据
    initOrderInfo: function () {
      this.axios.post('water/dindan/oneList', {dinDanId: this.$route.params.orderId})
        .then(res => {
          this.orderInfo = res.data[0]
          let goodsTotalMoney = 0
          this.orderInfo.dindanInfo.forEach((val) => {
            goodsTotalMoney += parseInt(val.buyNum) * parseInt(val.productPrice)
          })
          this.goodsTotalMoney = goodsTotalMoney
        })
    },
    // 待支付订单进行付款
    payMoney: function () {
      this.axios.post('water/vip/list', {custId: this.$store.getters.getOpenid})
        .then(res => {
          if (parseInt(res.data[0].user[0].vip.money) >= parseInt(this.orderInfo.dindanMoney)) {
            this.$MessageBox.confirm('余额充足是否要完成支付?')
              .then(action => {
                let data = {
                  custId: this.$store.getters.getOpenid,
                  money: '-' + this.orderInfo.dindanMoney
                }
                this.axios.post('water/vip/updateMoneyUser', data)
                  .then(() => {
                    this.$toast('支付成功')
                    return this.axios.post('water/dindan/autoUpdate', {dindanId: this.orderInfo.dindanId})
                  })
                  .then(() => {
                    this.initOrderInfo()
                  })
                  .catch(() => {
                    this.$toast('支付失败')
                  })
              })
              .catch(() => {
              })
          } else {
            this.$toast('余额不足')
          }
        })
    }
  }
}
</script>

<style scoped>
.info-content {
  height: 100%;
  width: 100%;
  overflow: auto;
  background: #F9F9F9;
  padding-top: 40px;
  padding-bottom: 4.5rem;
}
/* 地址区域样式 */
.address-container {
  width: 100%;
  height: 6rem;
  background: #FFFFFF;
}
.address-icon {
  width: 15%;
  line-height: 6rem;
  float: left;
}
.address-icon img {
  width: 2rem;
}
.address-info {
  width: 85%;
  height: 6rem;
  float: left;
  padding:0.5rem 1rem 0.5rem 0.5rem ;
  font-size: 14px;
}
.name-phone {
  text-align: left;
  margin-bottom: 0.5rem;
}
.phone {
  color: #9C9C9C;
  font-size: 12px;
}
.address{
  text-align: left;
}
/* 商品区域样式 */
.container-goods {
  margin-top: 0.6rem;
  width: 100%;
  background-color: #FFFFFF;
  padding: 0.6rem;
}
.title {
  text-align: left;
  font-size: 14px;
  line-height: 1.5rem;
  margin-bottom: 0.5rem;
}
.title .flag {
  background: red;
  color: #FFFFFF;
  padding: 0.15rem;
  border-radius: 3px;
}
.order-status {
  float: right;
  font-size: 13px;
  color: #00BFFF;
}
/* 订单信息区 */
.order-info {
  width: 100%;
  height: 5.5rem;
  text-align: left;
  margin-bottom: 0.5rem;
}
.order-img {
  float: left;
  width: 28%;
  margin-right: 3%;
  height: 5.5rem;
}
.order-img img {
  height: 100%;
}
.order-detail {
  float: left;
  height: 5.5rem;
  font-size: 14px;
  width: 69%;
}
.order-detail .name {
  margin-bottom: 0.5rem;
}
.order-detail .price  {
   font-size: 15px;
}
.order-detail .nums {
  text-align: right;
  color: #7C7C6C;
}
/* 订单信息底部样式 */
.container-goods .footer-container {
  width: 100%;
  text-align: left;
  font-size: 14px;
}
.pice-right {
  float: right;
}
.footer-container p {
  color: #9C9C9C;
  line-height: 1.5rem;
}
.order-money {
  text-align: left;
  line-height: 3.5rem;
  border-top: 1px solid #F1F1F1;
  background: #FFFFFF;
}
.order-money-title {
  padding-left: 0.5rem;
  font-size: 15px;
}
.order-money-price {
  font-size: 14px;
  color: red;
  float: right;
  padding-right: 0.5rem;
  font-size: 12px;
}
.order-money-num {
  font-size: 16px;
}
/* 订单信息 */
.order-detail-container {
  width: 100%;
  background: #FFFFFF;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 1.6rem;
}
.order-detail-title {
  margin-left: 0.5rem;
  padding-left: 0.5rem;
  border-left: 3px solid #00BFFF;
  text-align: left;
}
.order-detail-info {
  width: 100%;
  padding-left: 1rem;
  margin-top: 1rem;
  text-align: left;
}
.order-detail-info p{
  font-size: 13px;
  color: #9C9C9C;
  line-height: 1.6rem;
}
/* 底部样式*/
.footer {
  position: fixed;
  line-height: 4rem;
  border-top: 1px solid #ECECEC;
  background: #FFFFFF;
  width: 100%;
  bottom: 0;
  text-align: right;
  padding-right: 1rem;
}
.mint-button--small {
  height: 28px;
  border-radius: 16px;
  padding-left: 22px;
  padding-right: 22px;
}
</style>
