<template>
  <div class="app">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
// 方法一：块级元素，对父级加flex，子盒子加margin: auto; 即可自动上下左右在父盒子中居中
// 方法二：  // position: absolute;
            // top: 50%;
            // left: 50%;
            // transform: translate(-50%, -50%);
.app {
  display: flex;
}
.content {
  width: 90%;
  height: 90%;
  margin: auto;
  border-radius: 20px;
  background-color: rgba(136, 136, 136, 0.3);
  backdrop-filter: blur(5px);
  // filter: blur(5px);
}
</style>
