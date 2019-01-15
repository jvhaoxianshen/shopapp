<template>
<div class="loading-container" @touchmove.prevent >
  <mt-spinner type="snake" :size="40" class="loading" color="#26a2ff"></mt-spinner>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.loading-container {
  width: 100%;
  height: 100%;
  background-color: #111111;
  opacity: 0.92;
  position: fixed;
  z-index: 999;
}
.loading {
  position: fixed;
  top: 47%;
  left: 45%;
}
</style>
