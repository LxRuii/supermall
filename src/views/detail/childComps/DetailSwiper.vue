<template>
  <div class="detail-swiper">
    <swiper class="swiper-height">
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.swiper-height {
  height: 300px;
  overflow: hidden;
}
</style>