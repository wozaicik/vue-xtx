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
