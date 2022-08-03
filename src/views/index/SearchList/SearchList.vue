<template>
  <div class="searchList">
    <div class="songList">
      <ul v-if="songsInfo.length !== 0">
        <li
          v-for="item in songsInfo"
          :key="item"
          @mouseenter="showControl(item.songId)"
          @mouseleave="hideControl(item.songId)"
        >
          <span class="name">{{item.songName}}</span>
          <span class="singer">{{item.singer}}</span>
          <span class="control">
            <img class="playbtn" :ref="item.songId + '1'" @click="playMusic(item.songId, item.songUrl)" src="../../../assets/svg/播放.svg">
            <img class="stopbtn" :ref="item.songId + '2'" @click="stopMusic(item.songId, item.songUrl)" src="../../../assets/svg/暂停.svg">
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { searchMusic, musicUrl } from '../../../api/index'
import bus from '../../../utils/eventbus'
export default {
  name: 'SearchList',
  props: [ 'ipt' ],
  data() {
    return {
      songsId: [],
      songsName: [],
      singers: [],
      songsUrl: [],
      songsInfo: [],
      selectedMusic: '',
    }
  },
  methods: {
    async search() {
      try {
        const { data:res } = await searchMusic(this.ipt)
        if(res.code !== 200) { return }
        // console.log(res)
        res.result.songs.forEach(item => {
          this.songsName.push(item.name)
          this.songsId.push(item.id)
          this.singers.push(item.ar[0].name)
        })
        // console.log(this.songsId)
        this.getMusicUrl()
      } catch (error) {
        console.log(error)
      }
    },
    // 通过id获取音乐url
    async getMusicUrl() {
      try {
        const { data:res } = await musicUrl(this.songsId.join(','))
        // console.log(res)
        if(res.code !== 200) return ;
        res.data.forEach((item) => {
          // 把null值也添加进来最后统一删除
          this.songsUrl.push(item.url)
        })
        // console.log(this.songsUrl)
        // 记录最后一个元素的索引，如果空的是最后一个元素，在判断为空删除后要及时跳出循环，不能再继续追加
        let lastIndex = this.songsUrl.length - 1
        for(let i = 0; i < this.songsUrl.length; i++) {
          if(!this.songsUrl[i]) {
            this.songsId.splice(i, 1)
            this.songsUrl.splice(i, 1)
            this.songsName.splice(i, 1)
            this.singers.splice(i, 1)
            if(i === lastIndex) { break }
          }
          // 实时更新最后的索引，因为中间的元素被删除会影响数组长度
          lastIndex = this.songsUrl.length - 1
          let musicObj = {
            songId: '',
            songUrl: '',
            songName: '',
            singer: ''
          }
          musicObj.songId = this.songsId[i]
          musicObj.songUrl = this.songsUrl[i]
          musicObj.songName = this.songsName[i]
          musicObj.singer = this.singers[i]
          // console.log(musicObj)
          this.songsInfo.push(musicObj)
        }
        // console.log(this.songsInfo)
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
      // 这两行只隐藏播放控件，显示暂停控件
      if(this.selectedMusic === name) { return }
      this.$refs[name + '1'][0].style.display = 'none'
    },
    // 播放音乐
    playMusic(name, url) {
      // 第一次点击播放按钮时 selectedMusic 为 '' 不执行隐藏暂停控件的语句
      // 之后 selectedMusic 不为 '' ，可以执行
      if(this.selectedMusic !== '') {
        // 隐藏之前选中音乐的暂停控件
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
    this.search()
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
.searchList {
  width: 100%;
  height: 100%;
  padding: 10px;
  .songList {
    width: 100%;
    margin: 10px 0;
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