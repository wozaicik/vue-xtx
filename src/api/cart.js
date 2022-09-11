// 封装购物车相关的api

import request from '@/utils/request'

/**
 * 获取商品的最新消息 价格 库存 是否有效
 * @param {String} skuId sku id
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 *
 * @param {String} skuId skuId
 * @returns promise
 */
export const getGoodsSku = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * 合并购物车
 * @param {array<object>} cartList购物车信息列表
 * @param {string} object.skuId
 * @param {boolean} object.selected
 * @param {Integer} object.count
 * @returns
 */
export const mergeCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}
