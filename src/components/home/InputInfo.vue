<template>
<div class="container" v-if="show">
  <!-- 遮罩层开始 -->
  <div class="add-info-container" >
    <h4 class="company-name">门捷列夫生物科技（杭州）有限公司</h4>
    <p class="kefu-phone">客服热线：0571-83819690</p>
    <p class="tips">
      为了给您提供更好的服务，请您提供真实姓名和电话号码。
    </p>
    <mt-field label="姓名" placeholder="请输入真实姓名" v-model="name"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" v-model="phoneNum"></mt-field>
    <input type="button" value="确认" class="confirm-btn" @click="importInfo()">
  </div>
  <!-- 遮罩层结束 -->
</div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      phoneNum: '',
      show: true
    }
  },
  methods: {
    importInfo: function () {
      let data = {
        custId: this.$store.getters.getOpenid,
        realName: this.name,
        phoneNum: this.phoneNum
      }
      this.axios.post('water/user/updateUser', data)
        .then(res => {
          this.$toast('添加信息成功')
          this.show = false
        })
    }
  }
}
</script>

<style scoped>
.container {
  background: #FFFFFF;
  position: fixed;
  width: 100%;
  z-index: 999;
}
.add-info-container {
  height: 100%;
  width: 100%;
  background: #FFFFFF;
  position: relative;
  z-index: 99;
}
.company-name {
  padding: 0.6rem;
  padding-left: 1rem;
  color: #00BFFF;
  margin-top: 0;
  text-align: center;
}
.kefu-phone {
  font-size: 21px;
  text-align: center;
  margin-top: 3rem;
  color: #00BFFF;
}
.tips {
  width: 100%;
  text-align: center;
  margin-top: 4.5rem;
  padding: 0 3rem;
  margin-bottom: 1.5rem;
}
.name-label {
  margin-top: 0.6rem;
  display: inline-block;
  padding-left: 1rem;
  color: #8C8C8C;
}
.rname {
  width: 60%;
  float: right;
  margin-right: 15%;
}
.rname input {
  border-radius: 0px;
  font-size: 14px;
  border-left: 0;
  border-right: 0;
  border-top: 0;
}
.phone-label {
  display: inline-block;
  padding-left: 1rem;
  position: absolute;
  left: 0;
  padding-top: 4.6rem;
  color: #8C8C8C;
}
.phone {
  width: 60%;
  float: right;
  margin-right: 15%;
}
.phone input {
  border-radius: 0px;
  font-size: 14px;
  border-left: 0;
  border-right: 0;
  border-top: 0;
}
.add-info-container .confirm-btn {
  width: 80%;
  position: absolute;
  top: 27rem;
  left: 10%;
  height: 3rem;
  border-radius: 10px;
  background-color: #00BFFF;
  color: #FFFFFF;
  border: 0px;
}
</style>
