import request from '@/utils/request'

/**
 *  结算页面-生成订单
 * @returns
 */
export const createOrder = () => {
  return request('/member/order/pre', 'get')
}
