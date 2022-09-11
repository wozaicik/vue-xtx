<template>
  <div class='xtx-goods-page' v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem  :to="`/category/${goods.categories[1].id}`">{{goods.categories[1].name}}</XtxBreadItem>
        <XtxBreadItem  :to="`/category/sub/${goods.categories[0].id}`">{{goods.categories[0].name}}</XtxBreadItem>
        <XtxBreadItem>{{goods.name}}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures"></GoodsImage>
          <GoodsSales></GoodsSales>
        </div>
        <div class="spec">
          <GoodName :goods="goods"></GoodName>
          <GoodsSku :goods="goods" @change="changeSku"></GoodsSku>
          <xtx-numbox v-model="num" :max="goods.inventory" label="数量"></xtx-numbox>
          <xtx-button @click="insertCart()" type="primary" style="margin-top:20px">加入购物车</xtx-button>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs></GoodsTabs>
          <!-- 注意事项 -->
          <GoodsWarn ></GoodsWarn>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot></GoodsHot>
          <GoodsHot :type="2"></GoodsHot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsTabs from './components/goods-tabs.vue'
import GoodsHot from './components/goods-hot.vue'
import GoodsWarn from './components/goods-warn.vue'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/product'
import { nextTick, provide, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import Message from '@/components/library/Message'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodName, GoodsSku, GoodsTabs, GoodsHot, GoodsWarn },
  setup () {
    // 1. 获取商品详情，进行渲染
    const goods = useGoods()
    // 修改商品现价，原价，库存信息
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
      // 记录选择后的sku，可能有数据，可能没有
      currSku.value = sku
    }
    // 选择的数量
    const num = ref(1)

    // 提供goods数据给后代组件使用
    provide('goods', goods)

    const store = useStore()
    const currSku = ref(null)
    // 加入购物车
    // id skuId name attrsText picture price nowPrice selected stock count isEffective
    const insertCart = () => {
      if (currSku.value && currSku.value.skuId) {
        const { skuId, skuText: attrsText, inventory: stock } = currSku.value
        const { id, name, price, mainPictures } = goods.value
        store.dispatch('cart/insertCart', {
          skuId,
          attrsText,
          stock,
          id,
          name,
          price,
          nowPrice: price,
          picture: mainPictures[0],
          count: num.value,
          selected: true,
          isEffective: true
        }).then(() => {
          Message({ type: 'success', text: '加入购物车成功' })
        })
      } else {
        Message({ text: '请选择完整的规格' })
      }
    }

    return { goods, changeSku, num, insertCart }
  }
}
// 获取商品详情
const useGoods = () => {
  // 出现路由地址商品ID发送变化，但是不会重新初始化组件
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then(data => {
        // console.log(goods.value)
        // 让商品数据为null让后使用v-if组件可以重新销毁和创建
        goods.value = null
        nextTick(() => {
          goods.value = data.result
          // console.log(goods.value.mainPictures)
        })
      })
    }
  }, { immediate: true })
  return goods
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
// .goods-tabs {
//   min-height: 600px;
//   background: #fff;
// }
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
