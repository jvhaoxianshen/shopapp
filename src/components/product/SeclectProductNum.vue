<template>
<div class="container" @touchmove.prevent v-if="show">
  <!-- 遮罩区域开始 -->
  <div class="mask" @click="closeSetNumWindow"></div>
  <!-- 遮罩区结束 -->
  <!-- 修改数量区开始 -->
  <div class="setNum-container">
    <img src="../../assets/icon/productDetail/close.svg" alt="" class="close-icon" @click="closeSetNumWindow">
    <!-- 产品介绍区开始 -->
    <div class="product-container">
      <transition>
        <img :src="proData.proPic[0].pic" alt="" v-bind:class="{ bigimg: isActive }">
      </transition>
      <span class="product-price" v-bind:class="{ pstyle: isActive, pfirst:isActive, pleft:isleft }">{{'￥' + proData.productPrice}}</span>
      <span class="product-num" v-bind:class="{ pstyle: isActive, pleft:isleft}">{{'库存' + proData.productNum}}</span>
      <span class="product-name" v-bind:class="{ pstyle: isActive, pleft:isleft }">{{ proData.productName}}</span>
    </div>
    <!-- 产品介绍区结束 -->
    <!-- 修改数量按钮区开始 -->
    <div class="product-setnumcontainer" @touchstart="down" @touchmove="move" @touchend="end" ref="box" >
      <span @touchend.stop="">购买数量</span>
      <div class="product-setnumicon" @touchend.stop="">
        <div class="posit posit-jian" @touchend="jiannums">
          <div class="posit-jianicon"></div>
        </div>
        <div class="posit posit-num">{{nums}}</div>
        <div class="posit posit-add" @touchend="addnums">
          <div class="posit-addicon"></div>
        </div>
      </div>
    </div>
    <!-- 修改数量按钮区结束 -->
    <!-- 底部按钮区开始 -->
    <div class="footer-container">
      <div class="confirm-btn" @click="confirm">确定</div>
    </div>
    <!-- 底部按钮区结束 -->
  </div>
  <!-- 修改数量区结束 -->
</div>
</template>

<script>
export default {
  data () {
    return {
      show: this.setNumShow, // 是否显示
      proData: this.productDetail, // 商品数据
      nums: 1, // 商品数量
      position: {
        x: 0,
        y: 0
      },
      nx: '',
      ny: '', // 当前位置
      dx: '',
      dy: '', // 原始位置
      xPum: '',
      yPum: '', // 最终位置
      flags: false,
      status: false,
      isActive: false,
      isleft: false
    }
  },
  props: {
    setNumShow: Boolean,
    productDetail: Object,
    buyType: String
  },
  methods: {
    // 关闭数量设置框样式
    closeSetNumWindow: function () {
      this.$emit('toClose', false)
    },
    // 打开数量设置框
    openSetNumWindow: function () {
      this.show = true
    },
    // 增加数量
    addnums: function () {
      if (this.nums >= 3) {
        this.$toast('购买数量不能超过3')
        return
      }
      this.nums++
    },
    // 减少数量
    jiannums: function () {
      if (this.nums <= 1) {
        this.$toast('购买数量不能低于1')
        return
      }
      this.nums--
    },
    down: function () {
      this.flags = true
      var touch
      if (event.touches) {
        touch = event.touches[0]
      } else {
        touch = event
      }
      this.position.y = touch.clientY // 触摸点位置
      this.dy = this.$refs.box.offsetTop // 记录位置
    },
    // 下拉移动效果
    move: function () {
      if (this.flags) {
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        this.ny = touch.clientY - this.position.y
        this.yPum = this.dy + this.ny
        this.$refs.box.style.top = this.yPum + 'px'
        if (this.yPum < this.dy) {
          this.status = true
          this.isActive = false
        } else {
          this.status = false
        }
        // 阻止页面的滑动默认事件
        document.addEventListener('touchmove', function () {
          event.preventDefault()
        }, false)
      }
    },
    // 移动后最终效果
    end: function () {
      if (!this.status) {
        this.$refs.box.style.top = '17rem'
        this.isActive = true
        this.isleft = false
        this.status = true
        setTimeout(() => {
          this.isleft = true
        }, 500)
      } else {
        this.$refs.box.style.top = '6.5rem'
        this.status = false
        this.isActive = false
        setTimeout(() => {
          this.isleft = false
        }, 500)
      }
    },
    // 添加购物车或立即购买事件
    confirm: function () {
      if (this.buyType === '0') {
        // 加入购物车
        var data = {
          productId: this.productDetail.productId,
          buyNum: this.nums,
          custId: this.$store.getters.getOpenid
        }
        this.axios.post('water/shopCar/insert', data)
          .then(() => {
            this.$toast('添加成功')
          })
          .catch(() => {
            this.$toast('网络开小差了')
          })
      }
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
  -webkit-border-top-left-radius: 25px;
  -webkit-border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 1rem;
  overflow: hidden;
}
/* 关闭按钮样式 */
.close-icon {
  width: 1.6rem;
  position: absolute;
  right: 1rem;
  z-index: 9999;
}
/* 产品简介区开始 */
.product-container {
  width: calc(100% - 2rem);
  width: -webkit-calc(100% - 2rem);
  height: 6rem;
  z-index: 99;
  position: absolute;
  background-color: #FFFFFF;
}
.product-container img {
  width: 6rem;
  position: absolute;
  left: 0;
  transition: all 0.8s ;
}
.product-container .bigimg {
  /* 产品图片放大 */
  width: 12rem;
  position: absolute;
  left: calc((100% - 10.5rem)/2);
  transition: all 1.9s;
}
.bigimg-leave-active {
  position: absolute;
}
.product-container span {
  line-height: 1.2rem;
  transition: all 1s;
  padding-left: 6.3rem;
  text-align: left;
  display: block;
}
.product-container .pstyle {
  line-height: 1.5rem;
  transition: all 0.8s;
}
/* .product-container .pleft {
  text-align: center;
  padding-left: 0;
} */
.product-container .pfirst {
  margin-top: 10rem;
  transition: all 0.8s;
}
.product-price {
  padding-top: 1rem;
  color: red;
}
.product-num {
  font-size: 12px;
  color: #7C7C6C;
}
.product-name {
  font-size: 12px;
  color: #333333;
}
/* 产品调整数量区样式 */
.product-setnumcontainer {
  width: 90%;
  line-height: 4rem;
  margin-top: 1rem;
  text-align: left;
  border-top: 1px solid #ECECEC;
  /* border-bottom: 1px solid #ECECEC; */
  color: #333333;
  font-size: 14px;
  position: absolute;
  margin-right: 1rem;
  left: 0;
  margin-left: 1rem;
  top: 6.5rem;
  height: 70%;
  transition: all 0.8s  ;
}
/* 设置数量样式 */
.product-setnumicon {
  float: right;
  height: 1.6rem;
  width: 5.4rem;
  margin-top: 1.05rem;
}
.posit {
  float: left;
  font-size: 15px;
  width: 1.5rem;
  height: 1.6rem;
}
.posit-jian {
  background: #F5F5F5;
  -webkit-border-top-left-radius: 4px;
  border-top-left-radius: 4px;
  -webkit-border-bottom-left-radius: 4px;
  border-bottom-left-radius: 4px;
  margin-right: 0.1rem;
}
.posit-jianicon {
  background: url(../../assets/icon/productDetail/jian.svg) center center no-repeat;
  background-size: cover;
  height: 1.6rem;
  width: 0.6rem;
  margin-left: 0.55rem;
}
.posit-num {
  line-height: 1.6rem;
  width: 2.2rem;
  text-align: center;
  background: #EBEBEB;
  font-weight: 700;
  margin-right: 0.05rem;
}
.posit-add {
  background: #E7E7E7;
  -webkit-border-top-right-radius: 4px;
  border-top-right-radius: 4px;
  -webkit-border-bottom-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.posit-addicon {
  background: url(../../assets/icon/productDetail/add.svg) center center no-repeat;
  background-size: cover;
  height: 0.9rem;
  width: 0.7rem;
  margin-top: 0.25rem;
  margin-left: 0.4rem;
}
/* 底部样式 */
.footer-container {
  width: 100%;
  height: 4.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 1rem ;
}
.confirm-btn {
  width: 100%;
  height: 2.5rem;
  background-color: #00BFFF;
  border-radius: 15px;
  line-height: 2.5rem;
  color: #FFFFFF;
}
</style>
