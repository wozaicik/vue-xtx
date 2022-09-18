<template>
<div class="member-order">
    <!-- memberoder -->
    <!-- 体验jsx语法 -->
    <XtxTabs v-model="activeName" @tab-click="tabClick">
        <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name">
        <!-- {{item.label}} -->
        </XtxTabsPanel>
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <OrderItem
        @on-delete="handlerDelete"
        @on-cancel="handlerCancel"
        @on-confirm="handlerConfirm"
        @on-logistics="handlerLogistics"
        v-for="item in orderList"
        :key="item.id"
        :order="item">
      </OrderItem>
      <div class="none" v-if="!loading && orderList.length === 0" >暂无数据</div>
    </div>
    <!-- 分页组件 -->
    <XtxPagination
      v-if="total > reqParams.pageSize"
      @current-page="reqParams.page=$event"
      :total="total"
      :page-size="reqParams.pageSize"
      :current-page="reqParams.page"  />
      <!-- 取消原因组件 -->
      <OrderCancel ref="orderCancelCom"></OrderCancel>
      <!-- 查看物流组件 -->
      <OrderLogistics ref="orderLogisticsCom"></OrderLogistics>
</div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { orderStatus } from '@/api/constants'
import OrderItem from './components/order-item.vue'
import OrderCancel from './components/order-cancel.vue'
import OrderLogistics from './components/order-logistics.vue'
import { confirmOrder, deleteOrder, findOrderList } from '@/api/order'
import { watch } from '@vue/runtime-core'
import Confirm from '@/components/library/Confirm'
import Message from '@/components/library/Message'

export default {
  name: 'MemberOrder',
  components: { OrderItem, OrderCancel, OrderLogistics },
  setup () {
    const activeName = ref('all')

    const reqParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })

    const orderList = ref([])
    const loading = ref(false)
    const total = ref(0)

    const getOrderList = () => {
      loading.value = true
      findOrderList(reqParams).then(data => {
        orderList.value = data.result.items
        total.value = data.result.counts
        loading.value = false
      })
    }

    watch(reqParams, () => {
      getOrderList()
    }, { immediate: true })

    const tabClick = ({ index }) => {
      reqParams.page = 1
      reqParams.orderState = index
    }

    // 删除订单
    const handlerDelete = (order) => {
      Confirm({ text: '亲，您确认删除该订单吗' }).then(() => {
        deleteOrder(order.id).then(() => {
          Message({ type: 'success', text: '删除订单成功' })
          getOrderList()
        })
      }).catch(() => {})
    }

    return { activeName, orderStatus, orderList, loading, tabClick, total, reqParams, ...useCancel(), ...useConfirm(), ...useLogistics(), handlerDelete }
  }
}
// 取消订单逻辑
const useCancel = () => {
  const orderCancelCom = ref(null)
  const handlerCancel = (order) => {
    // console.log(1)
    orderCancelCom.value.open(order)
  }
  return { handlerCancel, orderCancelCom }
}
// 确认收货逻辑
const useConfirm = () => {
  const handlerConfirm = (order) => {
    Confirm({ text: '亲，您确认收货吗？确认后货款将打给卖家' }).then(() => {
      confirmOrder(order.id).then(() => {
        Message({ type: 'success', text: '确认收货成功' })
        order.orderState = 4
      })
    }).catch(() => {})
  }
  return { handlerConfirm }
}
// 查看物流逻辑
const useLogistics = () => {
  const orderLogisticsCom = ref(null)
  const handlerLogistics = (order) => {
    orderLogisticsCom.value.open(order)
  }
  return { handlerLogistics, orderLogisticsCom }
}
</script>

<style lang="less" scoped>
.member-order{
    height: 100%;
    background:#fff  ;
}
.order-list {
  background: #fff;
  padding: 20px;
  position:relative;
}
.loading {
  height: 100%;
  width: 100%;
  min-height: 400px;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
