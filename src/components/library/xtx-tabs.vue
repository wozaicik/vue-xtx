<script>
import { useVModel } from '@vueuse/core'
import { provide } from '@vue/runtime-core'

export default {
  name: 'XtxTabs',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  setup (props, { emit }) {
    // 接受v-model的值
    const activeName = useVModel(props, 'modelValue', emit)
    // 给每一个panel传值
    provide('activeName', activeName)
    // 点击选项卡触发函数
    const tabClick = (name, index) => {
      activeName.value = name
      //   提供一个tab-click自定义事件
      emit('tab-click', { name, index })
    }

    return { activeName, tabClick }
  },
  render () {
    // 获取插槽内容
    const panels = this.$slots.default()
    // 动态的panel组件集合
    const dynamicPanels = []
    panels.forEach(item => {
      if (item.type.name === 'XtxTabsPanel') {
        // 静态的
        dynamicPanels.push(item)
      } else {
        // 动态的
        item.children.forEach(item => {
          dynamicPanels.push(item)
        })
      }
    })
    // 需要在这里组织
    // 1.0 tabs组件大容器
    // 2.0 选项卡的导航菜单结构
    // 3.0 内容容器
    const nav = <nav>
        {dynamicPanels.map((item, i) => {
          return <a onClick={() => this.tabClick(item.props.name, i)}
            class={{ active: item.props.name === this.activeName }}
            href="javascript:;">{item.props.label}</a>
        })}
    </nav>
    return <div class="xtx-tabs">{[nav, panels]}</div>
  }
}
</script>

<style lang="less" scoped>
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>

<!-- <script>
    export default {
      name: 'XtxTabs',
      render () {
        // 返回的内容会进行渲染
        // 1.0 在babel的帮助下，可以在vue中写jsx语法
        // 2.0 数据的使用
        // 3.0 事件如何绑定
        const name = 'tom'
        const title = 'tom 12'
        const say = () => {
          console.log('hi jsx')
        }

        // 4.0  定义一个jsx对象
        const sub = <sub>123</sub>

        return <h1 title={title} onClick={say}>{name}{sub}</h1>
      }
    }
    </script> -->
