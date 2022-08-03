<template>
  <div class="menu">
    <!-- 推荐 -->
    <div class="typeList">
      <h3>推荐</h3>
      <ul>
        <li @click="$router.push('/index/find')">每日推荐</li>
        <li @click="$router.push('/aa')">歌曲搜索</li>
      </ul>
    </div>
    <!-- 我的音乐 -->
    <div class="typeList">
      <h3>我的音乐</h3>
      <ul>
        <li>我的收藏</li>
        <li>我的电台</li>
        <li>本地与下载</li>
        <li>音乐云盘</li>
        <li>最近播放</li>
        <li>默认列表</li>
      </ul>
    </div>
    <!-- 主题 -->
    <div class="typeList">
      <h3>美化</h3>
      <ul>
        <li>主题</li>
      </ul>
    </div>
    <!-- 我的歌单 -->
    <div class="typeList">
      <h3>自建歌单</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
}
</script>

<style lang="less" scoped>
.menu {
  width: 100%;
  height: 100%;
  padding: 10px;
  border-right: 1px solid rgba(204, 204, 204, 0.5);
  .typeList {
    margin-bottom: 10px;
    h3 {
      font-weight: 400;
      margin-bottom: 5px;
    }
    ul {
      font-size: 15px;
      li {
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        margin: 20px 0;
        padding-left: 10px;
        border-radius: 15px;
        color: rgba(221, 221, 221, 0.5);
        &:hover {
          background-color: rgba(170, 170, 170, 0.5);
        }
      }
    }
  }
}
</style>