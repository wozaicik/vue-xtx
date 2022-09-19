
<script>
export default {
  name: 'XtxSteps',
  props: {
    active: {
      type: Number,
      default: 1
    }
  },
  render () {
    // 1.0 获取到默认插槽的节点
    const items = this.$slots.default()
    // console.log(items)
    // 2.0 获取所有动态生成的xtxstepitem组件节点
    const dymanicItems = []
    // 3.0 根据动态节点生成item的js对象
    items.forEach(item => {
      if (item.type === 'xtx-steps-item') {
        // console.log(item.type.name)
        dymanicItems.push(item)
      } else {
        item.children.forEach(itemChil => {
          dymanicItems.push(itemChil)
        })
      }
    })
    // console.log(dymanicItems)
    // 3.0
    const itemsJsx = dymanicItems.map((item, i) => {
      return (
        <div class="xtx-steps-item" >
            <div class="step"><span>{i + 1}</span></div>
            <div class="title">{item.props.title}</div>
            <div class="desc">{item.props.desc}</div>
        </div>
      )
    })
    // 4.0 插入大容器中
    return <div class="xtx-steps">{itemsJsx}</div>
  }
}
</script>
  <style lang="less">
  .xtx-steps {
    display: flex;
    text-align: center;
    &-item {
      flex: 1;
      &:first-child {
        .step {
          &::before {
            display: none;
          }
        }
      }
      &:last-child {
        .step {
          &::after {
            display: none;
          }
        }
      }
      &.active {
        .step {
          > span {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff
          }
          &::before,&::after {
            background: @xtxColor;
          }
        }
        .title {
          color: @xtxColor;
        }
      }
      .step {
        position: relative;
        > span {
          width: 48px;
          height: 48px;
          font-size: 28px;
          border: 2px solid #e4e4e4;
          background: #fff;
          border-radius: 50%;
          line-height: 44px;
          color: #ccc;
          display: inline-block;
          position: relative;
          z-index: 1;
        }
        &::after,&::before{
          content: "";
          position: absolute;
          top: 23px;
          width: 50%;
          height: 2px;
          background: #e4e4e4;
        }
        &::before {
           left: 0;
        }
        &::after {
           right: 0;
         }
      }
      .title {
        color: #999;
        padding-top: 12px;
      }
      .desc {
        font-size: 12px;
        color: #999;
        padding-top: 6px;
      }
    }
  }
  </style>

<!-- <template>
    <div class="xtx-steps">
      <div class="xtx-steps-item active" v-for="i in 5" :key="i">
        <div class="step"><span>{{i}}</span></div>
        <div class="title">提交订单</div>
        <div class="desc">2021-03-18 02:11:47</div>
      </div>
    </div>
  </template> -->
