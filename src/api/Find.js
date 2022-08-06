import request from '../utils/request'

// 获取轮播图
// type: 0: pc
      // 1: android
      // 2: iphone
      // 3: ipad
function Banner(type = 0) {
  return request.get(`/banner?type=${type}`)
  // return request.get(`/banner`, {
  //   data: { type }
  // })
}

// 获取推荐歌单
function recommend(limit = 10) {
  return request.get(`/personalized?limit=${limit}`)
  // return request.get(`/personalized`, {
  //   data: { limit }
  // })
}

// 获取推荐mv
function recommendMv() {
  return request.get('/personalized/mv')
}

// 获取mv地址
function mvAddress(id) {
  return request.get(`/mv/url?id=${id}`)
}

export { Banner, recommend, recommendMv, mvAddress }
