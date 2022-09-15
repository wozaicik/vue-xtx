import request from '@/utils/request'

/**
 *
 * @param {integer} collectType 收藏类型 1 商品 2 专题 3 品牌
 * @returns
 */
export const findCollect = ({ page, pageSize, collectType = 1 }) => {
  return request('/member/collect', 'get', { page, pageSize, collectType })
}
