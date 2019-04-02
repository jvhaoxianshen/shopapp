<template>
<div class="container">
  <!-- 头部导航栏开始 -->
  <mt-header title="我的订单" fixed>
    <mt-button icon="back" slot="left" @click="back"></mt-button>
  </mt-header>
  <mt-navbar v-model="selected" style="margin-top: 40px;">
    <mt-tab-item id="allOrderList">全部</mt-tab-item>
    <mt-tab-item id="obligationsOrderList">待付款</mt-tab-item>
    <mt-tab-item id="tBSOrderList">待发货</mt-tab-item>
    <mt-tab-item id="tBROrderList">待收货</mt-tab-item>
    <mt-tab-item id="completeOrderList">交易完成</mt-tab-item>
  </mt-navbar>
  <!-- 头部导航栏结束 -->
  <div class="content">
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="allOrderList">
        <allOrderList :orderType="selected" v-if="'allOrderList' === selected"></allOrderList>
      </mt-tab-container-item>
      <mt-tab-container-item id="obligationsOrderList">
        <allOrderList :orderType="selected" v-if="'obligationsOrderList' === selected"></allOrderList>
      </mt-tab-container-item>
      <mt-tab-container-item id="tBSOrderList" >
        <allOrderList :orderType="selected" v-if="'tBSOrderList' === selected"></allOrderList>
      </mt-tab-container-item>
      <mt-tab-container-item id="tBROrderList">
        <allOrderList :orderType="selected" v-if="'tBROrderList' === selected"></allOrderList>
      </mt-tab-container-item>
      <mt-tab-container-item id="completeOrderList">
        <allOrderList :orderType="selected" v-if="'completeOrderList' === selected"></allOrderList>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</div>
</template>

<script>
import allOrderList from './AllOrderList'
export default {
  components: { allOrderList },
  data () {
    return {
      selected: 'allOrderList'
    }
  },
  created: function () {
    if (this.$route.params.orderType.toString() === '-1') {
      this.selected = 'allOrderList'
    } else if (this.$route.params.orderType.toString() === '0') {
      this.selected = 'obligationsOrderList'
    } else if (this.$route.params.orderType.toString() === '1') {
      this.selected = 'tBSOrderList'
    } else if (this.$route.params.orderType.toString() === '2') {
      this.selected = 'tBROrderList'
    } else if (this.$route.params.orderType.toString() === '3') {
      this.selected = 'completeOrderList'
    }
  },
  methods: {
    // 返回上一页事件
    back: function () {
      this.$router.push({path: '/app/myinfo'})
    }
  }
}
</script>

<style scoped>
.container {
  padding-bottom: 82px;
  overflow: hidden;
}
.content {
  height: 100%;
  background: #F9F9F9;
  overflow: auto;
}
.mint-navbar .mint-tab-item.is-selected {
  z-index: 999;
}
</style>
