import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    user,
    category
  },
  // 配置插件
  plugins: [
    // 默认存储在 localstore
    createPersistedState({
    // 本地存储名字
      key: 'erabbit-client-pc-store',
      // 指定需要存储模块
      path: ['user', 'cart']
    })]
})
