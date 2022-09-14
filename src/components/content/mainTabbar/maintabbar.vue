<template>
  <tab-bar>
    <!-- 有几个就插几个<tab-bar-item>标签 -->
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/首页.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/首页(选中).svg" />
      <div slot="item-text">首页</div>
    </tab-bar-item>

    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/分类.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/分类(选中).svg" />
      <div slot="item-text">分类</div>
    </tab-bar-item>

    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/购物车.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/购物车(选中).svg" />
      <div slot="item-text">购物车</div>
    </tab-bar-item>

    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/我的.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/我的(选中).svg" />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style>
</style>