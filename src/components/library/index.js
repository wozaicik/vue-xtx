// 扩展vue原有功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了vue构造函数，在vue基础之上扩展东西
// vue3.0 插件写法：导出一个对象，有install函数，默认传入了创建好的APP实例，APP基础上扩展
// import defaultImg from '@/assets/images/200.png'

// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'

// 使用 require 提供的函数 context 加载某一个目录下的所有 .vue 后缀的文件。
// 然后 context 函数会返回一个导入函数 importFn
// 它又一个属性 keys() 获取所有的文件路径
// 通过文件路径数组，通过遍历数组，再使用 importFn 根据路径导入组件对象
// 遍历的同时进行全局注册即可
// context('目录的名称-路径'，'是否加载子目录','加载文件的匹配正则')

import Message from './Message'

const importFn = require.context('./', false, /\.vue$/)

export default {
  install (app) {
    // 在app上进行扩展 component方法 directive 函数
    //  如果要挂载APP.      config.globalProperties. 方式
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)

    // 根据keys批量注册
    importFn.keys().forEach(path => {
      const component = importFn(path).default
      // 进行注册
      app.component(component.name, component)
    })

    // 定义指令
    defineDirective(app)

    // 定义原型函数
    app.config.globalProperties.$message = Message
  }
}

// 定义指令

const defineDirective = (app) => {
  // 1.图片懒加载 v-lazy
  // 原理：先把图片地址存储 不能放在src上，当图片进入可视区，将src的地址设置成存储的地址
  app.directive('lazy', {
    // vue2.0 监听使用指令的DOM是否创建好，钩子函数，inserted
    // vue3.0 的指令拥有的钩子函数和组件的一样，监听使用指令的DOM是否创建好，mounted
    mounted (el, binding) {
      // 2.创建一个观察对象，来观察当前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          // 把指令的值设置给el的src属性 binding.value 就是指令的值 是一个对象
          // 4.处理图片加载失败  error 图片加载的事件 load是图片加载成功的事件
          // el.onerror = () => {
          //   el.src = defaultImg
          // }
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
      // 开启观察
      observe.observe(el)
    }
  })
}
