<template>
  <div class="playMusic">
    <audio :src="musicUrl" @play="play" @pause="pause" autoplay loop controls></audio>
  </div>
</template>

<script>
import bus from '../utils/eventbus'
export default {
  name: 'PlayMusic',
  data() {
    return {
      // audio: null,
      musicUrl: ''
    }
  },
  methods: {
    play() {
      bus.emit('bottomPlay')
    },
    pause() {
      bus.emit('bottomPause')
    },
  },
  // 播放和暂停必然在dom元素渲染上去之后触发，所以写在首次渲染完成的生命周期函数中即可
  mounted() {
    const audio = document.querySelector('audio')
    bus.on('playMusic', url => {
      this.musicUrl = url
      // audio.paused 如果音频已暂停返回true 没暂停返回false
      if(audio.paused) {audio.play()}
    })
    bus.on('stopMusic', () => {
      if(!audio.paused) {audio.pause()}
    })
  },
}
</script>

<style lang="less" scoped>
.playMusic {
  width: 100%;
  height: 100%;
  border-top: 1px solid rgba(204, 204, 204, 0.5);
  audio {
    width: 100%;
  }
}
</style>