<template>
  <div class="product-container container">
    <mt-search
      v-model="searchValue"
      cancel-text="取消"
      placeholder="搜索">
    </mt-search>
    <div class="product-List">
      <li class="product-card" @click="go">
      </li>
      <li class="product-card">
      </li>
      <li class="product-card">
      </li>
      <li class="product-card">
      </li>
      <li class="product-card">
      </li>
      <li class="product-card">
      </li>
      <li class="product-card">
      </li>
      <li class="product-card">
      </li>
      <li class="product-card">
      </li>
      <li class="product-card">
      </li>
      <li class="product-card">
      </li>
      <li class="product-card">
      </li>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchValue: ''// 搜索内容
    }
  },
  methods: {
    go: function () {
      this.$router.push({ name: 'ProductDeatils' })
    }
  }
}
</script>

<style scoped>
  .product-container {
    overflow: auto;
  }
  /*搜索区域*/
  .mint-search {
    height: 3rem;
    position: fixed;
    width: 100%;
  }
   /*产品列表样式*/
  .product-List {
    padding: 3rem 1.5% 4rem;
    overflow: auto;
    background-color: #f3f3f3;
  }
  /*产品卡片样式*/
  .product-card {
    width: 47%;
    height: 11rem;
    float: left;
    margin: 0.6rem 1.5% 0;
    background: #FFFFFF;
    border-radius: 8px;
  }
</style>
