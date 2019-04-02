<template>
<div class="content-container">
  <div class="order-container" v-for="(val) in orderList" :key="val.dindanId" @click="queryOrderInfo(val.dindanId)">
    <!-- 订单头部开始 -->
    <p class="title">
      <span class="flag">自营</span>
      <span>门捷列夫生物科技</span>
      <span class="order-status" v-if="val.dindanFlag === '0'">等待买家付款</span>
      <span class="order-status" v-if="val.dindanFlag === '1'">等待发货</span>
      <span class="order-status" v-if="val.dindanFlag === '2'">卖家已发货</span>
      <span class="order-status" v-if="val.dindanFlag === '3'">交易完成</span>
    </p>
    <!-- 订单头部结束 -->
    <!-- 订单信息区开始 -->
    <div class="order-info" v-for="(goodInfo) in val.dindanInfo" :key="goodInfo.productId">
      <div class="order-img">
        <img :src="'/static' + goodInfo.productPic" alt="">
      </div>
      <div class="order-detail">
        <p class="name">{{goodInfo.productName}}</p>
        <p class="price">{{'￥' + goodInfo.productPrice}}</p>
        <p class="nums">{{'x' + goodInfo.buyNum}}</p>
      </div>
    </div>
    <!-- 订单信息区结束 -->
    <!-- 订单底部开始 -->
    <div class="footer">
      <p class="num-money">
        <span class="num">{{'共' + val.buyNums +'件商品'}}</span>
        <span>合计(实付款):￥</span>
        <span class="money">{{val.dindanMoney}}</span>
      </p>
      <p class="container-but">
        <mt-button size="small" plain type="primary" v-if="val.dindanFlag === '0'" @click.stop.prevent="payMoney(val.dindanMoney, val.dindanId)">付款</mt-button>
        <mt-button size="small" plain type="primary" v-if="val.dindanFlag === '2'" @click.stop.prevent="queryLogistics(val.dindanId)">查看物流</mt-button>
      </p>
    </div>
    <!-- 顶单底部结束 -->
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      orderList: [],
      orderTypeCode: this.orderType
    }
  },
  watch: {
    orderType: function (val, oldval) {
      this.orderTypeCode = val
      this.initOrderList()
      return val
    }
  },
  props: {
    orderType: String
  },
  created: function () {
    this.initOrderList()
  },
  methods: {
    // 初始化订单列表
    initOrderList: function () {
      let data = {
        custId: this.$store.getters.getOpenid,
        flag: '',
        start: '0',
        size: '50'
      }
      if (this.orderTypeCode === 'allOrderList') {
        data.flag = 'all'
      } else if (this.orderTypeCode === 'obligationsOrderList') {
        data.flag = '0'
      } else if (this.orderTypeCode === 'tBSOrderList') {
        data.flag = '1'
      } else if (this.orderTypeCode === 'tBROrderList') {
        data.flag = '2'
      } else if (this.orderTypeCode === 'completeOrderList') {
        data.flag = '3'
      }
      this.axios.post('water/dindan/dinDanList', data)
        .then(res => {
          this.orderList = res.data
          this.orderList.forEach((val, index) => {
            // 求商品总数量
            let sum = 0
            val.dindanInfo.forEach((val2) => {
              sum += parseInt(val2.buyNum)
            })
            this.orderList[index].buyNums = sum
          })
        })
    },
    // 查询订单详情
    queryOrderInfo: function (orderId) {
      this.$router.push({name: 'OrderDetails', params: {orderId: orderId}})
    },
    // 待支付订单进行付款
    payMoney: function (money, orderId) {
      this.axios.post('water/vip/list', {custId: this.$store.getters.getOpenid})
        .then(res => {
          if (parseInt(res.data[0].user[0].vip.money) >= parseInt(money)) {
            this.$MessageBox.confirm('余额充足是否要完成支付?')
              .then(action => {
                let data = {
                  custId: this.$store.getters.getOpenid,
                  money: '-' + money
                }
                this.axios.post('water/vip/updateMoneyUser', data)
                  .then(() => {
                    this.$toast('支付成功')
                    return this.axios.post('water/dindan/autoUpdate', {dindanId: orderId})
                  })
                  .then(() => {
                    this.initOrderList()
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
    },
    // 查询物流信息
    queryLogistics: function (orderId) {
      this.$router.push({name: 'QueryLogistics', params: {orderId: orderId}})
    }
  }
}
</script>

<style scoped>
.content-container {
  padding: 1rem 0.5rem 0.5rem;
}
/* 订单样式 */
.order-container {
  margin: 0 auto;
  background: #FFFFFF;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
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
.footer {
  width: 100%;
}
.num-money {
  text-align: right;
  font-size: 13px;
  margin-bottom: 01rem;
}
.num-money .num {
  margin-right: 0.5rem;
}
.num-money .money {
  font-size: 16px;
  color: red;
}
/* 按钮区域样式 */
.container-but {
  text-align: right;
  height: 2rem;
}
.mint-button--small {
  height: 28px;
  border-radius: 16px;
  padding-left: 22px;
  padding-right: 22px;
}
</style>
