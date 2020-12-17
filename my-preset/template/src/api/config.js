/* 对axios拦截器，请求做二次封装 */
import axios from 'axios'
import qs from 'qs'
const baseUrl = window.baseUrl
const service = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  withCredentials: true
})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
service.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { withoutLogin } = response.config
    // 不希望510跳去登录的话 传 withoutLogin=true
    if (!withoutLogin && response.data.code === 510) {
      // toLogin(route, url)
    }
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error)
  }
)

function http({ baseURL, prefix = window.pathname, url = '', method = 'get', params = {}, data = {}, withoutLogin = false }) {
  // 去掉为空的params
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      if (!params[key]) {
        delete params[key]
      }
    }
  }
  if (!(data instanceof FormData)) {
    data = qs.stringify(data)
  }

  return service({
    baseURL,
    url: prefix + url,
    params,
    method,
    data,
    withoutLogin
  }).then((res) => {
    return res.data
  })
}

export function uploadImg({ url, params = {}, file }) {
  const data = new FormData()
  data.append('userfield', file)
  return service({
    url,
    method: 'post',
    data,
    params
  })
    .then((res) => {
      return res.data
    })
    .catch()
}

export default http
