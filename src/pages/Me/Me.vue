<template>
    <div class="container">
        <div class="userinfo">
            <img :src="userinfo.avatarUrl" alt="">
            <p>{{userinfo.nickName}}</p>
        </div>
        <year-progress></year-progress>
        <button class="btn" @click="scanBooks">添加图书</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {
        avatarUrl: "../../static/img/unlogin.png",
        nickName: "点击登录"
      }
    };
  },
  created() {
    this.userinfo = wx.getStorageSync("userinfo");
    console.log("Me.vue, this.userinfo:", this.userinfo);
  },
  methods: {
    scanBooks() {
      wx.scanCode({
        success(res) {
          console.log("book info: ", res);
        }
      });
    }
  }
};
</script>
<style lang="scss">
.container {
  padding: 0 30rpx;
  .userinfo {
    margin-top: 100rpx;
    text-align: center;
    img {
      width: 150rpx;
      height: 150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }
}
</style>


