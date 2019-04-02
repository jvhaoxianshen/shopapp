<template>
<div class="container">
  <!-- 头部导航栏开始 -->
  <mt-header title="商品详情" fixed>
    <mt-button icon="back" slot="left" @click="back"></mt-button>
    <mt-button slot="right" ></mt-button>
  </mt-header>
  <!-- 头部导航栏结束 -->
  <!-- 积分商品照片区开始 -->
  <div class="pro-img">
    <img :src="'/static' + proData.integralProInfo" alt="">
  </div>
  <!-- 积分商品照片区结束 -->
  <!-- 商品介绍区开始 -->
  <div class="introduct-pro">
    <p class="title">
      <span class="flag">积分兑换</span>
      <span class="name">{{ proData.integralProName}}</span>
    </p>
    <p class="pro-integral-container">
      <span class="integral-nums">{{proData.integralProPrice + '积分'}}</span>
      <span class="tips1">产品有限，兑完即止</span>
    </p>
    <div class="tips-container">
      <p class="tips2">兑换须知:</p>
      <p>1.本产品默认圆通包邮</p>
      <p>2.本产品是积分兑换，若非质量原因，不支持任何理由退换货</p>
      <p>3.兑换本产品需要扣除对应的积分数量，积分不足则无法兑换</p>
    </div>
  </div>
  <!-- 商品介绍区结束 -->
  <div class="footer">
    <mt-button size="large" type="danger" @click="exchange">申请兑换</mt-button>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      proData: {}
    }
  },
  created: function () {
    this.initPro()
  },
  methods: {
    // 返回上一页
    back: function () {
      this.$router.push({name: 'IntergralProList'})
    },
    // 产品信息初始化
    initPro: function () {
      let data = {
        integralProId: this.$route.params.productId
      }
      this.axios.post('water/integralPro/selectOne', data)
        .then(res => {
          this.proData = res.data[0]
        })
        .catch(() => {
          this.$toast('网络开小差了，请点击右上角刷新重新加载')
        })
    },
    // 申请兑换功能
    exchange: function () {
      let data = {
        custId: this.$store.getters.getOpenid
      }
      this.axios.post('water/vip/list', data)
        .then(res => {
          console.log(res)
          if (parseInt(res.data[0].user[0].vip.integral) < parseInt(this.proData.integralProPrice)) {
            this.$toast('积分不足')
          } else {
            this.$router.push({name: 'IntegralOrder', params: {productId: this.proData.integralProId}})
          }
        })
    }
  }
}
</script>

<style scoped>
.container {
  padding-top: 40px;
}
.pro-img {
  height: 15rem;
  line-height: 15rem;
  width: 100%;
  padding: 1rem 1rem;
}
.pro-img img {
  height: 95%;
}
/* 商品介绍样式 */
.introduct-pro {
  text-align: left;
  width: 100%;
  padding-left: 1rem;
  font-size: 14px;
  padding-right: 1rem;
}
.title {
  line-height: 2rem;
  margin-bottom: 0.6rem;
}
.flag {
  border: 1px solid #FF4949;
  padding: 0.2rem;
  color: #FF4949;
  font-size: 12px;
  border-radius: 3px;
  margin-right: 1rem;
}
.name {
  font-size: 16px;
  font-weight: 550;
}
.pro-integral-container {
  line-height: 2rem;
  margin-bottom: 0.3rem;
}
.integral-nums {
  color: red;
  margin-right: 1.3rem;
  font-size: 15px;
}
.tips1 {
  font-size: 12px;
  color: #9C9C9C;
  margin-bottom: 0.8rem;
}
.tips-container p {
  margin-bottom: 0.3rem;
}
.tips-container {
  color: #9C9C9C;
  font-size: 13px;
}
.tips2 {
  color: #000000;
}
/* 底部按钮样式 */
.footer {
  margin: 1rem 0.5rem;
}
</style>
