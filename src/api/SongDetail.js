import request from '../utils/request'

// 获取歌单详情
function songDetail(id = 0) {
  return request.get(`/playlist/detail?id=${id}`)
}

// 获取音乐地址
function musicUrl(ids = 0) {
  return request.get(`/song/url?id=${ids}`)
}

export { songDetail, musicUrl }
