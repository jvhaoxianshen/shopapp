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
    <li class="shopcar-product" v-for="(val, index) in productList" :key="val.shopCarId">
      <!-- 单选框区开始 -->
      <div class="check-box">
        <checkBox :index="index"></checkBox>
      </div>
      <!-- 单选框区结束 -->
      <!-- 图片区开始 -->
      <div class="pic-container">
        <img :src="val.product.productInfo" alt="">
      </div>
      <!-- 图片区结束 -->
      <!-- 商品信息和数量区域开始 -->
      <div class="product-info">
        <p>{{val.product.productName}}</p>
        <span class="product-pice">{{'￥' + val.product.productPrice}}</span>
        <!-- 数量调整区开始 -->
        <div class="product-nums">
          <span class="num-set" @click="subtractProductNums(index)">-</span>
          <span class="num">{{val.buyNum}}</span>
          <span class="num-set num-set-add" @click="addProductNums(index)">+</span>
        </div>
        <!-- 数量调整区结束 -->
      </div>
      <!-- 商品信息和数量区域结束 -->
    </li>
  </div>
  <!-- 购物车商品区结束 -->
  <!-- 底部菜单栏开始 -->
  <div class="footer-container">
    <div class="generate-but">生成订单</div>
    <div class="total-money">
      <span>总计：</span>
      <span class="money">{{'￥' + this.$store.getters.getTotalMoney }}</span>
    </div>
    <div class="all-check">
      <checkBox class="all-check-box"  :index="-1"></checkBox>
      <span>全选</span>
    </div>
  </div>
  <!-- 底部菜单栏结束 -->
</div>
</template>

<script>
import checkBox from '../common/CheckBox'
export default {
  components: {checkBox},
  data () {
    return {
      productList: [] // 商品信息
    }
  },
  created: function () {
    this.getShopcar()
  },
  methods: {
    // 返回上一页事件
    back: function () {
      this.$router.back()
    },
    // 获取购物车的数据
    getShopcar: function () {
      let data = {
        custId: this.$store.getters.getOpenid
      }
      this.axios.post('water/shopCar/list', data)
        .then(res => {
          console.log(res)
          res.data.forEach((val, index) => {
            res.data[index].product.productInfo = require('../../assets' + val.product.productInfo)
            res.data[index].selected = false
          })
          this.productList = res.data
          this.$store.commit('initializeShopCarProduct', res.data)
        })
    },
    // 添加商品数量
    addProductNums: function (index) {
      if (parseInt(this.productList[index].buyNum) === 3) {
        this.$toast('亲，购买的产品数量不能大于3哦')
        return
      }
      this.updateData(index, 'add')
    },
    // 减少商品数量
    subtractProductNums: function (index) {
      if (parseInt(this.productList[index].buyNum) === 1) {
        this.$toast('亲，购买的产品数量不能小于1哦')
        return
      }
      this.updateData(index, 'sub')
    },
    // 购物车数据同步到数据库(index代表哪个商品，ways代表增加还是减少)
    updateData: function (index, ways) {
      let data = {}
      if (ways === 'add') {
        data = {
          shopCarId: this.productList[index].shopCarId,
          num: parseInt(this.productList[index].buyNum) + 1
        }
      } else if (ways === 'sub') {
        data = {
          shopCarId: this.productList[index].shopCarId,
          num: parseInt(this.productList[index].buyNum) - 1
        }
      }
      this.axios.post('water/shopCar/num', data)
        .then(() => {
          if (ways === 'add') {
            this.productList[index].buyNum = parseInt(this.productList[index].buyNum) + 1
          } else if (ways === 'sub') {
            this.productList[index].buyNum = parseInt(this.productList[index].buyNum) - 1
          }
          this.$toast('操作成功')
        })
        .catch(() => {
          this.$toast('服务器开小差了')
        })
    },
    // 是否选中
    isSelected: function (index) {
      alert(111)
      this.productList[parseInt(index)].selected = !this.productList[parseInt(index)].selected
    }
  }
}
</script>

<style scoped>
.mid-container {
  padding-top: 40px;
  padding-bottom: 4rem;
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
/* 底部样式 */
.footer-container {
  background-color: #FFFFFF;
  position: fixed;
  height: 4rem;
  width: 100%;
  bottom: 0;
}
.footer-container div {
  width: 35%;
  float: right;
  line-height: 4rem;
}
/* 结算按钮 */
.generate-but {
  background-color: #00BFFF;
  color: #FFFFFF;
}
.generate-but {
  text-align: center;
}
.money {
  color: red;
}
.footer-container .all-check {
  line-height: 4rem;
  height: 4rem;
  width: 30%;
  position: relative;
}
.all-check-box {
  position: absolute;
  left: 0rem;
}
</style>
