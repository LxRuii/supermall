// 给首页封装一层管理
import { request } from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata',
  })
}
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

