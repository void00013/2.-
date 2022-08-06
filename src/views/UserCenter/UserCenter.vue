<template>
  <div class="userCenter">
    <MyTip :tipTemp="myTip" :isShow="isShow"></MyTip>
    <div class="back">
      <img src="../../assets/svg/zuo.svg" alt="返回" @click="$router.go(-1)">
    </div>
    <div class="userMenu">
      <ul>
        <li @click="toUserInfo">基本信息</li>
        <li @click="toUpdataPass">修改密码</li>
        <li @click="toLogout">退出登录</li>
      </ul>
    </div>
    <div class="centerBox">
      <div class="scorllBox" ref="scorllBox">
        <div class="Box">
          <div class="userInfo">
            <div class="avatar">
              <img :src="avatar">
            </div>
            <span class="nickName">{{ nickname }}</span>
            <i class="level">LV.{{ level }}</i>
          </div>
        </div>
        <div class="Box">
          <div class="updataPass">
            <form>
              <input v-model="password1" type="password" placeholder="请输入原密码">
              <input v-model="password2" type="password" placeholder="请输入新密码">
              <input v-model="phone" type="text" placeholder="请输入手机号">
              <input v-model="captcha" type="text" placeholder="请输入验证码">
              <button @click.prevent="send">{{ verBtn }}</button>
              <button @click.prevent="update">提交修改</button>
            </form>
          </div>
        </div>
        <div class="Box">
          <div class="logout">
            <p>确认退出登录？</p>
            <button @click="logoutOk">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyTip from '../../components/MyTip.vue'
import { userInfo, captcha, updatePass, logout } from '../../api/index'
export default {
  name: 'UserCenter',
  data() {
    return {
      uid: localStorage.getItem('uid'),
      myTip: '',
      isShow: false,
      isSend: false,
      time: 60,
      verBtn: '发送验证码',
      level: 0,
      avatar: '',
      nickname: '',
      password1: '',
      password2: '',
      phone: '',
      captcha: '',
      passReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
      telReg: /^[1][3,4,5,7,8][0-9]{9}$/,
      veriReg: /^[0-9]{4}$/,
    }
  },
  methods: {
    toUserInfo() {
      this.$refs.scorllBox.style.transform = 'translateY(0)'
    },
    toUpdataPass() {
      this.$refs.scorllBox.style.transform = 'translateY(-300px)'
    },
    toLogout() {
      this.$refs.scorllBox.style.transform = 'translateY(-600px)'
    },
    async getUserInfo() {
      try {
        if(!this.uid) {
          this.myTip = '个人中心需要先登录！'
          this.isShow = true
          return
        }
        const { data:res } = await userInfo()
        console.log(res)
        if(res.code !== 200) {
          this.myTip = '获取用户详情失败！'
          this.isShow = true
          return
        }
        this.myTip = ''
        this.isShow = false
        this.level = res.level
        this.avatar = res.profile.avatarUrl
        this.nickname = res.profile.nickname
      } catch (error) {
        console.log(error)
      }
    },
    async send() {
      try {
        if(this.isSend === true) {
          this.myTip = `不能连续发送，请在${this.time}秒后重新发送！`
          this.isShow = true
          return
        }
        if(!this.telReg.test(this.phone)) {
          this.myTip = '手机号格式不正确！'
          this.isShow = true
          return
        }
        const { data:res } = await captcha(this.phone)
        // console.log(res)
        if(res.code !== 200) {
          this.myTip = '验证码发送失败，请重新发送！'
          this.isShow = true
          return
        }
        this.myTip = ''
        this.isShow = false
        this.isSend = true
        this.verBtn = this.time
        let timer = setInterval(() => {
          this.time--
          this.verBtn = this.time
          if(this.time <= 0) {
            this.isSend = false
            this.isShow = false
            this.verBtn = '发送验证码'
            this.time = 60
            clearInterval(timer)
          }
        }, 1000)
      } catch (error) {
        console.log(error)
      }
    },
    async update() {
      try {
        if(!this.passReg.test(this.password1)) {
          this.myTip = '密码必须包含字母和数字，且在6-18位之间'
          this.isShow = true
          return
        }
        if(this.password1 !== localStorage.getItem('password')) {
          this.myTip = '输入的原密码错误！'
          this.isShow = true
          return
        }
        if(!this.passReg.test(this.password2)) {
          this.myTip = '密码必须包含字母和数字，且在6-18位之间'
          this.isShow = true
          return
        }
        if(!this.telReg.test(this.phone)) {
          this.myTip = '手机号格式不正确！'
          this.isShow = true
          return
        }
        if(this.phone !== localStorage.getItem('telephone')) {
          this.myTip = '手机号不是原来的手机号！'
          this.isShow = true
          return
        }
        if(!this.veriReg.test(this.captcha)) {
          this.myTip = '请输入正确的验证码！'
          this.isShow = true
          return
        }
        const { data:res } = await updatePass(this.password2, this.captcha)
        console.log(res)
        if(res.code !== 200) {
          this.myTip = '修改密码失败，请重试'
          this.isShow = true
          return
        }
        this.myTip = '修改密码成功'
        this.isShow = true
        setTimeout(() => {
          this.myTip = ''
          this.isShow = false
        }, 1000)
        localStorage.setItem('token', res.token)
        localStorage.setItem('uid', res.account.id)
        localStorage.setItem('password', this.password2)
        this.getUserInfo()
      } catch (error) {
        console.log(error)
      }
    },
    async logoutOk() {
      try {
        const { data:res } = await logout()
        console.log(res)
        if(res.code !== 200) {
          this.myTip = '退出登录失败'
          this.isShow = true
        }
        this.myTip = '退出成功'
        this.isShow = true
        // setTimeout(() => {
        //   this.myTip = ''
        //   this.isShow = false
        // }, 1000)
        localStorage.removeItem('token')
        localStorage.removeItem('uid')
        localStorage.removeItem('nickName')
        localStorage.removeItem('password')
        localStorage.removeItem('telephone')
        this.$router.push('/index/find')
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  components: {
    MyTip
  }
}
</script>

<style lang="less" scoped>
.userCenter {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  .back {
    cursor: pointer;
    position: absolute;
    top: 15px;
    left: 10px;
    width: 30px;
    height: 30px;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
    img {
      width: 100%;
    }
  }
  .userMenu {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    width: 100px;
    ul {
      width: 100%;
      font-size: 15px;
      text-align: center;
      li {
        cursor: pointer;
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin: 20px 0;
        border-radius: 15px;
        &:hover {
          background-color: rgba(200, 200, 200, 0.5);
        }
      }
    }
  }
  .centerBox {
    margin: auto;
    width: 500px;
    height: 300px;
    overflow: hidden;
    .scorllBox {
      width: 100%;
      transition: all 0.3s;
      .Box {
        display: flex;
        width: 100%;
        height: 300px;
        button {
          cursor: pointer;
          position: absolute;
          width: 60px;
          height: 30px;
          border: 0;
          font-size: 15px;
          border-radius: 15px;
          border: 1px solid rgba(204, 204, 204, 0.5);
          transition: all 0.5s;
          background-color: transparent;
          &:hover {
            background-color: rgba(204, 204, 204, 0.2);
          }
        }
        .userInfo {
          margin: auto;
          width: 100px;
          .avatar {
            cursor: pointer;
            width: 100%;
            img {
              width: 100%;
              border-radius: 50%;
            }
          }
          .nickName, .level {
            display: inline-block;
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 18px;
          }
          .level {
            font-size: 12px;
          }
        }
        .updataPass {
          width: 100%;
          height: 100%;
          form {
            position: relative;
            width: 100%;
            height: 100%;
            input {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              width: 250px;
              height: 30px;
              text-align: center;
              border: 0;
              border-bottom: 1px solid rgba(204, 204, 204, 0.5);
              background-color: transparent;
              &:nth-of-type(1) {
                top: 50px;
              }
              &:nth-of-type(2) {
                top: 100px;
              }
              &:nth-of-type(3) {
                top: 150px;
              }
              &:nth-of-type(4) {
                top: 200px;
              }
            }
            button {
              &:nth-of-type(1) {
                top: 150px;
                right: 10px;
                width: 100px;
              }
              &:nth-of-type(2) {
                top: 250px;
                left: 50%;
                transform: translateX(-50%);
                width: 80px;
              }
            }
          }
        }
        .logout {
          position: relative;
          margin: auto;
          width: 200px;
          height: 80px;
          p {
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
          }
          button {
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
}
</style>