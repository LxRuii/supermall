<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :isChecked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>

    <div class="calculate" @click="calcClick">去结算:({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottonBar",
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        // 全部选中
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        // 部分选中或者全部不选中
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },

    calcClick() {
      if (!this.$store.getters.cartList.find((item) => item.checked)) {
        this.$toast.show("请选择您购买的商品", 2000);
      }
    },
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((praValue, item) => {
            return praValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  height: 40px;
  background-color: #eee;
  bottom: 134px;
  line-height: 40px;
  font-size: 14px;
  display: flex;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 16px;
  height: 16px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 15px;
}
.calculate {
  text-align: center;
  width: 80px;
  position: absolute;
  right: 0;
  background-color: orangered;
  color: #fff;
}
</style>