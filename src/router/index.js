import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const Topcategor = () => import('@/views/category/index.vue')
const Subcategor = () => import('@/views/category/sub.vue')

const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: Topcategor },
      { path: '/category/sub/:id', component: Subcategor }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
