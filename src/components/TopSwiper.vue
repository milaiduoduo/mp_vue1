<template>
    <swiper class="swiper"
    :indicator-dots='true'
    indicator-color='#EA5A49'
    :autoplay='true'
    :interval='6000'
    :duration='1000'
    :circular='true'
    >
    <!-- <div v-for='(top,index) in tops' :key='index'>
        <swiper-item> 
            <img class='imageItem' :src="top.image" :alt="top.title" mode="aspectFit">
        </swiper-item>
    </div> -->
    <div v-for='(topGroup,index) in imgGroup' :key='index'>
        <swiper-item> 
            <img class="slide-image" 
            @click="toBookDetail(img)"
            v-for='(img,indexImage) in topGroup' 
            :key='indexImage' 
            :src="img.image" 
            :alt="img.title" 
            mode="aspectFit">
        </swiper-item>
    </div>
    </swiper>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["tops"],
  computed: {
    imgGroup() {
      let res = this.tops;
      //   console.log("this.tops22222:", [
      //     res.slice(0, 3),
      //     res.slice(3, 6),
      //     res.slice(6, 9)
      //   ]);
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6, 9)];
    }
  },
  mounted() {
    // console.log("this.tops11111:", this.imgGroup);
    // console.log("imgGroup:", this.imgGroup);
  },
  methods: {
    toBookDetail(img) {
      wx.navigateTo({
        url: "/pages/bookDetail/main?id=" + img.id
      });
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.swiper {
  margin-top: 10px;
  .slide-image {
    width: 33%;
    height: 270rpx;
  }
}
</style>
