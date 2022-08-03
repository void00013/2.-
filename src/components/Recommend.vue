<template>
  <div class="recommend">
    <div class="cards">
      <div class="card" v-for="item in data" :key="item" @click="toDetail(item)">
        <img :src="item.picUrl">
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { recommend } from '../api/index'
export default {
  name: 'Recommend',
  data() {
    return {
      data: []
    }
  },
  methods: {
    async getRecommend() {
      try {
        const { data:res } = await recommend()
        // console.log(res)
        if(res.code !== 200) return ;
        this.data = res.result
      } catch (error) {
        console.log(error)
      }
    },
    toDetail(item) {
      this.$router.push(`/index/songdetail/${item.id}`)
    }
  },
  created() {
    this.getRecommend()
  },
}
</script>

<style lang="less" scoped>
.recommend {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  .cards {
    width: 100%;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .card {
      cursor: pointer;
      width: 210px;
      height: 280px;
      margin: 0 10px;
      img {
        width: 100%;
        border-radius: 10px;
      }
      p {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        text-align: center;
      }
    }
  }
}
</style>