<template>
  <div class="container">
    <!-- 头像区开始 -->
    <div class="header-container">
      <img :src="userData.userHeadPic" alt="">
      <span class="name">
        <span>{{userData.userName}}</span>
        <span class="enter"></span>
      </span>
    </div>
    <!-- 头像区结束 -->
    <!-- 余额区开始 -->
    <div class="money-container">
      <div class="vip-level">
        <p>{{vipData.vipLevelmean}}</p>
      </div>
      <div class="money">
        <p>
          <span>余额:</span>
          <span>{{userData.vip.money}}</span>
          <span class="marleft">积分:</span>
          <span>{{userData.vip.integral}}</span>
        </p>
         <p>
          <span>剩余瓶数:</span>
          <span>{{vipData.haveNum }}</span>
          <!-- <span class="marleft">总瓶数:</span>
          <span>{{vipData.allNum }}</span> -->
        </p>
      </div>
    </div>
    <!-- 余额区结束 -->
    <!-- 订单区开始 -->
    <div class="order-container">
      <!-- 标题区开始 -->
      <div class="title">
        <span class="title-name">我的订单</span>
        <span class="query-btn">
          <span>全部订单</span>
          <span class="order-enter"></span>
        </span>
      </div>
      <!-- 标题区结束 -->
      <!-- 订单状态分类区开始 -->
      <div class="order-type">
        <li>
          <img src="../../assets/icon/myInfo/obligation.svg" alt="">
          <p>待付款</p>
        </li>
        <li>
          <img src="../../assets/icon/myInfo/waitorder.svg" alt="">
          <p>待发货</p>
        </li>
        <li>
          <img src="../../assets/icon/myInfo/receivedorder.svg" alt="">
          <p>待收货</p>
        </li>
        <li>
          <img src="../../assets/icon/myInfo/completionorder.svg" alt="">
          <p>交易完成</p>
        </li>
      </div>
      <!-- 订单状态分类区结束 -->
    </div>
    <!-- 订单区结束 -->
    <!-- 设置中心开始 -->
    <div class="set-container">
      <!-- 标题区开始 -->
      <div class="title">
        <span class="title-name">系统中心</span>
      </div>
      <!-- 标题区结束 -->
      <!-- 菜单中心开始 -->
      <div class="menu">
        <li>
          <img src="../../assets/icon/myInfo/address.svg" alt="">
          <p>地址管理</p>
        </li>
        <li>
          <img src="../../assets/icon/myInfo/integralshop.svg" alt="">
          <p>积分商城</p>
        </li>
      </div>
      <!-- 菜单中心结束 -->
    </div>
    <!-- 设置中心结束 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      userData: {// 用户基本数据
        vip: {}
      },
      vipData: {}// vip以及余额数据
    }
  },
  created: function () {
    this.axios.post('water/user/list', {custId: this.$store.getters.getOpenid})
      .then(res => {
        this.userData = res.data[0]
        console.log(this.userData)
        return this.axios.post('water/vip/list', {custId: this.$store.getters.getOpenid})
      })
      .catch(() => {
        this.$toast('服务器开小差了')
      })
      .then(res => {
        this.vipData = res.data[0]
        if (this.vipData.vipLevel === '0' || this.vipData.vipLevel === null || this.vipData.vipLevel === '') {
          this.vipData.vipLevelmean = '普通用户'
        } else if (this.vipData.vipLevel === '1') {
          this.vipData.vipLevelmean = '铂金天使会员'
        } else if (this.vipData.vipLevel === '2') {
          this.vipData.vipLevelmean = '钻石天使会员'
        }
        if (this.vipData.haveNum === '' || this.vipData.haveNum === null) {
          this.vipData.haveNum = 0
        }
        if (this.vipData.allNum === '' || this.vipData.allNum === null) {
          this.vipData.allNum = 0
        }
      })
  }
}
</script>

<style scoped>
.container {
  background-color: #F5F5F5;
  overflow-y: auto;
  padding-bottom: 3.3rem;
}
/* 头像容器区 */
.header-container {
  height: 10rem;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(left , rgb(141, 221, 243) , rgb(6, 154, 216) 100%);
  background: -o-linear-gradient(left , rgb(141, 221, 243) , rgb(6, 154, 216) 100%);
  background: -ms-linear-gradient(left , rgb(141, 221, 243) , rgb(6, 154, 216) 100%);
  background: -moz-linear-gradient(left , rgb(141, 221, 243) , rgb(6, 154, 216) 100%);
  background: -webkit-linear-gradient(left , rgb(141, 221, 243) , rgb(6, 154, 216) 100%);
}
.header-container img{
  width: 4rem;
  border-radius: 50px;
  position: absolute;
  left: 1rem;
  top: 2rem;
}
.header-container .name {
  font-size: 17px;
  font-weight: 550;
  color: #FFFFFF;
  position: absolute;
  left: 6rem;
  top: 3.5rem;
}
.header-container .enter {
  display: inline-block;
  background: url(../../assets/icon/myInfo/jinru.svg) no-repeat center center;
  width: 1rem;
  height: 1rem;
  background-size: contain;
  position: absolute;
  right: -1.5rem;
  top: 0.3rem;
}
/* 会员名片区 */
.money-container {
  height: 4.5rem;
  background: #FFFFFF;
  margin: 0.8rem;
  margin-top: -1.2rem;
  border-radius: 13px;
  padding: 0.6rem;
}
.vip-level {
  width: 32%;
  float: left;
  height: 100%;
  border-right: 2px solid #F1F1F1;
  line-height: 3.4rem;
  color: #A9ACB1;
  font-size: 14px;
}
.money {
  width: 68%;
  float: left;
  height: 100%;
  line-height: 3.4rem;
  color: #A9ACB1;
  font-size: 14px;
  padding: 0.5rem;
  padding-top: 0.3rem;
  padding-right: 0;
}
.money p{
  line-height: 1.4rem;
  text-align: left;
}
.marleft {
  margin-left: 0.3rem;
}
/* 订单区样式 */
.order-container {
  background: #FFFFFF;
  height: 8rem;
  margin: 0.8rem;
  border-radius: 13px;
}
.order-container .title {
  height: 2.5rem;
  width: 100%;
  border-bottom: 1px solid #F1F1F1;
  padding: 0.5rem 1rem 0.5rem;
  text-align: left;
  font-size: 15px;
}
.order-container .title .title-name {
  font-weight: 550;
}
.query-btn {
  font-size: 14px;
  color: #A9ACB1;
  position: absolute;
  right: 1.5rem;
}
.order-enter {
  display: inline-block;
  background: url(../../assets/icon/myInfo/enter.svg) no-repeat center center;
  width: 1rem;
  height: 1rem;
  background-size: contain;
  position: relative;
  top: 0.15rem;
}
.order-type {
  width: 100%;
  height: 4rem;
  padding: 0.7rem 1rem 0;
}
.order-type li {
  width: 25%;
  height: 4rem;
  float: left;
}
.order-type li img {
  height: 50%;
}
.order-type li p {
  color: #7C7C6C;
  font-size: 13px;
  margin-top: 0.4rem;
}
/* 系统中心 */
.set-container {
  background: #FFFFFF;
  height: 7rem;
  margin: 0.8rem;
  border-radius: 13px;
}
.set-container .title {
  height: 2.5rem;
  width: 100%;
  border-bottom: 1px solid #F1F1F1;
  padding: 0.5rem 1rem 0.5rem;
  text-align: left;
  font-size: 15px;
}
.set-container .title .title-name {
  font-weight: 550;
}
.menu {
  padding-top: 0.8rem;
}
.menu li {
  width: 25%;
  height: 3rem;
  float: left;
  font-size: 12px;
}
.menu li img {
  height: 50%;
}
</style>
