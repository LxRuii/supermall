<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav"><div slot="center">商品首页</div></nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "./childrenComps/HomeSwiper";
import RecommendView from "./childrenComps/RecommendViews.vue";

import { getHomeMultidata } from "network/home"; //什么时候需要网络请求呢，组件创建完之后需要

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
  },
  data() {
    return {
      /* 1.一起存储
      result: null,
      2.分别存储*/
      banners: [],
      recommends: [],
    };
  },
  created() {
    // 请求多个数据 res拿到我们请求的数据  然后用data分别存储这个数据
    getHomeMultidata().then((res) => {
      console.log(res);
      /* 1 全部保存到result里  但是数据多不方便
       this.result = res;
      使用下面的方法分别保存 */
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style>
.home-nav {
  background-color: #ff8198;
  color: #fff;
}
</style>