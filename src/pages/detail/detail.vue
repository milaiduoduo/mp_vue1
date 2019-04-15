<template>
<div>
    <div class="bgImgWrap">
      <img mode="aspectFill" class="bgImg" :src="bookInfo.image">
      <img mode="aspectFit" class="bookImg"  :src="bookInfo.image" :alt="bookInfo.title">
      <div class="info">
        <div class="title">{{bookInfo.title}}</div>
        <div class="author">{{bookInfo.author}}</div>
      </div>
    </div>
    <button open-type="share">转发</button>
</div>
</template>

<script type="text/ecmascript-6">
import { get } from "@/util";
import config from "@/config";
export default {
  data() {
    return {
      id: "",
      bookInfo: {}
    };
  },
  mounted() {
    this.id = this.$root.$mp.query.id;
    this.getBookDetail();
    console.log("这句是同步代码，所以this.bookInfo为空：", this.bookInfo);
  },
  onShow() {
    //要用转发功能，需要手动添加onShow生命周期，调用 wx.showShareMenu({});才可以显示转发。
    wx.showShareMenu();
  },
  methods: {
    async getBookDetail() {
      //浏览量+1
      // console.log("in getBookDetail:", config.getBookDetail);
      const bookInfo = await get(config.getBookDetail, { id: this.id });
      this.bookInfo = bookInfo;
      //setNavigationBarTitle这句还不能单独写在mounted里，还只能写在async回调里。。。。。。
      wx.setNavigationBarTitle({ title: this.bookInfo.title });
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.bgImgWrap {
  position: relative;
  overflow: hidden;
  .bgImg {
    width: 750rpx;
    height: 500rpx;
    filter: blur(15px);
  }
  .bookImg {
    position: absolute;
    width: 100%;
    height: 300rpx;
    left: 0px;
    top: 30rpx;
  }
  .info {
    position: absolute;
    top: 350rpx;
    left: 0;
    width: 100%;
    color: #fff;
    text-align: center;
    .title {
      font-size: 20px;
    }
    .author {
      font-size: 14px;
    }
  }
}
</style>
