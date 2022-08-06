import request from '../utils/request'

// 获取用户详情
function userInfo() {
  return request.get(`/user/detail?uid=${localStorage.getItem('uid')}`)
}

// 修改密码(注册)
function updatePass(password, captcha) {
  return request.get(`/register/cellphone?phone=${localStorage.getItem('telephone')}&password=${password}&captcha=${captcha}&nickname=${password}&realIP=116.25.146.177`)
}

// 退出登录
function logout() {
  return request.get('/logout')
}

export { userInfo, updatePass, logout }
