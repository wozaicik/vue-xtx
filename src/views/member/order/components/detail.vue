<template>
    <div class="member-order-detail" v-if="order">
        <!-- memberdetail -->
        <!-- 头部 -->
        <DetailAction  :order="order"></DetailAction>
        <!-- 进度 -->
        <DetailStep :order="order"></DetailStep>
        <!-- 物流 -->
        <suspense>
          <template #default>
            <DetailLogistics v-if="[3,4,5].includes(order.orderState)" :order="order"></DetailLogistics>
          </template>
          <template #fallback>
            <div class="loading">loading...</div>
          </template>
        </suspense>
        <!-- 信息 -->
    </div>
</template>

<script>
import { findOrderDetail } from '@/api/order'
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import DetailAction from './detail-action.vue'
import DetailStep from './detail-step.vue'
import DetailLogistics from './detail-logistics.vue'
export default {
  name: 'MemberDetail',
  components: { DetailAction, DetailStep, DetailLogistics },
  setup () {
    const route = useRoute()

    const order = ref(null)
    findOrderDetail(route.params.id).then(data => {
      order.value = data.result
    })

    return { order }
  }
}
</script>

<style lang="less" scoped>
.member-order-detail{
background: #fff;
height: 100%;
}
.loading{
  height: 50px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    background-color: #f5f5f5;
    margin: 30px 50px 0;
}
</style>
