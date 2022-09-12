<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li><span>收<i />货<i />人：</span>{{showAddress.receiver}}</li>
        <li><span>联系方式：</span>{{showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})/,'$1****$2')}}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation}}{{showAddress.address}}</li>
      </ul>
      <a v-if="showAddress" href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton @click="openDialog()" class="btn">切换地址</XtxButton>
      <XtxButton @click="openAddressEdit" class="btn">添加地址</XtxButton>
    </div>
  </div>
  <!-- 对话框组件 -->
  <XtxDialog title="切换收货地址" v-model:visible="visibleDialog">
        <div @click="selectedAddress=item" :class="{active:selectedAddress&&selectedAddress.id===item.id}" class="text item" v-for="item in list" :key="item.id">
          <ul>
            <li><span>收<i/>货<i/>人：</span>{{item.receiver}}</li>
            <li><span>联系方式：</span>{{item.contact.replace(/^(\d{3})\d{4}(\d{4})/,'$1****$2')}}</li>
            <li><span>收货地址：</span>{{item.fullLocation.replace(/ /g,'')+item.address}}</li>
          </ul>
        </div>
    <template v-slot:footer>
      <XtxButton @click="visibleDialog=false" type="gray" style="margin-right:20px">取消</XtxButton>
      <XtxButton @click="confirmAddressFn" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
  <!-- 添加收货地址编辑组件 -->
  <AddressEdit ref="addressEditCom"></AddressEdit>
</template>
<script>
import { ref } from '@vue/reactivity'
import AddressEdit from './address-edit.vue'
export default {
  name: 'CheckoutAddress',
  components: {
    AddressEdit
  },
  props: {
    // 后货地址列表
    list: {
      type: Array,
      default: () => []
    }
  },
  // 在拥有根元素的组件中，触发自定义使用，有没有emits选中都可以
  // 如果你的组件是渲染的代码片段，vue3.0规范，需要在emits中声明你所触发的自定义事件
  // vue3 提倡：触发了自定事件，就需要在emits选项中声明下
  emits: ['change'],
  setup (props, { emit }) {
    // 1.0 找到默认收货地址
    // 2.0 使没有默认收货地址
    // 3.0 使用第一条收货地址
    // 4.0 如果没有数据 提示添加地址数据
    const showAddress = ref(null)
    const defaultAddress = props.list.find(item => item.idDefault === 0)
    if (defaultAddress) {
      showAddress.value = defaultAddress
    } else {
      if (props.list.length) {
        // eslint-disable-next-line vue/no-setup-props-destructure
        showAddress.value = props.list[0]
      }
    }

    // 默认通知父组件一个收货地址ID
    emit('change', showAddress.value && showAddress.value.id)
    // 显示隐藏
    const visibleDialog = ref(false)

    // 记录当前选中的地址ID
    const selectedAddress = ref(null)

    const confirmAddressFn = () => {
      // 显示的地址换成选中的地址
      // 把你选中的地址ID通知结算组件
      showAddress.value = selectedAddress.value
      emit('change', selectedAddress.value?.id)
      visibleDialog.value = false
    }

    const openDialog = () => {
      // 将之前选中的地址置为空
      selectedAddress.value = null
      visibleDialog.value = true
    }

    // 打开编辑收货地址组件
    const addressEditCom = ref(null)
    const openAddressEdit = () => {
      addressEditCom.value.open()
    }

    return { showAddress, visibleDialog, selectedAddress, confirmAddressFn, openDialog, openAddressEdit, addressEditCom }
  }
}
</script>
<style scoped lang="less">
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,&:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor,50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
</style>
