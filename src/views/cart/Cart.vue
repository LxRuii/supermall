<template>
  <div class="cart">
    <nav-bar class="navbar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import CartBottomBar from "./childComps/CartBottomBar.vue";

import { mapGetters } from "vuex";
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComps/CartList.vue";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
</script>

<style scoped>
.navbar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 600;
}
</style>