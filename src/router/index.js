import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const Topcategor = () => import('@/views/category/index.vue')
const Subcategor = () => import('@/views/category/sub.vue')
const Goods = () => import('@/views/goods/index.vue')

const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: Topcategor },
      { path: '/category/sub/:id', component: Subcategor },
      { path: '/product/:id', component: Goods }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候 滚动到页面的顶部
  scrollBehavior () {
    // vue2.0 是通过x和y控制
    // vue3.0 是通过left和top控制
    return { left: 0, top: 0 }
  }
})

export default router
