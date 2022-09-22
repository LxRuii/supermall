<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav"><div slot="center">商品首页</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      class="tab-control"
      ref="tabcontrol1"
      v-show="tabcontrolflex"
    ></tab-control>

    <!-- 滚动插件 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners"></home-swiper>
      <!-- 推荐模块 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 中间的 -->
      <feature-view></feature-view>
      <!-- 商品分类控制 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        class="tab-control"
        ref="tabcontrol2"
      ></tab-control>
      <!-- 商品列表 -->
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <!-- 返回顶部按钮效果 -->
    <back-top @click.native="topclick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/scroll"; // 滑动插件

import NavBar from "components/common/navbar/NavBar.vue"; // navbar
import TabControl from "components/content/tabControl/TabControl.vue"; // tabcontrol
import GoodsList from "components/content/goods/GoodsList"; // 商品列表
import BackTop from "components/content/backtop/BackTop"; // 点击上滑

import HomeSwiper from "./childrenComps/HomeSwiper"; // 轮播图
import RecommendView from "./childrenComps/RecommendViews.vue"; // 推荐模块
import FeatureView from "./childrenComps/FeatureView.vue"; // 中间的图片

import { getHomeMultidata, getHomeGoods } from "network/home"; //什么时候需要网络请求呢，组件创建完之后需要

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      /* 1.一起存储
      result: null,
      2.分别存储*/
      banners: [],
      recommends: [],
      // 首页商品数据模型
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShow: false,
      taboffsetTop: 0,
      tabcontrolflex: false,
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    // 3.监听item中图片加载完成
  },
  updated() {
    this.taboffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
  },

  methods: {
    /**
     * 事件监听相关的方法
     */
    // 分类栏的效果
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 吸顶效果的bug修复
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },
    // 返回顶部按钮效果
    topclick() {
      // $refs拿到scroll组件的元素然后调用组件里的scrollTo方法并传参
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 返回顶部按钮消失
    contentScroll(abc) {
      // console.log(-abc.y);
      this.isShow = -abc.y > 588;
      this.tabcontrolflex = -abc.y > this.taboffsetTop;
    },
    // 下拉加载更多（注意：加载方法得写在请求数据下面，只有请求了数据才能加载更多）
    loadMore() {
      console.log("加载");
      this.getHomeGoods(this.currentType);
    },
    // tabcontrol(abc){
    //   this.
    // },

    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      // 1.请求多个数据 res拿到我们请求的数据  然后用data分别存储这个数据
      getHomeMultidata().then((res) => {
        // console.log(res);
        /* 1 全部保存到result里  但是数据多不方便
       this.result = res;
      使用下面的方法分别保存 */
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    // 2.请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // console.log(this.goods[type].list);
        // 放在这里就是商品数据请求过来了再加载新的
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: #ff8198;
  color: #fff;

  /*在使用我们浏览器原生滚动时，为了不让导航栏不一起滚动
   position: sticky;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99; */
}
.tab-control {
  position: relative;
  z-index: 8;
}

.content {
  /* height: calc((100%) - (93px));
  overflow: hidden; */

  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>