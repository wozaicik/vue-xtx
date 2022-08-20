<template>
  <div class="home-new">
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <div style="position: relative;height: 426px;">
      <Transition name="fade">
        <ul v-if="goods.length" ref="pannel" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="">
              <p class="name">{{item.title}}</p>
              <p class="desc">{{item.alt}}</p>
            </RouterLink>
          </li>
        </ul>
         <HomeSkeleton bg="#f0f9f4" v-else />
      </Transition>
    </div>
  </HomePanel>
  </div>
</template>
<script>
import { ref } from 'vue'
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton.vue'
import { findNew } from '@/api/home'
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup () {
    const goods = ref([])
    findNew().then(data => {
      goods.value = data.result
    })
    return { goods }
  }
}
</script>
<style scoped lang="less">
.fade{
  &-leave {
    &-active {
      position: absolute;
      width: 100%;
      transition: opacity .5s .2s;
      z-index: 1;
    }
    &-to {
      opacity: 0;
    }
  }
}
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    // background: red;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
