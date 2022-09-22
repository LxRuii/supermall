<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#1296db",
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) != -1; //indexOf() = -1就是找到，!= -1就是没找到
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  /* 布局均分 */
  flex: 1;
  /* 居中 */
  text-align: center;
  height: 49px;
  /* line-height: 49px; */
  font-size: 12px;
  margin-top: 3px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  /* 图片下面会多三个像素,使用以下方法可以去除 */
  vertical-align: middle;
}
.active {
  color: #1296db;
}
</style>