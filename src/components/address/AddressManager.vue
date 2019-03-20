。<template>
<div class="container">
  <!-- 加载动画开始 -->
  <mt-spinner type="snake" :size="40" class="loading" color="#26a2ff" :class="{loader: loader}"></mt-spinner>
  <!-- 加载动画结束 -->
  <!-- 头部导航栏开始 -->
  <mt-header title="收货地址" fixed>
    <mt-button icon="back" slot="left" @click="back"></mt-button>
  </mt-header>
  <!-- 头部导航栏结束 -->
  <!-- 地址列表区域开始 -->
  <div class="mid">
    <div class="address-container" v-for="(val, index) in addressList" :key="val.addressId" @click="selected(val.addressId)">
      <div class="address-info-one">
        <span>{{val.name}}</span>
        <span class="address-phone">{{val.phoneNum}}</span>
      </div>
      <p class="address-info-two">
        <span>{{val.addressProvince}}</span>
        <span>{{val.addressCity}}</span>
        <span>{{val.addressDistrict}}</span>
        <span>{{val.address}}</span>
      </p>
      <p class="address-set"  @click.stop>
        <!-- 遮罩层开始 -->
        <span class="mask" @click.stop="clickStop" v-if="addressList[index].isDefaultMean"></span>
        <!-- 遮罩层结束 -->
        <mt-switch v-model="addressList[index].isDefaultMean" @change="turn(index)" >默认地址</mt-switch>
        <span class="address-set-right">
          <span class="address-update" @click="updateAddress(val.addressId)">
            <img src="../../assets/icon/address/update.svg" alt="">
             <span>编辑</span>
          </span>
          <span class="address-update" @click="deleteAddress(val.addressId, val.isDefault)">
            <img src="../../assets/icon/address/delete.svg" alt="">
             <span>删除</span>
          </span>
        </span>
      </p>
    </div>
  </div>
  <!-- 地址列表区域结束 -->
  <!-- 底部区域开始 -->
  <div class="footer-container">
     <mt-button type="primary" size="large" @click="addAddress">新增地址</mt-button>
  </div>
  <!-- 底部区域结束 -->
</div>
</template>

<script>
export default {
  data () {
    return {
      loader: true,
      addressList: [], // 地址列表数据
      oldAddressId: ''
    }
  },
  created: function () {
    this.getAddressList()
  },
  methods: {
    // 返回上一页事件
    back: function () {
      this.$router.back()
    },
    // 获取地址列表
    getAddressList: function () {
      let data = {
        custId: this.$store.getters.getOpenid
      }
      this.axios.post('water/address/list', data)
        .then(res => {
          if (res.data === null || res.data === undefined) {
            this.$toast('您还未添加地址哦')
          } else {
            this.addressList = res.data
            this.addressList.forEach((val, index) => {
              if (val.isDefault === '1') {
                this.addressList[index].isDefaultMean = true
                this.oldAddressId = this.addressList[index].addressId
              } else {
                this.addressList[index].isDefaultMean = false
              }
            })
          }
        })
        .catch(() => {
          this.$toast('网络开小差了')
        })
    },
    // 改变默认地址状态
    turn: function (index) {
      var data = {
        oldAddressId: this.oldAddressId,
        newAddressId: this.addressList[index].addressId
      }
      this.axios.post('water/address/changeDefault', data)
        .then(() => {
          this.$toast('设置默认地址成功')
          // 修改完地址状态以后重新加载地址列表
          this.getAddressList()
        })
        .catch(() => {
          this.$toast('网络开小差了')
        })
    },
    // 防止事件向下传递
    clickStop: function () {
      this.$toast('该地址已经是默认地址')
    },
    // 新增地址
    addAddress: function () {
      this.$router.push({name: 'AddAddress'})
    },
    // 确认删除
    deleteAddress: function (addressId, isDefault) {
      this.$MessageBox.confirm('确定要删除地址吗?')
        .then(action => {
          let data = {
            addressId: addressId,
            isDefault: isDefault,
            custId: this.$store.getters.getOpenid
          }
          this.axios.post('water/address/delete', data)
            .then(() => {
              this.$toast('删除成功')
              this.getAddressList()
            })
        })
        .catch(() => {
        })
    },
    // 修改地址信息
    updateAddress: function (addressId) {
      this.$router.push({name: 'UpdateAddress', params: {addressId: addressId}})
    },
    // 选择地址
    selected: function (addressId) {
      if (this.$route.params.typed === 'selectedAddress') {
        localStorage.setItem('selectedAddressId', addressId)
        this.$router.push({name: 'GenerateOrder', params: {orderType: localStorage.getItem('orderType')}})
      } else {
        return 0
      }
    }
  }
}
</script>

<style scoped>
.container {
  background: #F5F5F5;
  padding-bottom: 5rem;
  height: 100%;
}
  /* 加载动画样式 */
.loading {
  position: fixed;
  top: 47%;
  left: 45%;
}
.loader {
  display: none;
}
/* 地址列表样式 */
.mid{
  padding-top: 40px;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.address-container {
  height: 8.5rem;
  width: 100%;
  background: #FFFFFF;
  margin-bottom: 0.8rem;
  padding: 1rem 1.5rem 0.5rem;
}
.address-info-one {
  text-align: left;
  margin-bottom: 0.5rem;
}
.address-phone {
  float: right
}
.address-info-two {
  text-align: left;
  color: #7C7C7C;
  font-size: 13px;
  border-bottom: 1px solid #F1F1F1;
  padding-bottom: 0.5rem;
}
.address-set-right {
  float: right;
  display: inline-block;
  padding-top: 0.35rem;
}
/* 默认地址样式 */
.address-set {
  margin-top: 0.6rem;
  overflow: hidden;
  position: relative;
  bottom: -0.8rem;
}
.address-set label {
  float: left;
  font-size: 14px;
}
.address-set img {
  width: 1.5rem;
  float: left;
}
/* 遮罩样式 */
.mask {
  width: 45%;
  height: 2.5rem;
  display: inline-block;
  position: absolute;
  left: 0;
  z-index: 999;
}
/* 地址修改区 */
.address-update {
  display: inline-block;
  margin-right: 0.8rem;
}
.address-update span{
  line-height: 1.5rem;
}
/* 底部样式 */
.footer-container {
  width: 100%;
  height: 4.5rem;
  position: fixed;
  bottom: 0;
  background-color: #FFFFFF;
  padding: 1rem 2rem;
}
</style>
