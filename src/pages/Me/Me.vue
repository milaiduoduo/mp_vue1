<template>
    <div class="mewrap">
      <div class="userinfo">
        <img class='avatar' :src="userInfo.avatarUrl" alt="">
        <div>{{userInfo.nickName}}</div>
      </div>
      <button v-if="userInfo.openId" @click="scanBooks" class='btn'>扫码添加图书</button>
      <button v-else open-type="getUserInfo" @getuserinfo="login" class='btn'>点击登录</button>
    </div>
</template>

<script>
import { showSuccess, showModal, post } from "@/util.js"; // 优化
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
        success: res => {
          console.log("book info: ", res);
          // 发送请求到豆瓣
          if (res.result) {
            this.addBook(res.result);
          }
        }
      });
    },
    async addBook(isbn) {
      // 向豆瓣图书api发送请求，
      const res = await post(config.doubanBookUrl, {
        isbn,
        openid: this.userInfo.openId
      });
      console.log("douBan res:", res);
      if (res.title) {
        showModal("添加成功", `${res.title}添加成功`);
      }
      // } catch (err) {
      //   //失败！
      //   showModal("添加失败", err);
      // }
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
.mewrap {
  padding: 0 30rpx;
  .userinfo {
    margin: 100rpx 0 30rpx 0;
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


