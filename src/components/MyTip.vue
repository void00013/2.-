<template>
  <div class="myTip" ref="myTip">{{ tip }}</div>
</template>

<script>
export default {
  name: 'MyTip',
  // props自定义属性数组内的变量需要用''括起来
  props: [ 'tipTemp', 'isShow' ],
  data() {
    return {
      tip: '提示',
    }
  },
  watch: {
    tipTemp(newValue) {
      this.tip = newValue
    },
    isShow(newValue) {
      if(newValue) {
        this.$refs.myTip.style.opacity = 1
      } else {
        this.$refs.myTip.style.opacity = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.myTip {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.5s;
  opacity: 0;
  width: 500px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  text-align: center;
  border-radius: 15px;
  z-index: 999;
}
</style>