import axios from "axios";

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  // 2.axios拦截器interceptors.后面的方法use
  instance.interceptors.request.use(config => {
    // 2.1请求拦截的作用

    // 1.比如说config中的一些信息不符合服务器的要求

    // 2.比如我们每次发送网络请求时,都希望在界面种显示一个请求的图标

    // 3.某些网络请求 比如登录(token) 是必须携带一些特殊的信息


    // console.log(config);
    // 拦截了要返回这个参数,不然调用那边会err
    return config
  }, err => {
    console.log(err);
  })

  // 2.2.相应式拦截response.后面的方法use
  instance.interceptors.response.use(res => {
    // console.log(res);
    // 拦截了也要返回调用处去
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的请求
  return instance(config)

}

