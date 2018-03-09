<template>
  <span v-if="showLoading" class="loading">
    <mt-spinner type="fading-circle"></mt-spinner>
  </span>
</template>
<script>
export default {
  props: {
    showLoading : { type: Boolean, default: false },
  }
}
</script>
<style lang="less" scoped>
.loading{
  position: fixed;
  top: 50%;
  left: 45%;
  // vertical-align: middle;
}
</style>
