<template>
<div class="container" @touchmove.prevent v-if="show">
  <!-- 遮罩区域开始 -->
  <div class="mask"></div>
  <!-- 遮罩区结束 -->
  <!-- 修改数量区开始 -->
  <div class="setNum-container">
    <img src="../../assets/icon/productDetail/close.svg" alt="" class="close-icon" @click="closeSetNumWindow">
  </div>
  <!-- 修改数量区结束 -->
</div>
</template>

<script>
export default {
  data () {
    return {
      show: this.setNumShow
    }
  },
  props: {
    setNumShow: Boolean
  },
  methods: {
    // 关闭数量设置框样式
    closeSetNumWindow: function () {
      this.show = false
    },
    // 打开数量设置框
    openSetNumWindow: function () {
      this.show = true
    }
  }
}
</script>

<style scoped>
/* 组件容器样式 */
.container {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
}
.mask {
  width: 100%;
  background-color: #111111;
  height: 45%;
  opacity: 0.6;
 }
.setNum-container {
  width: 100%;
  background-color: #FFFFFF;
  height: 80%;
  position: fixed;
  bottom: 0;
  opacity: 1;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 1rem;
}
/* 关闭按钮样式 */
.close-icon {
  width: 1.6rem;
  float: right;
}
</style>
