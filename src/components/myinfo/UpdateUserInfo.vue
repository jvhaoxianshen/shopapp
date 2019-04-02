<template>
<div class="container">
  <!-- 头部导航栏开始 -->
  <mt-header title="修改信息" fixed>
    <mt-button icon="back" slot="left" @click="back"></mt-button>
  </mt-header>
  <!-- 头部导航栏结束 -->
  <!-- 修改信息区域开始 -->
  <div class="mid-container">
    <mt-field label="姓名" placeholder="请输入您的真实姓名" v-model="name"></mt-field>
    <mt-field label="手机号" placeholder="请输入您的手机号码" v-model="phoneNum"></mt-field>
  </div>
  <!-- 修改信息区域结束 -->
  <!-- 底部开始 -->
  <div class="footer">
    <mt-button type="primary" size="large" @click="updateData()">保存信息</mt-button>
  </div>
  <!-- 底部结束 -->
</div>
</template>

<script>
export default {
  data () {
    return {
      name: '', // 用户真实姓名
      phoneNum: '' // 用户手机号
    }
  },
  created: function () {
    this.getUserData()
  },
  methods: {
    // 返回上一页事件
    back: function () {
      this.$router.back()
    },
    // 初始化用户的姓名和手机号码
    getUserData: function () {
      let data = {
        custId: this.$store.getters.getOpenid
      }
      this.axios.post('water/user/selectNamePhone', data)
        .then(res => {
          this.name = res.data[0].realName
          this.phoneNum = res.data[0].phoneNum
        })
        .catch(() => {
          this.$toast('网络开小差了')
        })
    },
    // 修改用户信息
    updateData: function () {
      let data = {
        custId: this.$store.getters.getOpenid,
        realName: this.name,
        phoneNum: this.phoneNum
      }
      this.axios.post('water/user/updateUser', data)
        .then(res => {
          this.$toast('修改成功')
          setTimeout(() => {
            this.$router.back()
          }, 800)
        })
    }
  }
}
</script>

<style scoped>
.container {
  padding-top: 40px;
}
.mid-container {
  height: 100%;
 }
/* 底部样式 */
.footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 0 2rem 1rem;
}
</style>
