<template>
  <div
    class="banner"
    v-loading="loading"
    element-loading-background="rgba(122, 122, 122, 0.3)"
  >
    <div class="view" @mouseenter="mousehover" @mouseleave="mouseout">
      <a href="javascript:;" class="move left" @click.prevent="btnLeft">
        <img src="../assets/svg/zuo.svg" alt="左">
      </a>
      <a href="javascript:;" class="move right" @click="btnRight">
        <img src="../assets/svg/you.svg" alt="右">
      </a>
      <ul ref="banner" id="banner" @transitionend="endTrn">
        <li v-if="banners.length !== 0">
          <a href="javascript:;">
            <img :src="banners[banners.length - 1].imageUrl" :alt="banners[banners.length - 1].targetId">
          </a>
        </li>
        <li v-for="item in banners" :key="item.targetId">
          <a href="javascript:;">
            <img :src="item.imageUrl" :alt="item.targetId">
          </a>
        </li>
        <li v-if="banners.length !== 0">
          <a href="javascript:;">
            <img :src="banners[0].imageUrl" :alt="banners[0].targetId">
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Banner } from '../api/index'
export default {
  name: 'Banner',
  data() {
    return {
      loading: true,
      banners: [],
      num: -1,
      // 节流阀
      flag: true,
      timer: null
    }
  },
  methods: {
    async getBanner() {
      try {
        const { data:res } = await Banner()
        // console.log(res)
        this.loading = false
        if(res.code !== 200) return ;
        this.banners = res.banners
      } catch (error) {
        console.log(error)
      }
    },
    btnLeft() {
      if(this.flag) {
        this.flag = false
        this.num++
        this.$refs.banner.style.transition = 'all 0.5s'
        this.$refs.banner.style.transform = `translateX(${this.num * 540}px)`
      }
    },
    btnRight() {
      if(this.flag) {
        this.flag = false
        this.num--
        this.$refs.banner.style.transition = 'all 0.5s'
        this.$refs.banner.style.transform = `translateX(${this.num * 540}px)`
        // var banner = document.getElementById('banner')
        // console.log(banner)
        // banner.style.transition = 'all 0.5s'
        // banner.style.transform = `translateX(${this.num * 540}px)`
      }
    },
    // 轮播图过渡完成的事件
    endTrn() {
      this.flag = true
      if(this.num === 0) {
        this.$refs.banner.style.transition = 'none'
        this.num = -8
        this.$refs.banner.style.transform = `translateX(${this.num * 540}px)`
      } else if(this.num === -9) {
        this.$refs.banner.style.transition = 'none'
        this.num = -1
        this.$refs.banner.style.transform = `translateX(${this.num * 540}px)`
      }
    },
    mousehover() {
      clearInterval(this.timer)
      this.timer = null
    },
    mouseout() {
      this.timer = setInterval(() => {
        this.btnRight()
      }, 2000)
    }
  },
  created() {
    this.getBanner()
  },
  updated() {
    if(this.banners.length !== 0) {
      this.timer = setInterval(() => {
        this.btnRight()
      }, 2000)
    }
  },
  // 如果一个组件内设置了定时器，那么在卸载组件时一定要清除该定时器
  // 因为定时器内部操作该组件内的dom元素，如果不清除，在卸载之后就无法拿到该组件内的元素，这时程序就会崩溃
  // destroyed() {
  //   clearInterval(this.timer)
  // },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
}
</script>

<style lang="less" scoped>
.banner {
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: rgba(119, 119, 119, 0.3);
  .view {
    position: relative;
    width: 540px;
    height: 100%;
    margin: auto;
    overflow: hidden;
    .move {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;
      width: 20px;
      height: 20px;
      z-index: 1;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .left {
      left: 10px;
    }
    .right {
      right: 10px;
    }
    ul {
      width: calc(540px * 10);
      height: 100%;
      transition: all 0.5s;
      transform: translateX(-540px);
      li {
        height: 100%;
        display: inline-block;
        a {
          height: 100%;
          img {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>