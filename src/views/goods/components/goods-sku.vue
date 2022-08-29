<template>
    <div class="goods-sku" >
      <dl v-for="item in goods.specs" :key="item.id">
        <dt>{{item.name}}</dt>
        <dd>
            <template v-for="val in item.values" :key="val.name">
                <img :class="{selected:val.selected,disabled:val.disabled}" @click="changeSku(item,val)" v-if="val.picture" :src=val.picture alt="" :title="val.name">
                <span :class="{selected:val.selected,disabled:val.disabled}" @click="changeSku(item,val)" v-else>{{val.name}}</span>
            </template>
        </dd>
      </dl>
    </div>
  </template>
<script>
import powerSet from '@/vender/power-set'
const spliter = '★'
// 得到一个路径字典对象
const getPathMap = (skus) => {
// 1.0 得到所有的sku集合 props.goods.skus
// 2.0 从所有的sku中筛选出有效的sku
// 3.0 根据有效的sku使用power-set算法得到子集
// 4.0 根据子集往路径字典对象中存储key-value
  const pathMap = {}

  skus.forEach(sku => {
    if (sku.inventory > 0) {
      // 计算当前有库存的sku的子集
      // 可选值数组
      const valueArr = sku.specs.map(val => val.valueName)
      const valueArrPowerSet = powerSet(valueArr)
      // console.log(valueArrPowerSet)
      // 遍历子集，往pathMap中插入数据
      valueArrPowerSet.forEach(arr => {
        // 根据arr得到字符串的key，约定key是：['蓝色'，'美国']===>'蓝色★美国'
        const key = arr.join(spliter)
        // 给pathMap设置数据
        if (pathMap[key]) {
          // 已经有值了
          pathMap[key].push(sku.id)
        } else {
        // 没有相同的值
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}

// 更新按钮禁用状态
const updateDisableStatus = (specs, pathMap) => {
// 1.0 约定每一个按钮的状态由本省的disable数据来控制
  specs.forEach(item => {
    item.values.forEach(val => {
      val.disabled = !pathMap[val.name]
    })
  })
}

export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    const pathMap = getPathMap(props.goods.skus)
    console.log(pathMap)
    // 组件初始化：更新按钮的禁用状态
    updateDisableStatus(props.goods.specs, pathMap)
    // 1.0 选中与取消选中，约定每一个按钮都拥有自己的选中状态数据：selected
    // 1.1 当你点击的是已选中，只需要取消已选中，
    // 1.2 点击的是未选中，把同一个规格的按钮取消选中，当前点击的改成选中

    const changeSku = (item, val) => {
      // 当按钮是禁用的阻止程序运行
      if (val.disabled) return
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(valItem => {
          valItem.selected = false
        })
        val.selected = true
      }
      // 点击按钮时，更新按钮状态
    }

    return { changeSku }
  }
}
</script>
  <style scoped lang="less">
  .sku-state-mixin () {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;
    &.selected {
      border-color: @xtxColor;
    }
    &.disabled {
      opacity: 0.6;
      border-style: dashed;
      cursor: not-allowed;
    }
  }
  .goods-sku {
    padding-left: 10px;
    padding-top: 20px;
    dl {
      display: flex;
      padding-bottom: 20px;
      align-items: center;
      dt {
        width: 50px;
        color: #999;
      }
      dd {
        flex: 1;
        color: #666;
        > img {
          width: 50px;
          height: 50px;
          .sku-state-mixin ();
        }
        > span {
          display: inline-block;
          height: 30px;
          line-height: 28px;
          padding: 0 20px;
          .sku-state-mixin ();
        }
      }
    }
  }
  </style>
