<template>
<div class="container">
  <!-- 头部导航栏开始 -->
  <mt-header title="物流信息" fixed>
    <mt-button icon="back" slot="left" @click="back"></mt-button>
  </mt-header>
  <!-- 头部导航栏结束 -->
  <!-- 快递公司区开始 -->
  <div class="express">
    <span>{{logisticInfo.shipperCodeMean + '(单号)：'}}</span>
    <span>{{logisticInfo.logisticCode}}</span>
    <div class="mask" v-if="maskShow">
      <p>暂无物流信息</p>
    </div>
  </div>
  <!-- 快递公司区结束 -->
  <!-- 订单物流信息开始 -->
  <div class="logistic-info">
    <div class="logistic-container" v-for="(val) in logisticInfo.logisticInfo" :key="val.acceptTime">
      <div class="date-time">
        <p>{{val.date}}</p>
        <p class="time">{{val.time}}</p>
      </div>
      <div class="info">
        <span>{{val.acceptStation}}</span>
      </div>
    </div>
  </div>
  <!-- 订单物流信息结束 -->
</div>
</template>

<script>
export default {
  data () {
    return {
      logisticInfo: {}, // 物流信息
      maskShow: false // 物流信息未更新显示
    }
  },
  created: function () {
    this.initLogistic()
  },
  methods: {
    // 返回上一页事件
    back: function () {
      this.$router.back()
    },
    // 初始化物流信息
    initLogistic: function () {
      let data = {
        dinDanId: this.$route.params.orderId
      }
      this.axios.post('/water/logistic/list', data)
        .then(res => {
          if (res.data.length === 0) {
            this.maskShow = true
            return 0
          }
          if (res.data[0].shipperCode === 'SF') {
            res.data[0].shipperCodeMean = '顺丰快递'
          } else if (res.data[0].shipperCode === 'YTO') {
            res.data[0].shipperCodeMean = '圆通快递'
          } else if (res.data[0].shipperCode === 'ZTO') {
            res.data[0].shipperCodeMean = '中通快递'
          } else if (res.data[0].shipperCode === 'YD') {
            res.data[0].shipperCodeMean = '韵达快递'
          } else if (res.data[0].shipperCode === 'ANE') {
            res.data[0].shipperCodeMean = '安能物流'
          }
          res.data[0].logisticInfo.forEach((val, index) => {
            res.data[0].logisticInfo[index].date = val.acceptTime.substring(5, 10)
            res.data[0].logisticInfo[index].time = val.acceptTime.substring(11, 16)
          })
          this.logisticInfo = res.data[0]
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
  padding-top: 40px;
  background: #F9F9F9;
  padding-bottom: 1rem;
  overflow: auto;
}
/* 快递公司 */
.express {
  height: 4rem;
  line-height: 3rem;
  width: 96%;
  margin: 0 auto;
  background: #FFFFFF;
  margin-top: 0.5rem;
  border-radius: 10px;
  padding: 0.5rem;
  position: relative;
}
.mask {
  line-height: 4rem;
  width: 96%;
  margin: 0 auto;
  background: #FFFFFF;
  border-radius: 10px;
  position: absolute;
  top: 0;
}
/* 物流信息样式 */
.logistic-info {
  width: 96%;
  margin: 0 auto;
  background: #FFFFFF;
  min-height: 16rem;
  margin-top: 0.5rem;
  padding: 1rem;
  border-radius: 10px;
  text-align: left;
  font-size: 14px;
  padding-bottom: 2rem;
}
.date-time {
  width: 20%;
  float: left;
  text-align: right;
  padding-right: 1rem;
}
.info {
  width: 80%;
  float: left;
}
.date-time .time {
  margin-top: 0.3rem;
  font-size: 12px;
  color: #9C9C9C;
}
.logistic-container {
  margin-top: 1rem;
  overflow: hidden;
}
</style>
