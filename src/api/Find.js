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

export { Banner, recommend }
