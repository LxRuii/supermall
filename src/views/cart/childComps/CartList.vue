<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :itemInfo="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem.vue";
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/scroll.vue";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: 100vh;
  overflow: hidden;
}
.content {
  height: calc(100% - 44px - 49px - 40px);
}
</style>