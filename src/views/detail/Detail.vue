<template>
  <div id="detail">
    <detail-nav-bar
      class="top-nav"
      @indexClick="indexClick"
      ref="nav"
    ></detail-nav-bar>

    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop :shop="shop"></detail-shop>
      <!-- 商品详情数据 -->
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imgLoad"
      ></detail-goods-info>
      <!-- 商品尺码数据 -->
      <detail-param-info
        :paramInfo="paraminfo"
        ref="params"
      ></detail-param-info>
      <!-- 评论区 -->
      <comment-info :commentInfo="commentInfo" ref="pl"></comment-info>
      <!-- 商品推荐 -->
      <goods-list :goods="getrecommends" ref="glist"></goods-list>
    </scroll>
    <back-top @click.native="backtopclick" v-show="isShow"></back-top>
    <!-- 添加商品到购物车 -->
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- 吐丝 -->
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShop from "./childComps/DetailShop.vue";
import Scroll from "components/common/scroll/scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import CommentInfo from "./childComps/CommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList"; // 商品列表
import BackTop from "components/content/backtop/BackTop"; // 点击上滑
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import { mapActions } from "vuex";

import Toast from "components/common/toast/Toast";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShop,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    CommentInfo,
    GoodsList,
    BackTop,
    DetailBottomBar,
    Toast,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paraminfo: {},
      commentInfo: {},
      getrecommends: [],
      themeTopYs: [],
      isShow: false,
      taboffsetTop: 0,
      tabcontrolflex: false,
      currentIndex: 0,
      message: "",
      show: false,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 1.获取顶部图片轮播数据
      const data = res.result;

      // 2.取出轮播图数据
      this.topImages = data.itemInfo.topImages;

      // 3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 4.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // console.log(this.shop);

      // 5.获取商品详情
      this.detailInfo = data.detailInfo;

      // 6.获取尺码信息
      this.paraminfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 7.取出评论区的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 8.请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.getrecommends = res.data.list;
    });
  },

  //获取组件的高度，给导航栏定位offsetTop值

  methods: {
    ...mapActions(
      ["addCart"] // 映射Vuex的mapActions的'addCart'函数  数组模式
      // { add: "addCart" } // 对象模式
    ),
    imgLoad() {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.pl.$el.offsetTop);
      this.themeTopYs.push(this.$refs.glist.$el.offsetTop);
      console.log(this.themeTopYs);
      this.$refs.scroll.scroll.refresh();
    },
    // 通过点击导航栏移动到组件的位置
    indexClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.$refs.scroll.scrollTo(0, 0, 500);
          break;
        case 1:
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[1] + 49, 500);
          break;
        case 2:
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[2] + 49, 500);
          break;
        case 3:
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[3] + 49, 500);
          break;
      }
    },
    contentScroll(abc) {
      // backtop方法
      // console.log(-abc.y);
      const positionY = -abc.y;
      this.isShow = positionY > 588;
      this.tabcontrolflex = positionY > this.taboffsetTop;

      // 判断内容滚动，显示正确的标题
      const length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    backtopclick() {
      // $refs拿到scroll组件的元素然后调用组件里的scrollTo方法并传参
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 添加到购物车
    addToCart() {
      // 获取到购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //将商品添加到购物车(1.Promise 2.mapActions)
      this.addCart(product).then((res) => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);
        this.$toast.show(res, 2000);
        console.log(this.$toast);
      });
      // this.$store.dispatch("addCart", product).then((res) => {
      //   // 显示添加购物车的吐丝
      //   console.log(res);
      // });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  top: 0;
  z-index: 101;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
}
.top-nav {
  position: relative;
  z-index: 5;
  background-color: #fff;
}
</style>