
// 购物车模块
export default {
  namespaced: true,
  state () {
    return {
      // 购物车商品列表
      list: []
    }
  },
  mutations: {
    // 加入购物车
    insertCart (state, payload) {
      // 加入购物车字段必须和后端保持一致
      // id skuId name attrsText picture price nowPrice selected stock count isEffective
      // 插入数据规则：
      // 1.0 先找是否有相同的商品
      // 2.0 如果有相同的商品 查询数量，累加到payload上，在保存最新位置
      // 3.0 如果没有相同的商品，保存在最新位置即可
      const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
      if (sameIndex > -1) {
        // 大于负一说明有相同的商品
        const count = state.list[sameIndex].count
        payload.count += count
        state.list.splice(sameIndex, 1)
      }
      // 追加新的商品
      state.list.unshift(payload)
    }
  },
  actions: {
    // 加入购物车
    insertCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    }
  }
}
