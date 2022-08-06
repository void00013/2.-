import request from '../utils/request'

// 密码登录
function login(phone, password) {
  // return request.get(`/login/cellphone?phone=${phone}&password=${password}`)
  return request.get('/login/cellphone?phone=13133341542&password=a13133341542')
}

// 验证码登录
function captchaLogin(phone, captcha) {
  return request.get(`/login/cellphone?phone=${phone}&captcha=${captcha}&realIP=116.25.146.177`)
  // return request.get(`/login/cellphone?phone=${phone}&captcha=${captcha}`)
}

// 发送验证码
function captcha(phone) {
  return request.get(`/captcha/sent?phone=${phone}`)
}

// 注册
function register(nickname, password, phone, captcha) {
  return request.get(`/register/cellphone?phone=${phone}&password=${password}&captcha=${captcha}&nickname=${nickname}&realIP=116.25.146.177`)
}

export { login, captchaLogin, captcha, register }
