// 用户相关的接口

import request from '@/utils/request'

/**
 * 账号密码登录
 * @param {String} account 账号
 * @param {String} password 密码
 * @returns promise
 */
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}

/**
 * 手机号验证码登录
 * @param {String} moblie 手机号
 * @param {String} code 验证码
 * @returns promise
 */
export const userMobileLogin = ({ moblie, code }) => {
  return request('/login/code', 'post', { moblie, code })
}
