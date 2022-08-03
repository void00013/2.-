<template>
  <div class="index">
    <div class="top">
      <TopBar></TopBar>
    </div>
    <div class="main">
      <div class="left">
        <Menu></Menu>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <div class="play">
      <PlayMusic></PlayMusic>
    </div>
  </div>
</template>

<script>
import TopBar from '../../components/TopBar.vue'
import Menu from '../../components/Menu.vue'
import PlayMusic from '../../components/playMusic.vue'
export default {
  name: 'Index',
  components: {
    TopBar,
    Menu,
    PlayMusic,
  }
}
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    height: 50px;
    // background-color: aqua;
  }
  .main {
    display: flex;
    width: 100%;
    height: calc(100% - 100px);
    justify-content: space-around;
    // background-color: aqua;
    .left {
      flex: 1;
      height: 100%;
      overflow: auto;
      // background-color: lightblue;
    }
    .content {
      flex: 8;
      height: 100%;
      overflow: auto;
      // background-color: lightcoral;
    }
  }
  .play {
    width: 100%;
    height: 50px;
  }
}
</style>