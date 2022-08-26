<template>
<div class="sub-category">
  <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter></SubFilter>
      <!-- 商品面板（排序+列表） -->
      <div class="goods-list">
          <SubSort @sort-change="sortChange"></SubSort>
          <!-- 列表 -->
          <ul>
            <li v-for="goods in goodsList" :key="goods.id" >
              <GoodsItem :goods="goods" />
            </li>
          </ul>
          <!-- 无限加载组件 -->
          <xtx-infinite-loading :loading="loading" :finished="finished" @infinite="getData"></xtx-infinite-loading>
      </div>
  </div>
</div>
</template>

<script>

import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { ref } from '@vue/reactivity'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
import { watch } from '@vue/runtime-core'

export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup () {
    // 1. 基础布局
    // 2. 无限加载组件
    // 3. 动态加载数据且渲染
    // 4. 任何筛选条件变化需要更新列表
    const route = useRoute()

    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    // 查询参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    // 获取数据函数
    const getData = () => {
      loading.value = true
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.pageData.items.length) {
          goodsList.value.push(...result.pageData.items)
          reqParams.page++
        } else {
          // 加载完毕
          finished.value = true
        }
        // 请求结束
        loading.value = false
      })
    }

    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/sub/${newVal}` === route.path) {
        finished.value = false
        goodsList.value = [] // 导致列表空的，加载更多组件顶上来，进入可视区，加载数据
        reqParams = {
          page: 1,
          pageSize: 20
        }
      }
    })
    // 1.0 更改排序组件的筛选数据，重新请求
    const sortChange = (sortParams) => {
      // console.log(sortParams)
      finished.value = false
      // 合并请求参数，保留之前的参数
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
    }
    // 2.0 更改筛选组件的筛选数据，重新请求

    return { loading, finished, goodsList, getData, sortChange }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
    ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
