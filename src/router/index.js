import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import store from '@/store'
import { h } from 'vue'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const Topcategor = () => import('@/views/category/index.vue')
const Subcategor = () => import('@/views/category/sub.vue')
const Goods = () => import('@/views/goods/index.vue')
const Login = () => import('@/views/login/index.vue')
const Cart = () => import('@/views/cart/index.vue')
const Checkout = () => import('@/views/member/pay/checkout.vue')
const Pay = () => import('@/views/member/pay/index.vue')
const PayResult = () => import('@/views/member/pay/result.vue')

const MemberLayout = () => import('@/views/member/Layout')
const MemberHome = () => import('@/views/member/home/index')
const MemberOrder = () => import('@/views/member/order/index')
const MemberDetail = () => import('@/views/member/order/components/detail')

const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: Topcategor },
      { path: '/category/sub/:id', component: Subcategor },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: Checkout },
      { path: '/member/Pay', component: Pay },
      { path: '/pay/callback', component: PayResult },
      {
        path: '/member',
        component: MemberLayout,
        children: [
          { path: '/member', component: MemberHome },
          // { path: '/member/order', component: MemberOrder },
          // { path: '/member/order/:id', component: MemberDetail }
          {
            path: '/member/order',
            component: { render: () => h(<RouterView/>) },
            children: [
              { path: '', component: MemberOrder },
              { path: ':id', component: MemberDetail }
            ]
          }
        ]
      }
    ]
  },
  { path: '/login', component: Login }
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

// 前置导航守卫
router.beforeEach((to, from, next) => {
// 需要登录的路由：地址是以/member开头
  const { profile } = store.state.user
  if (!profile.token && to.path.startsWith('/member')) {
    return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
