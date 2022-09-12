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

/**
 * 获取购物车列表
 * @returns
 */
export const findCart = () => {
  return request('/member/cart', 'get')
}

/**
 * 加入购物车
 * @param {string} object.skuId
 * @param {Integer} object.count 加入购物车的数量
 * @returns
 */
export const inserCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}

/**
 * 删除购物车商品，支持批量
 * @param {Array<steing>} ids  -skuid 的集合
 */
export const deleteCart = (ids) => {
  return request('/member/cart', 'delete', { ids })
}

/**
 * 修改购物车商品 状态 数量
 * @param {skuId} skuId
 * @param {skuId} count 数量
 * @param {skuId} selected 选中状态
 * @returns
 */
export const updateCart = ({ skuId, selected, count }) => {
  return request(`/member/cart/${skuId}`, 'put', { selected, count })
}

/**
 * @param {ids} skuId 集合
 * @param {skuId} selected 选中状态
 * @returns
 */
export const checkAllCart = ({ selected, ids }) => {
  return request('/member/cart/selected', 'put', { selected, ids })
}
