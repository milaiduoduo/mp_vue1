<template>
    <div class="container">
      <div class="userinfo">
        <img class='avatar' :src="userInfo.avatarUrl" alt="">
        <div>{{userInfo.nickName}}</div>
      </div>
      <button v-if="userInfo.openId" @click="scanBook" class='btn'>添加图书</button>
      <button v-else open-type="getUserInfo" @getuserinfo="login">点击登录</button>
    </div>
</template>

<script>
import { showSuccess } from "@/util.js"; //优化
import qcloud from "wafer2-client-sdk";
import config from "@/config.js";
export default {
  data() {
    return {
      userInfo: {
        avatarUrl: "http://image.shengxinjing.cn/rate/unlogin.png",
        nikeName: ""
      }
    };
  },
  onShow() {
    // wx.showShareMenu();
    let userInfo = wx.getStorageSync("userinfo");
    if (userInfo) {
      this.userInfo = userInfo;
    }
  },
  // created() {
  //   // this.userInfo = wx.getStorageSync("userinfo");
  //   // console.log("Me.vue, this.userinfo:", this.userInfo);
  // },
  methods: {
    login() {
      wx.showToast({
        title: "登录中",
        icon: "loading"
      });
      qcloud.setLoginUrl(config.loginUrl);
      const session = qcloud.Session.get();
      console.log("session:", session);
      if (session) {
        qcloud.loginWithCode({
          success: res => {
            console.log("没过期的登录", res);
            this.loginSuccess(res);
          },
          fail: err => {
            console.error(err);
          }
        });
      } else {
        qcloud.login({
          success: res => {
            console.log("登陆成功！", res);
            this.loginSuccess(res);
          },
          fail: err => {
            console.error(err);
          }
        });
      }
    },
    scanBooks() {
      wx.scanCode({
        success(res) {
          console.log("book info: ", res);
        }
      });
    },
    loginSuccess(res) {
      showSuccess("登录成功！");
      wx.setStorageSync("userinfo", res);
      this.userInfo = res;
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


