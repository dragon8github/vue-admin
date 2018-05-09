// 页面所有请求相关的接口
import axios from 'axios'
import qs from 'qs'
import router from '../router'
import is from 'is-js'
import { Loading, Message } from 'element-ui'

// axios 全局配置
// axios.defaults.withCredentials = true // 设置cookies
axios.defaults.timeout = 40000; // 请求超时
axios.defaults.baseURL = 'http:// localhost:8081/' // 请求URI

// 请求拦截
axios.interceptors.request.use((config) => {
    // 获取到请求传参,可针对不同的请求拦截操作或者增加全局的加载效果
    const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    return config;
},(error) =>{
    loading.close()
    return Promise.reject(error)
});

// 返回状态判断
axios.interceptors.response.use((res) =>{
    // 返回成功关闭加载效果
    loading.close()
    // 返回值
    var temp;
    if(is.object(res.data)){
        temp = res.data
    }else{
        temp = JSON.parse(res.data)
    }
    if(is.object(temp)){
        // 全局状态判断
        if(temp.status == 1800){
            // 登录失效,清空缓存 
            localStorage.removeItem('userInfo')
            // 提示
            Message.warning('登录失效,请重新登录!')
            // 重新登录 
            router.replace({
                path: '/login'
            });
        }
        if(temp.status == 1400){
            Message.error('数据加载失败,请稍刷新重试!')
        }
    }
    return res;
}, (error) => {
    console.log('error',error)
    // 返回失败关闭加载效果
    loading.close()
    Message.error('数据加载失败,请稍刷新重试!')
    return Promise.reject(error);
});

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params))
            .then(response => {
                console.log('response',response)
                var temp;
                if(is.object(response.data)){
                    temp = response.data;
                }else{
                    temp = JSON.parse(response.data)
                }
                resolve(temp);
            }, err => {
            	// console.log(err)
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export function getFetch(url){
    return new Promise((resolve, reject) => {
        axios({
            method:'get',
            url:url
        })
        .then(response => {
            var temp;
            if(is.object(response.data)){
                temp = response.data;
            }else{
                temp = JSON.parse(response.data)
            }
            resolve(temp);
        }, err => {
            // console.log(err)
            reject(err);
        })
        .catch((error) => {
            reject(error)
        })

    })
}

// 页面请求
const ajaxPost = {}
const ajaxGet = {}

// 定义页面请求名称,一旦有增加,修改此处
const postFuncName = ['Login','Logout'] // post
const getFuncName = ['get','get1'] // get

if(postFuncName && postFuncName.length > 0){
    for (let [index, elem] of postFuncName.entries()) {  
        ajaxPost[elem] = (url,params) => {
            return fetch(url,params)
        }
    }
}

if(getFuncName && getFuncName.length > 0){
    for(let [index,elem] of getFuncName.entries()){
        ajaxGet[elem] = (url) => {
            return getFetch(url)
        }
    }
}

export {
    ajaxPost,
    ajaxGet
}



