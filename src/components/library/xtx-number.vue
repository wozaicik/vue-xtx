<template>
    <div class="xtx-numbox">
      <div class="label" v-if="label">{{label}}</div>
      <div class="numbox">
        <a @click="changeNum(-1)" href="javascript:;">-</a>
        <input type="text" readonly :value="modelValue">
        <a @click="changeNum(1)" href="javascript:;">+</a>
      </div>
    </div>
  </template>
<script>
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxNumbox',
  props: {
    modelValue: {
      type: Number,
      default: 1
    },
    // 最小值，最大值
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10
    },
    label: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 1.0 绑定按钮点击事件 -按钮  +按钮 触发同一个事件，同一个函数，传不同的函数
    // 2.0 使用vueuse的useModel做数据绑定 修改count 通知父组件更新
    const count = useVModel(props, 'modelValue', emit)
    const changeNum = (step) => {
      // 3.0得到将要改变的值，如果值不合法，终止程序
      const newVal = count.value + step
      if (newVal < props.min || newVal > props.max) return
      count.value = newVal
      // 提供change事件
      emit('change', newVal)
    }

    return { changeNum, count }
  }
}
</script>
  <style scoped lang="less">
  .xtx-numbox {
    display: flex;
    align-items: center;
    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
    .numbox {
      width: 120px;
      height: 30px;
      border: 1px solid #e4e4e4;
      display: flex;
      > a {
        width: 29px;
        line-height: 28px;
        text-align: center;
        background: #f8f8f8;
        font-size: 16px;
        color: #666;
        &:first-of-type {
          border-right:1px solid #e4e4e4;
        }
        &:last-of-type {
          border-left:1px solid #e4e4e4;
        }
      }
      > input {
        width: 60px;
        padding: 0 5px;
        text-align: center;
        color: #666;
      }
    }
  }
  </style>
