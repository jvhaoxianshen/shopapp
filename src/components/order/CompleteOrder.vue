<template>
<div class="container">
  <!-- 标题栏开始 -->
  <mt-header title="下单完成" fixed>
    <mt-button slot="left" ></mt-button>
  </mt-header>
  <!-- 标题栏结束 -->
  <!-- 下单完成图标区域开始 -->
  <div class="icon-container">
    <img src="../../assets/icon/order/completeOrder.svg" alt="">
    <img src="../../assets/icon/order/completeOrder2.svg" alt="" class="tips">
  </div>
  <!-- 下单完成图标区域结束 -->
  <!-- 按钮区域开始 -->
  <div class="but-container">
    <mt-button type="primary" class="home-btn" @click="backHome">返回首页</mt-button>
    <mt-button type="primary" plain>查看订单</mt-button>
  </div>
  <!-- 按钮区域结束 -->
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    // 监听浏览器事件
    if (window.history && window.history.pushState) {
      window.addEventListener('popstate', () => {
        this.$router.go(0)
        this.$router.push({name: 'Home'})
      }, true)
    }
  },
  methods: {
    backHome: function () {
      this.$router.go(0)
      this.$router.push({name: 'Home'})
    }
  }
}
</script>

<style scoped>
  /* 下单图标区域样式 */
.icon-container {
  padding-top: 80px;
  width: 100%;
}
.tips {
  margin-top: 3rem;
  height: 2.5rem;
}
.but-container {
  height: 4rem;
  margin-top: 4rem;
}
.home-btn {
  margin-right: 1.5rem;
}
</style>
