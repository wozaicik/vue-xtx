// 1.创建一个新的axios实例
// 2.请求拦截器 如果有token进行头部携带
// 3.响应拦截器 1.剥离无效数据2. 处理token失效
// 4.导出一个函数，调用当前的axsio实例发请求，返回值promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址，原因：其他地方不是通过axios发请求的地方用上基准地址
export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'

const instance = axios.create({
// axios的一些配置  baseurl timeout
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(config => {
  // 拦截的业务逻辑
  // 进行请求配置的修改
  // 如果本地有token就在头部携带
  // 1.获取用户信息对象
  const { profile } = store.state.user
  // 2.判断是否有token
  if (profile.token) {
    // 设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, (err) => {
  return Promise.reject(err)
})

// res=>res.data 取出data数据 将来调用接口的时候直接拿到的就是后台数据
instance.interceptors.response.use(res => res.data, err => {
  // 401 状态码，进入该函数
  if (err.response && err.response.status === 401) {
    // 1.清空本地无效的用户信息
    // 2.跳转登录页码
    // 3. 跳转需要传参（当前路由地址）
    store.commit('user/setUser', {})
    // 当前路由地址
    // 组件里面：$router.path        $router.fullpath===/user?a=10
    // js模块中 router.currentRoute.value.fullpath 就是当前路由地址  router.currentRoute是ref响应式数据
    // 地址里面有特殊字符 不能直接赋值 需要转成url编码
    const fullpath = encodeURIComponent(router.currentRoute.value.fullpath)
    router.push('/login?redirectUrl=' + fullpath)
  }
  return Promise.reject(err)
})

export default (url, method, submitData) => {
  // 负责发请求
  // 请求地址 请求方式  提交的数据
  return instance({
    url,
    method,
    // 1.如果是get请求 需要使用params来传递submitdata   ?a=10&c=10
    // 2.如果不是get请求 需要使用data来传递submitdata   请求体传参
    // method参数：get Get GET  转换成小写在判断
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
