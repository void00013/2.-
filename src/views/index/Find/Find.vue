<template>
  <div class="find">
    <div class="carousel">
      <Banner></Banner>
    </div>
    <div class="recommendBox">
      <Recommend></Recommend>
    </div>
  </div>
</template>

<script>
import Banner from '../../../components/banner.vue'
import Recommend from '../../../components/Recommend.vue'
import { recommend } from '../../../api/index'
export default {
  name: 'Find',
  methods: {
    async getRecommend() {
      try {
        const { data:res } = await recommend(10)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  },
  // created() {
  //   this.getRecommend()
  // },
  components: {
    Banner,
    Recommend
  }
}
</script>

<style lang="less" scoped>
.find {
  width: 100%;
  height: 100%;
  padding: 10px;
  .carousel {
    width: 100%;
    height: 200px;
  }
  .recommendBox {
    width: 100%;
    margin: 10px 0;
  }
}
</style>