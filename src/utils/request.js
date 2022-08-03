import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({ baseURL: 'https://1-vmusic-api.vercel.app' })

// 添加请求拦截器
// request.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     console.log('发起')
//     return config;
//   }, function (error) {
//     console.log(error)
// });

// 添加响应拦截器
request.interceptors.response.use(function (res) {
    // 对响应数据做点什么
    if(res.data.code === 200) {
      ElMessage({
        message: '数据请求成功',
        type: 'success',
      })
    }
    if(res.data.code !== 200) {
      ElMessage({
        message: res.data.msg,
        type: 'error',
      })
    }
    return res;
  }, function (error) {
    console.log(error)
  });

export default request
