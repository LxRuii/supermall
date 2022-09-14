// 给首页封装一层管理
import { request } from "./request";

export function getHomeMultidata() {
  return request({
    url: 'home/multidata',
  })
}