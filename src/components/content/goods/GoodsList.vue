<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goods-item="item"
      class="goods-item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods {
  /* padding-top: 30px; */
  display: flex;
  /* flex包裹  默认不包裹，给了包裹的话，会根据元素的宽来决定一行显示多少个 */
  flex-wrap: wrap;
  /* 均等分 */
  justify-content: space-evenly;
}
</style>