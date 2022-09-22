<template>
  <!-- 店铺logo -->
  <div class="detailshop">
    <div class="shop-top">
      <img :src="shop.logo" alt="" />
      <span class="title">{{ shop.name }}</span>
    </div>

    <!-- 店铺数据 -->
    <div class="shop-meddle">
      <div class="shop-meddle-item shop-left">
        <div class="info-sells">
          <div class="sells-count">
            {{ shop.sells }}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{ shop.goodsCount }}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-meddle-item shop-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-more': item.isBetter }">
              <span class="pf">{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 底部 -->
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShop",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 16px;
  line-height: 40px;
  margin-left: 10px;
}
.shop-top {
  height: 65px;
  display: flex;
  margin-top: 25px;
}
.shop-top img {
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border: 1px solid #999;
}
.shop-meddle {
  height: 50px;
  font-size: 12px;
  display: flex;
}
.shop-left {
  display: flex;
  text-align: center;
}
.info-sells {
  margin: auto;
  font-size: 14px;
  font-weight: bold;
}
.info-goods {
  font-size: 14px;
  margin: auto;
  font-weight: bold;
}
table {
  /* flex: 1; */
  margin: auto;
}
.score {
  color: rgb(57, 185, 24);
}
.score-better {
  color: rgb(248, 131, 131);
}
.better {
  background-color: rgb(51, 255, 0, 0.3);
}
.better-more {
  background-color: rgba(212, 30, 30, 0.3);
}

.shop-meddle-item {
  flex: 1;
}

.shop-bottom {
  padding-top: 20px;
  text-align: center;
  padding-bottom: 50px;
  border-bottom: 5px solid #f2f5f8;
}
.shop-bottom .enter-shop {
  margin: 0 auto;
  width: 200px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #999;
  border-radius: 20px;
}
</style>