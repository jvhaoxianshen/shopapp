<template>
<div class="container">
  <!-- 头部导航栏开始 -->
  <mt-header title="新增地址" fixed>
    <mt-button icon="back" slot="left" @click="back"></mt-button>
  </mt-header>
  <!-- 头部导航栏结束 -->
  <!-- 内容区开始 -->
  <div class="mid">
    <div class="district" @click="selectedP">
      <input type="text" placeholder="请选择省" readonly="true" v-model="province"/>
      <input type="text" placeholder="请选择市" readonly="true" v-model="city"/>
      <input type="text" placeholder="请选择区" readonly="true" v-model="district"/>
    </div>
    <mt-field label="姓名" placeholder="请输入姓名" v-model="userName"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" v-model="phoneNum"></mt-field>
    <mt-field label="详细地址" placeholder="请输入详细地址" type="textarea" rows="2" v-model="addressInfo" class="address-info"></mt-field>
  </div>
  <!-- 内容区结束 -->
  <!-- 底部区域开始 -->
  <div class="footer-container">
     <mt-button type="primary" size="large" @click="saveClick()">保存</mt-button>
  </div>
  <!-- 底部区域结束 -->
  <!-- 地址选择框开始 -->
  <mt-popup v-model="popupVisible" position="bottom" class="popup-container">
    <div class="address">
      <div>
        <mt-button size="small" type="primary" class="confirm" @click="confirmAddress()">确定</mt-button>
        <mt-button size="small" class="cal" @click="cancle()">取消</mt-button>
      </div>
      <mt-picker :slots="areaList" @change="selectArea" :visibleItemCount="5" :itemHeight="27"></mt-picker>
    </div>
  </mt-popup>
  <!-- 地址选择框结束 -->
</div>
</template>

<script>
export default {
  data () {
    return {
      userName: '', // 收货人姓名
      phoneNum: '', // 请输入手机号
      province: '', // 省
      city: '', // 市
      district: '', // 区
      addressInfo: '', // 详细地址
      selectedProvince: '', // 被选中的省
      selectedCity: '', // 被选中的市
      selectedDistrict: '', // 被选中的区
      popupVisible: false, // 地址选择器显示隐藏
      provinceArry: [], // 省列表
      cityArry: [], // 市列表
      areaList: [
        {
          flex: 1,
          values: ['请选择'],
          className: 'slot2',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['请选择'],
          className: 'slot2',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['请选择'],
          className: 'slot2',
          textAlign: 'center'
        }
      ]
    }
  },
  created: function () {
    this.axios.post('water/ChinaAddress/selectP')
      .then(res => {
        this.provinceArry = res.data
        let provArr = []
        res.data.forEach((val, index) => {
          provArr.push(val.name)
        })
        this.areaList[0].values = provArr
      })
  },
  methods: {
    // 返回上一页事件
    back: function () {
      this.$router.back()
    },
    selectedP: function () {
      this.popupVisible = true
    },
    // 对获取市和区方法进行promise封装
    getArea: function (data) {
      let promise = new Promise((resolve, reject) => {
        this.axios.post('water/ChinaAddress/select', data)
          .then(function (res) {
            resolve(res)
          })
      })
      return promise
    },
    // 选择地址
    selectArea: function (picker, values) {
      let selectedProv = picker.getSlotValue(0)
      let prov = this.provinceArry.find((val) => {
        if (val.name === selectedProv) {
          return val
        }
      })
      if (prov === undefined) {
        return
      }
      // 根据省获取市
      let data = {parent: prov.value}
      this.getArea(data)
        .then(res => {
          this.cityArry = res.data
          let cityArr = []
          res.data.forEach((val, index) => {
            cityArr.push(val.name)
          })
          this.areaList[2].values = cityArr
          let selectedCity = picker.getSlotValue(1)
          let city = this.cityArry.find((val) => {
            if (val.name === selectedCity) {
              return val
            }
          })
          // 根据市获取地区
          if (city !== undefined) {
            let data = {parent: city.value}
            return this.getArea(data)
          }
        })
        .then(res => {
          if (res !== undefined) {
            this.distictArry = res.data
            let distictArr = []
            res.data.forEach((val, index) => {
              distictArr.push(val.name)
            })
            this.areaList[4].values = distictArr
          }
        })
      this.selectedProvince = picker.getSlotValue(0)
      this.selectedCity = picker.getSlotValue(1)
      this.selectedDistrict = picker.getSlotValue(2)
    },
    // 确认地址
    confirmAddress: function () {
      this.province = this.selectedProvince
      this.city = this.selectedCity
      this.district = this.selectedDistrict
      this.popupVisible = false
    },
    // 点击取消按钮地址选择框关闭
    cancle: function () {
      this.popupVisible = false
    },
    // 点击保存按钮保存新的地址信息
    saveClick: function () {
      var data = {
        phoneNum: this.phoneNum,
        name: this.userName,
        address: this.addressInfo,
        addressDistrict: this.district,
        addressCity: this.city,
        addressProvince: this.province,
        custId: this.$store.getters.getOpenid
      }
      // 表单非空验证
      if (this.$trim(this.province) === null || this.$trim(this.province) === '') {
        return this.$toast('省不能为空')
      }
      if (this.$trim(this.city) === null || this.$trim(this.city) === '') {
        return this.$toast('市不能为空')
      }
      if (this.$trim(this.district) === null || this.$trim(this.district) === '') {
        return this.$toast('地区不能为空')
      }
      if (this.$trim(this.userName) === null || this.$trim(this.userName) === '') {
        return this.$toast('收货人姓名不能为空')
      }
      if (this.$trim(this.phoneNum) === null || this.$trim(this.phoneNum) === '') {
        return this.$toast('手机号不能为空')
      }
      if (this.$trim(this.addressInfo) === null || this.$trim(this.addressInfo) === '') {
        return this.$toast('详细地址不能为空')
      }
      // 表单长度验证
      if (this.userName.length > 20) {
        return this.$toast('输入的姓名过长')
      }
      if (this.phoneNum.length > 16) {
        return this.$toast('输入的手机号过长')
      }
      if (this.addressInfo.length > 30) {
        return this.$toast('输入的地址过长')
      }
      this.axios.post('water/address/insert2', data)
        .then(() => {
          this.$toast('添加地址成功')
          this.$router.back()
        })
        .catch(() => {
          this.$toast('服务器开小差了')
        })
    }
  }
}
</script>

<style scoped>
/* 内容区样式 */
.mid{
  padding-top: 40px;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.district {
  padding-top: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
input[type=text] {
  border: 0;
  display: inline-block;
  width: 32%;
  text-align: center;
  font-size: 14px;
  height: 3rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
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
/*选择区域样式 */
.popup-container {
  width: 100%;
}
.address {
  height: 14rem;
  width: 100%;
  padding-top: 3rem;
}
.address-info {
  margin-top: 0.5rem;
}
.confirm {
  position: absolute;
  right: 1rem;
  top: 0.7rem;
}
.cal {
  position: absolute;
  left: 1rem;
  top: 0.7rem;
}
</style>
