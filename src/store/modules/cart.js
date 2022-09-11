import { getNewCartGoods, mergeCart } from '@/api/cart'

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
    },
    // 修改购物车商品
    updateCart (state, goods) {
      // goods 商品信息 nowprice isEffective stock
      // goods 商品对象的字段不固定 对象中有哪些字段就改哪些字段，字段的值合理才改
      // goods 商品对象 必须有SKUID
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 删除购物车商品
    deleteCart (state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    },
    // 设置购物车
    setCart (state, payload) {
      // payload 为空数组，清空， 有值数组，设置
      state.list = payload
    }
  },
  actions: {
    // 合并购物侧
    async  mergeCart (ctx) {
      const cartList = ctx.state.list.map(goods => {
        return {
          skuId: goods.skuId,
          selected: goods.selected,
          count: goods.count
        }
      })
      await mergeCart(cartList)
      ctx.commit('setCart', [])
    },
    // 修改规格
    updateCartSku (ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          // 1.0 找出旧的商品信息
          // 2.0 删除旧的商品信息
          // 3.0 根据新的sku信息和旧的商品信息，合并成一条新的购物车商品数据
          // 4.0 添加新的商品
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          ctx.commit('deleteCart', oldSkuId)
          const { skuId, price: nowPrice, skuText: attrsText, inventory: stock } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, attrsText, stock }
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    },
    // 批量删除
    batchDeleteCart (ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          // isClear 为TRUE 删除失效商品列表 否则是删除选中商品
          ctx.getters[isClear ? 'inValidList' : 'selectedList'].forEach(item => {
            ctx.commit('deleteCart', item.skuId)
          })
          resolve()
        }
      })
    },
    // 全选于取消全选
    checkAllCart (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          ctx.getters.validList.forEach(goods => {
            ctx.commit('updateCart', { skuId: goods.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 修改购物车(选中状态，数量)
    updateCart (ctx, payload) {
      // payload 需要：skuId 可能有selected count
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          ctx.commit('updateCart', payload)
          resolve()
        }
      })
    },
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
    },
    findCart (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO已登录
        } else {
          // 未登录
          // 同时发送请求（有几个商品发几个请求） 等所有请求成功，一并去修改本地数据
          // promise.all(promise数组).then((dataList)=>{}) 同时发请求 所有请求成功 得到所有成功结果
          // Promise.race() Promise.resolve() Promise.reject() new Promise()
          const promiseArr = ctx.state.list.map(goods => {
            return getNewCartGoods(goods.skuId)
          })
          // dataList 成果结果的集合， 数据顺序和promiseArr顺序一致，它又是根据state.list而来
          Promise.all(promiseArr).then(dataList => {
            // 更新本地购物车
            dataList.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            // 调用resolve操作
            resolve()
          })
        }
      })
    },
    // 删除购物商品
    deleteCart (ctx, payload) {
      // 单条 payload 现在 就是skuId
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    }
  },
  getters: {
    // 有效商品列表
    validList (state) {
      // 有效商品：库存大于0 有效的标识:true
      return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
    },
    // 有效商品件数
    validTotal (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品金额
    validAmount (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count * c.nowPrice, 0)
    },
    // 无效商品列表
    inValidList (state) {
      return state.list.filter(goods => goods.stock <= 0 || !goods.isEffective)
    },
    // 已选商品列表
    selectedList (state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 已选商品总件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 已选商品总金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count * c.nowPrice, 0)
    },
    // 是否全选
    isCheckAll (state, getters) {
      return getters.validList.length !== 0 && getters.selectedList.length === getters.validList.length
    }
  }
}
