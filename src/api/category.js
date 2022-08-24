// 定义分类相关的API接口函数
import request from '@/utils/request'

/**
 * 获取所有分类 顶级 二类 推荐商品数据
 * @returns promise
 */
// 获取所有分类
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

/**
 * 获取项目顶级类目信息 children 属性就是各个子分类
 * @param {string} id - 顶级类目ID
 * @returns promise
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
