<script>
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
</script>
