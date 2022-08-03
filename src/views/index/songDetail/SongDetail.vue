<template>
  <div class="songDetail">
    <div class="songListInfo">
      <img :src="playlist.coverImgUrl" alt="歌单图片">
      <h1>{{ playlist.name }}</h1>
      <span v-for="item in playlist.tags" :key="item">{{item}}</span>
      <p>{{ playlist.description }}</p>
    </div>
    <div class="songList">
      <div class="musicList">歌曲列表</div>
      <ul v-if="musicInfo.length !== 0">
        <li
          v-for="item in musicInfo"
          :key="item"
          @mouseenter="showControl(item.musicName)"
          @mouseleave="hideControl(item.musicName)"
        >
          <span class="name">{{item.musicName}}</span>
          <span class="singer">{{item.singer}}</span>
          <span class="control">
            <img class="playbtn" :ref="item.musicName + '1'" @click="playMusic(item.musicName, item.songUrl)" src="../../../assets/svg/播放.svg" alt="">
            <img class="stopbtn" :ref="item.musicName + '2'" @click="stopMusic(item.musicName, item.songUrl)" src="../../../assets/svg/暂停.svg" alt="">
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { songDetail, musicUrl } from '../../../api/index'
import bus from '../../../utils/eventbus'
export default {
  name: 'SongDetail',
  props: [ 'id' ],
  emits: [ 'playMusic' ],
  data() {
    return {
      limit: 10,
      offset: 0,
      playlist: {
        name: '',
        tags: [],
        coverImgUrl: '',
        description: ''
      },
      songId: [],
      songUrl: [],
      musicName: [],
      singer: [],
      musicInfo: [],
      selectedMusic: '',
      refName: ''
    }
  },
  methods: {
    // 获取歌单详情的数据
    async getSongDetail() {
      try {
        const { data:res } = await songDetail(this.id)
        // console.log(res)
        if(res.code !== 200) return ;
        this.playlist = res.playlist
        res.privileges.forEach((item) => {
          this.songId.push(item.id)
        })
        res.playlist.tracks.forEach((item) => {
          this.musicName.push(item.name)
          this.singer.push(item.ar[0].name)
        })
        this.getMusicUrl()
      } catch (error) {
        console.log(error)
      }
    },
    // 通过id获取音乐url
    async getMusicUrl() {
      try {
        const { data:res } = await musicUrl(this.songId.join(','))
        // console.log(res)
        if(res.code !== 200) return ;
        res.data.forEach((item) => {
          // if(item.url) {
          this.songUrl.push(item.url)
          // }
        })
        // console.log(this.songUrl)
        // 记录最后一个元素的索引，如果空的是最后一个元素，在判断为空删除后要及时跳出循环，不能再继续追加
        let lastIndex = this.songUrl.length - 1
        for(let i = 0; i < this.songUrl.length; i++) {
          if(!this.songUrl[i]) {
            this.songId.splice(i, 1)
            this.songUrl.splice(i, 1)
            this.musicName.splice(i, 1)
            this.singer.splice(i, 1)
            if(i === lastIndex) { break }
          }
          // 实时更新最后的索引，因为中间的元素被删除会影响数组长度
          lastIndex = this.songUrl.length - 1
          let musicObj = {
            songUrl: '',
            musicName: '',
            singer: ''
          }
          musicObj.songUrl = this.songUrl[i]
          musicObj.musicName = this.musicName[i]
          musicObj.singer = this.singer[i]
          // console.log(musicObj)
          this.musicInfo.push(musicObj)
        }
        // console.log(this.musicInfo)
        // console.log(this.songId)
        // console.log(this.songUrl)
        // console.log(this.musicName)
        // console.log(this.singer)
      } catch (error) {
        console.log(error)
      }
    },
    // 显示播放和暂停控件
    showControl(name) {
      if(this.selectedMusic === name) { return }
      this.$refs[name + '1'][0].style.display = 'block'
    },
    // 隐藏显示和播放控件
    hideControl(name) {
      // 这三行不论播放还是暂停控件在鼠标离开时都会隐藏
      // if(this.selectedMusic === name) { this.refName = name + '2' }
      // else { this.refName = name + '1' }
      // this.$refs[this.refName][0].style.display = 'none'

      // 这两行只隐藏播放控件，显示暂停控件
      if(this.selectedMusic === name) { return }
      this.$refs[name + '1'][0].style.display = 'none'
    },
    // 播放音乐
    playMusic(name, url) {
      // 隐藏之前选中音乐的暂停控件
      if(this.selectedMusic !== '') {
        this.$refs[this.selectedMusic + '1'][0].style.display = 'none'
        this.$refs[this.selectedMusic + '2'][0].style.display = 'none'
      }
      this.selectedMusic = name
      this.$refs[name + '1'][0].style.display = 'none'
      this.$refs[name + '2'][0].style.display = 'block'
      bus.emit('playMusic', url)
    },
    // 暂停音乐
    stopMusic(name) {
      this.$refs[name + '2'][0].style.display = 'none'
      this.$refs[name + '1'][0].style.display = 'block'
      bus.emit('stopMusic')
    }
  },
  created() {
    this.getSongDetail()
  },
  mounted() {
    bus.on('bottomPlay', () => {
      this.$refs[this.selectedMusic + '1'][0].style.display = 'none'
      this.$refs[this.selectedMusic + '2'][0].style.display = 'block'
    })
    bus.on('bottomPause', () => {
      this.$refs[this.selectedMusic + '2'][0].style.display = 'none'
      this.$refs[this.selectedMusic + '1'][0].style.display = 'block'
    })
  },
}
</script>

<style lang="less" scoped>
.songDetail {
  width: 100%;
  height: 100%;
  padding: 10px;
  .songListInfo {
    position: relative;
    width: 100%;
    height: 300px;
    padding: 30px;
    border-radius: 10px;
    overflow: auto;
    border: 1px solid rgba(204, 204, 204, 0.5);
    img {
      height: 100%;
      margin-right: 30px;
      border-radius: 10px;
      vertical-align: middle;
    }
    h1 {
      position: absolute;
      top: 50px;
      font-weight: 500;
      display: inline-block;
    }
    span {
      margin: 0 10px;
    }
    p {
      height: 64px;
      line-height: 32px;
      // overflow: hidden;
      font-size: 16px;
      // 首行缩进2个
      text-indent: 32px;
      // text-indent: 2em;
      // 弹性伸缩盒子模型显示 有兼容性问题 只有webkit浏览器才支持
      // display: -webkit-box;
      // 限制在一个块元素显示的文本的行数
      // -webkit-line-clamp: 2;
      // 最后一行显示省略号
      // text-overflow: ellipsis;
      // 设置或检索伸缩盒对象的子元素的排列方式 垂直居中
      // -webkit-box-orient: vertical;
    }
  }
  .songList {
    width: 100%;
    margin: 10px 0;
    .musicList {
      width: 100%;
      height: 30px;
      line-height: 30px;
      margin: 10px 0;
    }
    ul {
      width: 100%;
      padding: 0 10px;
      border-radius: 10px;
      border: 1px solid rgba(204, 204, 204, 0.5);
      li {
        position: relative;
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        padding: 0 10px;
        margin: 10px 0;
        .singer {
          position: absolute;
          left: 600px;
        }
        // 行内元素不能指定宽高
        .control {
          cursor: pointer;
          position: absolute;
          right: 10px;
          display: inline-block;
          width: 30px;
          height: 30px;
          vertical-align: middle;
          img {
            position: absolute;
            top: 0;
            left: 0;
            display: none;
            width: 100%;
            height: 100%;
          }
        }
        &:hover {
          background-color: rgba(204, 204, 204, 0.1);
        }
      }
    }
  }
}
</style>