<template>
<div class="home-entry">
    <!-- 首页入口（分类+广告） -->
    <div class="container">
    <!-- 左侧分类 -->
    <HomeCategory></HomeCategory>
    <!-- 轮播图 -->
    <HomeBanner/>
    </div>
</div>
</template>

<script>
import HomeCategory from './components/home-category.vue'
import HomeBanner from './components/home-banner.vue'

export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner
  }

}
</script>

<style lang="less" scoped>

</style>
