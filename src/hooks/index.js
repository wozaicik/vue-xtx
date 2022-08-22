// 提供服用逻辑的函数 钩子

import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

/**
 * 数据懒加载
 * @param {Object} target - Dom对象
 * @param {Function} apiFn -API函数
 */
export const useLazyData = (apiFn) => {
  const target = ref(null)
  const result = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting 是否进图可视区
      if (isIntersecting) {
        stop()
        // 调用API函数获取数据
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    // 配置选项 相交的比例大于0
    {
      threshold: 0
    }
  )
  return { result, target }
}
