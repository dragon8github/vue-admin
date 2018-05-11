import axios from 'axios'
import { Loading, Message } from 'element-ui'

const UAT = 'http://172.16.200.112:30111/'
const SIT = 'http://172.16.200.112:30111/'
const PRO = 'http://172.16.200.112:30111/'

/**
 * 公共配置
 */
const http = axios.create({
  timeout: 1000 * 10,
  baseURL: process.env.NODE_ENV === 'production' ? UAT : SIT,
  headers: {
    'app': 'ALMS',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJVc2VyIEF1dGhvcml6ZSIsInVzZXJJZCI6IjAxMTExMzAwMDAiLCJvcmdDb2RlIjoiRDAxIiwiaXNzIjoicWl1d2Vud3VAaG9uZ3RlLmluZm8iLCJpYXQiOjE1MjYwMDM3MzYsImV4cCI6MTUyNjAwNTQ3NiwiYXVkIjoi6LS35ZCO57O757uf566h55CG5ZGYIn0.RxiIdzBx88W4Nl55lj9Q1_3Vkwh8fYUZUp2q1K8YhihfUZE5fj8KHUcUJfCURX5MDxc9tnKWuKnpCQ3KOVn3cw'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(request => { 
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
