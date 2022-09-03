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

/**
 *获取热销榜数据
 * @param {string} id   商品id
 * @param {Interger} limit 商品数量 默认为3
 * @param {Interger} type 热销类型： 1为24小时，2为周榜，3为总榜，默认为1
 */
export const findGoodsHot = ({ id, limit = 3, type = 1 }) => {
  return request('/goods/hot', 'get', { id, limit, type })
}

/**
 * 获取商品的评价信息
 * @param {String} id 商品id
 *
 */
export const findGoodsCommentinfo = (id) => {
  return request(`/goods/${id}/evaluate`, 'get')
  // return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}

/**
 * 获取商品的评价信息
 * @param {String} id 商品id
 *@param {Object} params 筛选参数
 */
export const findGoodsCommentList = (id, params) => {
  return request(`/goods/${id}/evaluate/page`, 'get', params)
  // return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}
