import Vue from 'vue'
import axios from 'axios'
import { Loading, Message } from 'element-ui'

// 开发环境
const DEV = 'http://172.16.200.112:30111/'
// 测试环境
const SIT = 'http://172.16.200.112:30111/'
// 验收环境
const UAT = 'http://172.16.200.112:30111/'
// 生产环境
const PRO = 'http://172.16.200.112:30111/'

/**
 * 公共配置
 */
const http = axios.create({
  timeout: 1000 * 10,
  baseURL: process.env.NODE_ENV === 'production' ? UAT : DEV,
  headers: {
    'app': 'ALMS',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8',
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(request => {
  /**
   * 请不要尝试优化将此 request.headers['Authorization'] 的设置加入到移动到公共配置中去初始化。这会出现 Vue.cookie 不存在的错误。
   * 因为在main.js中import总是提前执行（无论import放在什么位置），也就是说，【import http from './utils/http.js'】 总是比 【Vue.use(VueCookie)】执行的快。
   * 这会导致Vue.cookie对象不存在，而又因为import的时候会执行axios.create中的代码块，估无法使用，
   * 除非你将 【import http from './utils/http.js'】 改为 【var http = require('./utils/http.js').default】
   * 但这样未免太不优雅。所以我的解决方案是延迟执行（懒执行），在请求的时候才执行【Vue.cookie.get('token')】，那时候早就执行Vue.use(VueCookie)了。
   */
  request.headers['Authorization'] = 'Bearer ' + Vue.cookie.get('token') || ''
  return request
}, err => {
  return Promise.reject(err)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  return response.data
}, err => {
  return Promise.reject(err)
})

export default http
