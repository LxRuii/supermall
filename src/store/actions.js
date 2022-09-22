import { ADD_CONUTER, ADD_TO_CART } from "./mutaions-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload 新添加的商品
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid === payload.iid
      })
      // 2.判断oldProduct
      if (oldProduct) { // 商品+1
        context.commit(ADD_CONUTER, oldProduct)
        resolve('当前的商品数量+1')
      } else {  // 新商品到购物车
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('成功添加商品到购物车')
      }
    })
  }
}