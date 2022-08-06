<template>
  <div class="recommend">
    <h3>推荐歌单</h3>
    <div class="recommendSongSheet">
      <div class="cards">
        <div class="card" v-for="item in songSheetData" :key="item" @click="toDetail(item)">
          <img :src="item.picUrl">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <h3>推荐mv</h3>
    <div class="recommendMv" v-if="mvData.length !== 0">
      <div class="videoCard" v-for="item in mvData" :key="item.id">
        <video :src="item.url" controls>
          <!--  <source> 元素可以链接到不同的视频文件。浏览器将使用第一个可识别的格式 -->
          <!-- source只能链接本地视频资源，video上的src才既能链接网络资源http，也能链接本地资源 -->
          <!-- <source :src="item.url"> -->
          您的浏览器太low了，不支持播放此视频
        </video>
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { recommend, recommendMv, mvAddress } from '../api/index'
export default {
  name: 'Recommend',
  data() {
    return {
      songSheetData: [],
      mvData: [],
    }
  },
  methods: {
    async getRecommend() {
      try {
        const { data:res } = await recommend()
        // console.log(res)
        if(res.code !== 200) return ;
        this.songSheetData = res.result
      } catch (error) {
        console.log(error)
      }
    },
    toDetail(item) {
      this.$router.push(`/index/songdetail/${item.id}`)
    },
    async getRecommendMv() {
      try {
        const { data:res } = await recommendMv()
        // console.log(res)
        if(res.code !== 200) return ;
        this.mvData = res.result
        this.mvData.forEach(item => {
          this.getMvUrl(item)
        })
        // console.log(this.mvUrl)
        // console.log(this.mvData)
      } catch (error) {
        console.log(error)
      }
    },
    async getMvUrl(item) {
      try {
        const { data:res } = await mvAddress(item.id)
        // console.log(res)
        if(res.code !== 200) { return }
        item.url = res.data.url
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.getRecommend()
    this.getRecommendMv()
  },
}
</script>

<style lang="less" scoped>
.recommend {
  width: 100%;
  height: 100%;
  h3 {
    margin-left: 10px;
    font-weight: 400;
  }
  .recommendSongSheet {
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
  .recommendMv {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 90%;
    height: 100%;
    margin: 0 auto;
    padding: 0 10px;
    .videoCard {
      display: inline-block;
      width: 600px;
      margin: 10px 0;
      video {
        width: 100%;
      }
      p {
        width: 100%;
        text-align: center;
        font-size: 16px;
      }
    }
  }
}
</style>