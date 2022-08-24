<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem :key="category.top.id" v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</XtxBreadItem>
    <transition name="fade-right">
        <XtxBreadItem :key="category.sub.id" v-if="category.sub" >{{category.sub.name}}</XtxBreadItem>
    </transition>
  </XtxBread>
</template>
<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'SubBread',
  setup () {
    // 通过计算属性从vuex获取顶级和二级类目信息
    // 对象：{top:{id,name},sub:{id:name}}
    const route = useRoute()
    const store = useStore()
    const category = computed(() => {
      const cate = {}

      store.state.category.list.forEach(top => {
        if (top.children) {
          const sub = top.children.find(sub => sub.id === route.params.id)
          if (sub) {
            cate.top = { id: top.id, name: top.name }
            cate.sub = { id: sub.id, name: sub.name }
          }
        }
      })

      return cate
    })
    return { category }
  }
}
</script>
<style scoped lang="less"></style>
