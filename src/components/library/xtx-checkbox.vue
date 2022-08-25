<template>
  <div  class="xtx-checkbox" @click="changechecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </div>
</template>
<script>
import { useVModel } from '@vueuse/core'

// v-model ===>:modelValue+@update:modelValue
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const checked = useVModel(props, 'modelValue', emit)
    const changechecked = () => {
      const newVal = !checked.value
      // 该值通知父组件
      checked.value = newVal
      //  让组件支持change事件
      emit('change', newVal)
    }
    return { checked, changechecked }
  }
}

</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
