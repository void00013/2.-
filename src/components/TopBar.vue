<template>
  <div class="topBar">
    <div class="to">
      <img src="../assets/svg/zuo.svg" alt="左" @click="$router.go(-1)">
      <img src="../assets/svg/you.svg" alt="右" @click="$router.go(1)">
      <img src="../assets/svg/shuaxin.svg" alt="刷新" @click="reload">
    </div>
    <div class="search">
      <img src="../assets/svg/搜索.svg" alt="搜索">
      <!--  @keydown.enter="ceshi" 按键只要按下就会一直触发事件，所以一般用keyup -->
      <input type="text" v-model.trim="ipt" @keyup.enter="$router.push(`/index/searchlist/${ipt}`)">
    </div>
    <div class="user">
      <div class="avatar">
        <img src="../assets/images/avatar.jpg" alt="">
      </div>
      <div class="userInfo">
        <ul v-if="!token">
          <li @click="$router.push('/login')">登录 / 注册</li>
        </ul>
        <ul v-else>
          <li @click="$router.push('/usercenter')">个人中心</li>
          <li>修改密码</li>
          <li>退出登录</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {
      ipt: '',
      token: localStorage.getItem('token')
    }
  },
  methods: {
    reload() {
      // 注意：location 下的属性和方法只能在方法内调用，不能直接写在@click中
      location.reload()
    }
  },
}
</script>

<style lang="less" scoped>
.topBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  .to {
    margin-left: 10px;
    img {
      cursor: pointer;
      width: 20px;
      margin: 0 10px;
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
  }
  .search {
    position: relative;
    width: 300px;
    height: 30px;
    img {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      width: 20px;
      margin-left: 6px;
    }
    input {
      width: 100%;
      height: 100%;
      color: #fff;
      padding-left: 32px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 15px;
      background-color: transparent;
    }
  }
  .user {
    cursor: pointer;
    position: relative;
    width: 30px;
    height: 30px;
    margin-right: 20px;
    &:hover .userInfo {
      display: block;
    }
    .avatar {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        &:hover {
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
      }
    }
    .userInfo {
      display: none;
      position: absolute;
      top: 40px;
      left: -35px;
      width: 100px;
      font-size: 12px;
      &:hover {
        box-shadow: 0 0 30px rgba(100, 100, 100, 0.5);
      }
      &::before {
        content: '';
        position: absolute;
        top: -10px;
        left: 40px;
        width: 0;
        height: 0;
        border: 10px solid rgba(204, 204, 204, 0.5);
        border-top: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
      }
      ul {
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
        background-color: rgba(204, 204, 204, 0.5);
        li {
          height: 30px;
          line-height: 30px;
          text-align: center;
          transition: all 0.3s;
          &:hover {
            background-color: rgba(119, 119, 119, 0.3);
          }
        }
      }
    }
  }
}
</style>