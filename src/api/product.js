// 提供商品相关的API函数

import request from '@/utils/request'

/**
 * 获取商品详情
 * @param {String} id -商品ID
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}

/**
 * 获取相关推荐商品
 * @param {String} id -商品ID，传入相关推荐，不传猜你喜欢
 * @param {Interger} limit-商品数量
 * @returns
 */
export const findReleventGoods = ({ id, limit = 16 }) => {
  return request('/goods/relevant', 'get', { id, limit })
}
