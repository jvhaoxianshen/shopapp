<template>
<div class="container">
  <!-- 标题栏开始 -->
  <mt-header title="确认订单" fixed>
    <mt-button icon="back" slot="left" @click="back"></mt-button>
  </mt-header>
  <!-- 标题栏结束 -->
  <!-- 地址栏开始 -->
  <div class="address-container" @click="selectedAddress()">
    <div class="address-icon">
      <img src="../../assets/icon/order/address.svg" alt="" >
    </div>
    <div class="address-info">
      <p>
        <span class="address-info-name">{{'收货人：' + address.name}}</span>
        <span class="address-info-phone">{{address.phoneNum}}</span>
      </p>
      <p class="detail-adress">
        <span>{{'收货地址：' + address.province + address.city + address.district + address.addressInfo}}</span>
      </p>
    </div>
    <div class="none-address" v-if="address.noAddress">
      您还没有创建收货地址哦！
    </div>
    <div class="address-selected" >
      <img src="../../assets/icon/order/enter.svg" alt="" >
    </div>
  </div>
  <!-- 地址栏结束 -->
  <!-- 商品信息区开始 -->
  <div class="goods-container">
    <!-- 标题区开始 -->
    <div class="company-name">
      <span class="flag">自营</span>
      <span>门捷列夫生物科技有限公司</span>
    </div>
    <!-- 标题区结束 -->
    <!-- 商品详细信息区开始 -->
    <div class="goods" v-for="(val) in productList" :key="val.integralProId">
      <div class="goods-img">
        <img :src="'/static' + val.integralProInfo" alt="">
      </div>
      <div class="goods-info">
        <p class="goods-name">
          <span>{{val.integralProName}}</span>
        </p>
        <p class="goods-pice-nums">
          <span class="pice">{{val.integralProPrice + '积分'}}</span>
          <span class="nums">{{'x' + val.buyNums}}</span>
        </p>
      </div>
    </div>
    <!-- 商品详细信息区结束 -->
    <!-- 运费区开始 -->
    <div class="freight-container">
      <p>
        <span>配送费</span>
        <span class="freight">￥0</span>
      </p>
    </div>
    <!-- 运费区结束 -->
    <!-- 优惠金额区域开始 -->
    <div class="freight-container">
      <p>
        <span>优惠金额</span>
        <span class="freight">￥0</span>
      </p>
    </div>
    <!-- 优惠金额区域结束 -->
    <!-- 买家留言开始 -->
    <div class="message-container">
      <p>
        <span>买家留言：</span>
        <input type="text" placeholder="选填:请先联系客服">
      </p>
    </div>
    <!-- 买家留言结束 -->
    <!-- 商品小计区开始 -->
    <div class="subtotal-container">
      <p>
        <span>{{'共'+ totalBuyNums +'件商品&nbsp;&nbsp;&nbsp;'}}</span>
        <span>{{'小计：'}}</span>
        <span class="subtotal-money">{{subtotalMoney +''}}</span>
      </p>
    </div>
    <!-- 商品小计区结束 -->
  </div>
  <!-- 商品信息区结束 -->
  <!-- 底部开始 -->
  <div class="footer-container">
    <div class="money-container">
      <span>{{'应付积分：'}}</span>
      <span class="money">{{totalMoney}}</span>
    </div>
    <div class="genert-order" @click="generateOrder()">确认兑换</div>
  </div>
  <!-- 底部结束 -->
</div>
</template>

<script>
export default {
  data () {
    return {
      address: { // 收货地址信息
        name: '', // 收货人姓名
        phoneNum: '', // 手机号
        province: '', // 省
        city: '', // 市
        district: '', // 区
        addressInfo: '', // 地址详细信息
        addressId: '', // 地址Id
        noAddress: false // 如果没有默认地址则显示提示框（false不显示提示框，true显示）
      },
      productList: [], // 产品信息
      totalBuyNums: 0, // 产品数量
      subtotalMoney: 0, // 小计金额
      freight: 0, // 运费
      discountMoney: 0, // 优惠金额
      lessMessage: '', // 留言
      totalMoney: 0, // 总计金额
      from: {} // 上一页路由信息
    }
  },
  created: function () {
    // 初始化地址信息
    this.initAddress()
    // 初始化物品信息
    this.initGoods()
  },
  methods: {
    // 返回上一页事件
    back: function () {
      localStorage.removeItem('selectedAddressId')
      this.$router.push({name: 'IntegralProDetails', params: {productId: this.$route.params.productId}})
    },
    // 初始化地址信息
    initAddress: function () {
      /**
       * 如果本地缓存有addressid则优先选择这个地址作为订单收货地址
       * 如果本地缓存没有addressid则选择默认地址作为订单收货地址
       * 如果以上两者都没有则显示未创建收货地址
       */
      if (localStorage.getItem('selectedAddressId') !== null && localStorage.getItem('selectedAddressId') !== undefined) {
        let data = {
          addressId: localStorage.getItem('selectedAddressId')
        }
        this.axios.post('water/address/info', data)
          .then(res => {
            if (res.data !== null && res.data !== undefined && res.data.length !== 0) {
              this.address.addressId = res.data[0].addressId
              this.address.name = res.data[0].name
              this.address.phoneNum = res.data[0].phoneNum
              this.address.province = res.data[0].addressProvince
              this.address.city = res.data[0].addressCity
              this.address.district = res.data[0].addressDistrict
              this.address.addressInfo = res.data[0].address
            } else { // 如果没有默认地址显示无地址提示框
              this.address.noAddress = true
            }
          })
          .catch(() => {
            this.$toast('获取地址信息失败')
          })
      } else {
        let data = {
          custId: this.$store.getters.getOpenid
        }
        this.axios.post('water/address/default', data)
          .then(res => {
            if (res.data !== null && res.data !== undefined && res.data.length !== 0) {
              this.address.addressId = res.data[0].addressId
              this.address.name = res.data[0].name
              this.address.phoneNum = res.data[0].phoneNum
              this.address.province = res.data[0].addressProvince
              this.address.city = res.data[0].addressCity
              this.address.district = res.data[0].addressDistrict
              this.address.addressInfo = res.data[0].address
            } else { // 如果没有默认地址显示无地址提示框
              this.address.noAddress = true
            }
          })
          .catch(() => {
            this.$toast('获取地址信息失败')
          })
      }
    },
    // 选择收货地址
    selectedAddress: function () {
      this.$router.push({name: 'AddressManager', params: {typed: 'integralOrder'}})
    },
    // 初始化商品数据
    initGoods: function () {
      // 如果订单类型是立即购买
      let data = {
        integralProId: this.$route.params.productId
      }
      this.axios.post('water/integralPro/selectOne', data)
        .then((res) => {
          this.productList = res.data
          this.productList[0].buyNums = localStorage.getItem('buyNums')
          this.totalBuyNums = localStorage.getItem('buyNums')
          this.subtotalMoney = this.productList[0].integralProPrice
          this.totalMoney = this.productList[0].integralProPrice
        })
    },
    // 生成订单
    generateOrder: function () {
      let arrys = [] // 订单产品信息
      this.productList.forEach((val, index) => {
        arrys.push({
          productId: val.integralProId,
          buyNum: val.buyNums,
          productName: val.integralProName,
          productPrice: val.integralProPrice,
          productPic: val.integralProInfo
        })
      })
      // 订单数据
      let data = {
        custId: this.$store.getters.getOpenid, // 用户id
        dindanMoney: this.totalMoney, // 总计金额
        freight: this.freight, // 运费
        cutPrice: this.discountMoney, // 优惠金额
        leaveMessage: this.lessMessage, // 留言
        addressId: this.address.addressId, // 地址id
        dinDanInfoArry: JSON.stringify(arrys), // 商品信息
        flag: '1', // 付款状态
        addressInfo: this.address.addressInfo, // 收货人地址信息
        addressName: this.address.name, // 收货人姓名
        addressPhone: this.address.phoneNum, // 收货人手机号
        addressProvince: this.address.province, // 收货人省
        addressCity: this.address.city, // 收货人市
        addressDistrict: this.address.district // 收货人地区
      }
      this.axios.post('water/dindan/insert2', data)
        .then(res => {
          localStorage.setItem('orderId', res.data)
          localStorage.removeItem('selectedAddressId')
          let data = {
            custId: this.$store.getters.getOpenid,
            integral: '-' + this.totalMoney
          }
          return this.axios.post('water/vip/updateIntegralUser', data)
        })
        .then(action => {
          this.$toast('支付成功')
          localStorage.removeItem('selectedAddressId')
          this.$router.push({name: 'CompleteOrder'})
        })
        .catch(() => {
          this.$router.push({name: 'OrderList', params: {orderType: '0'}})
          this.$toast('支付失败')
          localStorage.removeItem('orderId')
          this.$router.push({name: 'CompleteOrder'})
        })
    }
  }
}
</script>

<style scoped>
p{
  text-align: left;
}
.container {
  background: #F8F8F8;
  padding-bottom: 6rem;
  overflow: auto;
}
.address-container {
  height: 9rem;
  width: 100%;
  padding-top: 40px;
  background: #FFFFFF;
  margin-bottom: 0.8rem;
}
/* 地址图标区域样式 */
.address-icon {
  height: 100%;
  width: 15%;
  float: left;
}
.address-icon img {
  height: 1.8rem;
  margin: 0 auto;
  margin-top: 2rem;
}
/* 地址详细信息区域样式 */
.address-info {
  height: 100%;
  width: 75%;
  float: left;
  padding: 0.7rem;
  font-size: 14px;
}
.address-info-name {
  float: left;
}
.address-info-phone {
  float: right;
}
.detail-adress {
  margin-top: 1.4rem;
  text-align: left;
}
/* 没有创建地址提示框 */
.none-address {
  line-height: 6.5rem;
  left: 13%;
  background: #FFFFFF;
  width: 75%;
  position: absolute;
  font-size: 18px;
  color: #7C7C6C;
}
/* 选择地址按钮 */
.address-selected {
  height: 100%;
  width: 10%;
  float: left;
}
.address-selected img {
  height: 1.3rem;
  margin: 0 auto;
  margin-top: 2.5rem;
}
.goods-container {
  width: 100%;
  background: #FFFFFF;
  padding-bottom: 0.6rem;
}
.company-name {
  text-align: left;
  font-size: 14px;
  line-height: 3rem;
  padding-left: 1rem;
}
.flag {
  background: red;
  color: #FFFFFF;
  padding: 2px;
  border-radius: 4px;
  font-size: 14px;
}
/* 商品样式 */
.goods {
  height: 5.5rem;
  background: #f9f9f9;
  margin-bottom: 0.5rem;
}
/* 商品图片区 */
.goods-img {
  width: 30%;
  float: left;
  margin-top: 0.5rem;
  text-align: left;
  padding-left: 1rem;
}
.goods-img img {
  height: 4.5rem;
}
/* 商品信息区样式 */
.goods-info {
  width: 70%;
  height: 100%;
  padding-top: 0.5rem;
  float: left;
  position: relative;
}
/* 商品名称样式 */
.goods-name {
  font-size: 14px;
  text-align: left;
}
/* 价格和数量区域样式 */
.goods-pice-nums {
  position: absolute;
  bottom: 0.5rem;
  line-height: 1rem;
  width: 100%;
  font-size: 14px;
}
.pice {
  color: red;
}
.nums {
  float: right;
  margin-right: 1rem;
}
/* 运费区样式 */
.freight-container {
  padding-left: 1rem;
  padding-right: 1rem;
  line-height: 2.5rem;
  margin-top: 0.5rem;
}
.freight-container p {
  border-bottom: 1px solid #ECECEC;
  font-size: 14px;
}
.freight {
  float: right;
}
/* 留言区样式 */
.message-container {
  font-size: 14px;
  padding-left: 1rem;
  padding-right: 1rem;
  line-height: 2.5rem;
  margin-top: 0.5rem;
}
.message-container p {
  border-bottom: 1px solid #ECECEC;
  font-size: 14px;
}
.message-container input {
  border: 0;
  height: 2rem;
  width: 74%;
  padding: 0.3rem;
  outline: none;
}
/* 小计区样式 */
.subtotal-container {
  height: 2.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  margin-top: 0.5rem;
}
.subtotal-container p {
  line-height: 2.5rem;
  font-size: 14px;
  float: right;
}
/* 小计金额样式 */
.subtotal-money {
  color: red;
  font-size: 17px;
}
/* 底部容器样式 */
.footer-container {
  position: fixed;
  bottom: 0;
  height: 4.5rem;
  width: 100%;
  background: #FFFFFF;
}
/* 应付金额区域 */
.money-container {
  width:60%;
  line-height: 4.5rem;
  float: left;
  text-align: right;
  color: red;
  font-size: 14px;
  padding-right: 2rem;
}
.money {
  font-size: 17px;
}
/* 生成订单按钮 */
.genert-order {
  width:40%;
  line-height: 4.5rem;
  background-color: #00BFFF;
  color: #FFFFFF;
  float: left;
}
</style>
