<script>
import { showSuccess } from "./util"; //优化
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
          console.error("登录失败：", err);
        }
      });
    } else {
      qcloud.login({
        success: res => {
          console.log("登录成功：", res);
          this.loginSuccess(res);
        },
        fail: err => {
          console.error("登录失败：", err);
        }
      });
    }
    console.log("app.vue 小程序启动了！");
  },
  methods: {
    loginSuccess(res) {
      showSuccess("登录成功");
      wx.setStorageSync("userinfo", res);
      this.userinfo = res;
    }
  }
};
</script>
<style>
.btn {
  color: #fff;
  background: #ea5a49;
  margin-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
}
.btn:active {
  background: #fa5a49;
}
</style>


