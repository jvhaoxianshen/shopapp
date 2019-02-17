<template>
  <div class="container">
    <div class="check-box" @click="show" :class="{show: selected}">
      <div></div>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    index: Number
  },
  computed: {
    selected: {
      set: function () {
      },
      get: function () {
        if (this.index === undefined || this.index === '') {
          return ''
        } else if (this.index === -1) {
          return this.$store.getters.getAllSelected
        } else {
          return this.$store.getters.getselected(this.index)
        }
      }
    }
  },
  methods: {
    show: function () {
      if (this.index === undefined || this.index === '') {
        return ''
      }
      if (this.index === -1) {
        this.$store.commit('changeAllSelected')
        // this.selected = this.$store.getters.getAllSelected
      } else {
        this.$store.commit('changeSelected', this.index)
        // this.selected = this.$store.getters.getselected(this.index)
      }
    }
  }
}
</script>

<style scoped>
  .check-box {
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 20px;
    position: relative;
    vertical-align: middle;
    border: solid 1px #ccc;
    background-color: #FFFFFF;
  }
  .show {
    background-color: deepskyblue;
    border: 0;
  }
  .check-box span {
    width: 25px;
    height: 25px;
  }
  .check-box span:after {
    content: '\00a0';
    display: inline-block;
    border: 2px solid #fff;
    border-top-width: 0px;
    border-right-width: 0;
    width: 13px;
    height: 6px;
    transform: rotate(-50deg);
    position: absolute;
    text-autospace: 2px;
    left: 5px;
    top: 6px;
  }
</style>
