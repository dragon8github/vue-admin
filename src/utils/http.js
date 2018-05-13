import Vue from 'vue'
import router from '../router'
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
http.interceptors.request.use(async request => {
    if ((['/uaa/auth/login', '/uaa/auth/token']).indexOf(request.url) < 0) {
        // 从cookie中获取refreshToken
        var refreshToken = Vue.cookie.get('refreshToken')
        // 从cookie中获取token
        var token = Vue.cookie.get('token')

        // 如果refreshToken失效则重新登录，否则重置一下过期时间
        if (refreshToken) {
            // 重置为30分钟
            Vue.cookie.set('refreshToken', refreshToken, { expires: '30m' });      
        // 否则跳转登录
        } else {
            // 跳转到登录页
            router.push('/login')
            // 取消请求（我还不如直接throw呢）
            throw new Error('登录超时，请重新登录。')
        }

        // 如果token失效，则重新获取
        if (!token || token === 'undefined') {
            // 重新请求获取最新的 token
            token = await http.get('/uaa/auth/token', {
                headers: {
                  // 注意这里是将 Authorization 设置为 refreshToken
                  Authorization: 'Bearer ' + refreshToken
                }
            }).then(data => {
                console.log("获取到的最新token", data);
                if (data.token) {
                    // 重置token
                    Vue.cookie.set('token', data.token, { expires: '28m' });
                    // 返回一下token
                    return data.token
                  } else {
                      // 跳转到登录页
                      router.push('/login')
                      // 取消请求
                      throw new Error(data.result_msg)
                  }
            }).catch(err => {
                // 跳转到登录页
                router.push('/login')
                // 取消请求
                throw new Error('重新获取token失败，请重新登录。' + err.message)
            })
        }

        // 所有请求都要带上授权码        
        request.headers['Authorization'] = 'Bearer ' + token
    }
    
    // 一切正常，照常请求
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
