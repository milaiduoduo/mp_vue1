<script>
import qcloud from "wafer2-client-sdk";
import config from "@/config.js";
export default {
  async created() {
    // console.log("app.vue config.loginUrl:", config.loginUrl);
    qcloud.setLoginUrl(config.loginUrl);
    const session = qcloud.Session.get();
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
          console.log("登录成功", res);
          this.loginSuccess(res);
        },
        fail: err => {
          console.error(err);
        }
      });
    }
    console.log("app.vue 小程序启动了！");
  },
  methods: {
    loginSuccess(res) {
      // showSuccess("登录成功");
      wx.setStorageSync("userinfo", res);
      this.userinfo = res;
    }
  }
};
</script>
<style>
</style>


