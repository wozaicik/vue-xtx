
import { createVNode, render } from 'vue'
import XtxConfirm from './xtx-confirm.vue'

// 准备一个dom
// dom容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)

// 将来返回的函数是一个promise对象，取消和确认都会被销毁
export default ({ title, text }) => {
// 1.0 导入被创建的组件
// 2.0 使用createVNode创建虚拟节点
// 3.0 准备一个dom容器装载组件
// 4.0 使用render函数渲染组件到容器

  return new Promise((resolve, reject) => {
    const cancelCallback = () => {
      render(null, div)
      reject(new Error('点击取消'))
    }
    const submitCallback = () => {
      render(null, div)
      resolve()
    }
    const vn = createVNode(XtxConfirm, { title, text, cancelCallback, submitCallback })
    render(vn, div)
  })
}
