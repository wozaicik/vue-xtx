// 封装购物车相关的api

import request from '@/utils/request'

/**
 * 获取商品的最新消息 价格 库存 是否有效
 * @param {String} skuId sku id
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}
