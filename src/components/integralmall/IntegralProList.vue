<template>
<div class="container">
  <!-- 头部导航栏开始 -->
  <mt-header title="积分商城" fixed>
    <mt-button icon="back" slot="left" @click="back"></mt-button>
    <mt-button slot="right" ></mt-button>
  </mt-header>
  <!-- 头部导航栏结束 -->
  <!-- 产品区域开始 -->
  <div class="product-List" >
    <li class="product-card" v-for="(val) in proList" :key="val.integralProId" @click="toProDetail(val.integralProId)">
      <img :src="'/static' + val.integralProInfo" alt="" class="pro-img">
      <p class="product-title">{{val.integralProName}}</p>
      <p class="product-price">{{val.integralProPrice + '积分'}}</p>
    </li>
  </div>
  <!-- 产品区域结束 -->
</div>
</template>

<script>
export default {
  data () {
    return {
      proList: []
    }
  },
  created: function () {
    this.initProList()
  },
  methods: {
    // 返回上一页
    back: function () {
      this.$router.push({name: 'Home', params: {type: 'myinfo'}})
    },
    // 初始化商品列表
    initProList: function () {
      this.axios.post('water/integralPro/selectIntegralPro')
        .then((res) => {
          this.proList = res.data
        })
        .catch(() => {
          this.$toast('网络开小差了，请点击右上角刷新重新加载')
        })
    },
    toProDetail: function (productId) {
      this.$router.push({name: 'IntegralProDetails', params: {productId: productId}})
    }
  }
}
</script>

<style scoped>
.container {
  background: #F8F8F8;
}
/*产品列表样式*/
.product-List {
  padding: 3rem 1.5% 4rem;
  overflow: auto;
}
/*产品卡片样式*/
.product-card {
  width: 47%;
  height: 13.5rem;
  float: left;
  margin: 0.6rem 1.5% 0;
  background: #FFFFFF;
  border-radius: 8px;
  padding-top: 0.5rem;
}
/*产品卡片样式*/
.pro-img {
  width: 75%;
  min-height: 6rem;
}
/* 产品标题样式 */
.product-title {
  font-size: 12px;
  margin: 0;
  padding: 0 0.8rem;
}
/* 产品价格样式 */
.product-price {
  color: #E9373F;
  text-align: left;
  padding: 0.5rem 0.8rem;
}
</style>
