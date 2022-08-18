<template>
<!-- 顶部通栏 -->
<AppNavbar/>
<!-- 头部组件 -->
<AppHeader/>
<!-- 吸顶组件 -->
<AppHeaderSticky/>
<!-- 内容容器 -->
<div class="app-body">
    <RouterView></RouterView>
</div>
<!-- 底部组件 -->
<footer><AppFooter/></footer>
</template>

<script>
import AppNavbar from '@/components/app-navbar.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>
<style lang="less" scoped>
.app-body{
min-height: 600px;
}
</style>>
