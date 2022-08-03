import request from '../utils/request'

function searchMusic(keywords, type = 1, limit = 30, page = 1) {
  return request.get(`/cloudsearch?keywords=${keywords}&type=${type}&limit=${limit}&offset=${(page - 1) * 30}`)
}

export { searchMusic }
