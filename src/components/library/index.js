// 扩展vue原有功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了vue构造函数，在vue基础之上扩展东西
// vue3.0 插件写法：导出一个对象，有install函数，默认传入了创建好的APP实例，APP基础上扩展

import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'

export default {
  install (app) {
    // 在app上进行扩展 component方法 directive 函数
    //  如果要挂载APP.      config.globalProperties. 方式
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
  }
}
