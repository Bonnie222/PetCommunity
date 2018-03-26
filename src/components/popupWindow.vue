<template>
  <div class="popup-wrap">
    <div class="overlayer" v-show="showPopup" @click="hideWindow()"></div>
    <div class="commonWindow-wrap" v-show="showPopup">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false,
    };
  },
  methods: {
    showWindow() {
      this.showPopup = true;
    },
    hideWindow() {
      this.showPopup = false;
    },
  },
};
</script>

<style lang="less">
.overlayer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .7);
  z-index: 998;
}
.commonWindow-wrap {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
}
</style>
