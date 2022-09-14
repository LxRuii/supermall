<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Tabber",
};
</script>

<style>
/* style中引入格式 */
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* 阴影 X轴偏移 Y轴偏移 大小 颜色 */
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.3);
}
</style>