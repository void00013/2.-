<template>
  <div class="login">
    <MyTip :tipTemp="myTip" :isShow="isShow"></MyTip>
    <div class="back">
      <img src="../../assets/svg/zuo.svg" alt="返回" @click="$router.go(-1)">
    </div>
    <div class="box" ref="box">
      <div class="formBox loginBox" ref="loginBox">
        <div @click="$router.push('/index/find')">首页</div>
        <div @click="toReg">注册</div>
        <form>
          <input v-model.trim="telephone" @keyup="isTel" type="text" placeholder="请输入手机号">
          <input v-model.trim="veriCode" type="text" placeholder="请输入验证码">
          <button @click.prevent="verification">{{ verBtn }}</button>
          <button @click.prevent="loginSub">登录</button>
        </form>
      </div>
      <div class="formBox registerBox" ref="registerBox">
        <div @click="$router.push('/index/find')">首页</div>
        <div @click="toLogin">登录</div>
        <form>
          <input v-model.trim="nickName" type="text" placeholder="请输入昵称">
          <input v-model.trim="password" @keyup="isPass" type="password" placeholder="请输入密码">
          <input v-model.trim="telephone" @keyup="isTel" type="text" placeholder="请输入手机号">
          <input v-model.trim="veriCode" type="text" placeholder="请输入验证码">
          <button @click.prevent="verification">{{ verBtn }}</button>
          <button @click.prevent="registerSub">注册</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import MyTip from '../../components/MyTip.vue'
import { captchaLogin, captcha, register } from '../../api/index'
export default {
  name: 'Login',
  data() {
    return {
      verBtn: '发送验证码',
      isSend: false,
      time: 60,
      myTip: '提示',
      isShow: false,
      nickName: '',
      password: '',
      telephone: '',
      veriCode: '',
      telReg: /^[1][3,4,5,7,8][0-9]{9}$/,
      passReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
      veriReg: /^[0-9]{4}$/,
      token: '',
      cookie: '',
    }
  },
  methods: {
    toReg() {
      this.$refs.box.style.transform = 'rotateY(180deg)'
      this.$refs.loginBox.style.opacity = '0'
      this.$refs.registerBox.style.opacity = '1'
    },
    toLogin() {
      this.$refs.box.style.transform = 'rotateY(0deg)'
      this.$refs.registerBox.style.opacity = '0'
      this.$refs.loginBox.style.opacity = '1'
    },
    isPass() {
      if(!this.passReg.test(this.password)) {
        this.myTip = '密码必须包含字母和数字，且在6-18位之间'
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    isTel() {
      if(!this.telReg.test(this.telephone)) {
        this.myTip = '手机号输入格式不正确！'
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    // TODO:登录功能开发
    async loginSub() {
      try {
        if(!this.telReg.test(this.telephone)) {
          this.myTip = '手机号格式不正确！'
          this.isShow = true
          return
        }
        if(!this.veriReg.test(this.veriCode)) {
          this.myTip = '请输入正确的验证码！'
          this.isShow = true
          return
        }
        const { data:res } = await captchaLogin(this.telephone, this.veriCode)
        console.log(res)
        if(res.code !== 200) { return }
        this.token = res.token
        this.cookie = res.cookie
        localStorage.setItem('token', res.token)
        localStorage.setItem('cookie', res.cookie)
      } catch (error) {
        console.log(error)
      }
    },
    // 发送验证码
    async verification() {
      try {
        if(this.isSend === true) {
          this.myTip = `不能连续发送，请在${this.time}秒后重新发送！`
          this.isShow = true
          return
        }
        if(!this.telReg.test(this.telephone)) {
          this.myTip = '手机号格式不正确！'
          this.isShow = true
          return
        }
        const { data:res } = await captcha(this.telephone)
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
    // 注册
    async registerSub() {
      try {
        if(this.nickName === '') {
          this.myTip = '昵称不能为空'
          this.isShow = true
          return
        }
        if(!this.passReg.test(this.password)) {
          this.myTip = '密码必须包含字母和数字，且在6-18位之间'
          this.isShow = true
          return
        }
        if(!this.telReg.test(this.telephone)) {
          this.myTip = '手机号格式不正确！'
          this.isShow = true
          return
        }
        if(!this.veriReg.test(this.veriCode)) {
          this.myTip = '请输入正确的验证码！'
          this.isShow = true
          return
        }
        const { data:res } = await register(this.nickName, this.password, this.telephone, this.veriCode)
        console.log(res)
        if(res.code !== 200) {
          this.myTip = '注册失败，请重试'
          this.isShow = true
          return
        }
        this.myTip = '注册成功'
        this.isShow = true
        setTimeout(() => {
          this.myTip = ''
          this.isShow = false
        }, 1000)
        localStorage.setItem('token', res.token)
        localStorage.setItem('uid', res.account.id)
        localStorage.setItem('nickName', this.nickName)
        localStorage.setItem('password', this.password)
        localStorage.setItem('telephone', this.telephone)
      } catch (error) {
        console.log(error)
      }
    },
  },
  components: {
    MyTip
  }
}
</script>

<style lang="less" scoped>
// less语法 &: 只能操作该节点及该节点以下的子元素，不能操作父级元素
.login {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  perspective: 1000px;
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
  // 透视要在3d盒子的父级加
  // 子盒子要保留3d空间
  .box {
    position: relative;
    margin: auto;
    width: 500px;
    height: 300px;
    border-radius: 20px;
    transition: all 1s;
    transform-style: preserve-3d;
    .formBox {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 10px;
      border-radius: 20px;
      transition: all 1s;
      // background-color: rgba(204, 204, 204, 0.1);
      div {
        cursor: pointer;
        position: absolute;
        top: 10px;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        &:nth-child(1) {
          left: 10px;
        }
        &:nth-child(2) {
          right: 10px;
        }
      }
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
      }
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
    }
    .loginBox {
      opacity: 1;
      transform: translateZ(1px);
      form {
        input {
          &:nth-child(1) {
            top: 100px;
          }
          &:nth-child(2) {
            top: 150px;
          }
        }
        button {
          &:nth-of-type(1) {
            top: 100px;
            right: 10px;
            width: 100px;
          }
          &:nth-of-type(2) {
            top: 230px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
    .registerBox {
      opacity: 0;
      transform: rotateY(180deg) translateZ(1px);
      form {
        input {
          &:nth-child(1) {
            top: 50px;
          }
          &:nth-child(2) {
            top: 100px;
          }
          &:nth-child(3) {
            top: 150px;
          }
          &:nth-child(4) {
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
          }
        }
      }
    }
  }
}
</style>