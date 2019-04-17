<template>
<div class="bookDetailWrap">
  <div class="bookDetail group">
    <div class="bgImgWrap">
      <img mode="aspectFill" class="bgImg" :src="bookInfo.image">
      <img mode="aspectFit" class="bookImg"  :src="bookInfo.image" :alt="bookInfo.title">
      <div class="info">
        <div class="title">{{bookInfo.title}}</div>
        <div class="author">{{bookInfo.author}}</div>
      </div>
    </div>
    <div class="detail">
      <img class="m_avatar" mode='aspectFit' :src="userinfo.image" :alt="bookInfo.title">
      {{userinfo.name}}
      <div class="right text-primary">
        {{userinfo.name}}
        {{bookInfo.rate}}分 <rate :value="bookInfo.rate"></rate>
      </div>
    </div>
    <div class="detail">
      {{bookInfo.publisher}}
      <div class="right">
        {{bookInfo.price}}
      </div>
    </div>
    <div class="detail summary">
      <div class="groupTitle text-primary">简介：</div>
      <p v-for='(item,index) in bookInfo.summary' :key="index">
        {{item}}
      </p>
    </div>
    <!-- <button open-type="share">转发</button> -->
  </div>
  <comments-list :commentsList=commentList v-if="commentList.length"></comments-list>
  <div class="otherWrap">
    <textarea class='textarea commentInput' v-model='comment' :maxlength='200' placeholder="请输入图书短评"></textarea>
    <div class="section location">
      <span>地理位置：</span>
      <switch :color='maincolor' :checked='location' @change='getLocation' ></switch>
      <span class="text-primary">{{location}}</span>
    </div>
    <div class="section phone">
      <span>手机型号：</span>
      <switch :color='maincolor' :checked='phone' @change='getPhone'></switch>
      <span class="text-primary">{{phone}}</span>
    </div>
    <button class="btn" @click.stop="addComment">评论</button>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import { get, post, showModal } from "@/util";
import config from "@/config";
import rate from "@/components/Rate";
import commentsList from "@/components/CommentsList";

export default {
  data() {
    return {
      bookId: "",
      bookInfo: {},
      phone: "",
      location: "",
      comment: "",
      userinfo: {},
      maincolor: "#EA5A49",
      commentList: []
    };
  },
  components: { rate, commentsList },
  computed: {
    userinfo() {
      return this.bookInfo.user_info || {};
    }
  },
  mounted() {
    this.bookId = this.$root.$mp.query.id;
    console.log("bookid:", this.bookId);
    this.getBookDetail();
    // console.log("这句是同步代码，所以this.bookInfo为空：", this.bookInfo);
    this.userinfo = wx.getStorageSync("userinfo") || {};
    //
    this.getCommentList();
  },
  onShow() {
    //要用转发功能，需要手动添加onShow生命周期，调用 wx.showShareMenu({});才会显示转发。
    wx.showShareMenu();
  },
  methods: {
    async getBookDetail() {
      //浏览量+1
      // console.log("in getBookDetail:", config.getBookDetail);
      const bookInfo = await get(config.getBookDetail, { id: this.bookId });
      this.bookInfo = bookInfo;
      console.log("bookInfo:::", bookInfo);
      //setNavigationBarTitle这句还不能单独写在mounted里，还只能写在async回调里。。。。。。
      wx.setNavigationBarTitle({ title: this.bookInfo.title });
    },
    async getCommentList() {
      const commentList = await get(config.getCommentList, {
        bookId: this.bookId
      });
      this.commentList = commentList.list;
      console.log("this.commentList:", this.commentList);
    },
    getPhone(e) {
      console.log("获取手机型号：", e.target);
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync();
        this.phone = phoneInfo.model;
      } else {
        this.phone = "";
      }
    },
    getLocation(e) {
      //1、注册百度地图api，获取api token。
      const baiduApiTK = "ynFMfNnITh3QKZOrS4TZHhkMT53zQk5W";
      // 2、选择全球逆地理编码，查看用法 http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
      let mapUrl = "http://api.map.baidu.com/geocoder/v2/";
      // 3、调用wx.getLocation({}),会提示你在app.json中配置permission授权。
      // 4、配置app.json，加入如下配置：
      //   "permission": {
      //   "scope.userLocation": {
      //     "desc": "你的位置信息将用于小程序位置接口的效果展示"
      //    }
      //   }
      // 5、调用wx.getLocation({})能获得，res.latitude, res.longitude，说明成功！
      // 6、发送get请求，参数参考：http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=35.658651,139.745415&output=json&pois=1&latest_admin=1&ak=您的ak //GET请求  注：老版本行政区划数据已不再维护，为确保您的行政区划数据正确，请务必将latest_admin设置为1
      if (e.target.value) {
        wx.getLocation({
          success: res => {
            wx.request({
              url: mapUrl,
              data: {
                ak: baiduApiTK,
                location: `${res.latitude},${res.longitude}`,
                output: "json",
                latest_admin: 1
              },
              success: res => {
                // console.log("地理位置返回:", res);
                this.location = res.data.result.formatted_address;
              }
            });
          }
        });
      } else {
        this.location = "";
      }
    },
    async addComment() {
      //存入数据库的内容：评论，地理位置，手机型号，图书id，评论人openid
      const data = {
        bookid: this.bookId,
        comment: this.comment,
        phone: this.phone,
        location: this.location,
        openid: this.userinfo.openId
      };
      try {
        await post(config.addComment, data);
        this.comment = "";
        // this.getComments();
      } catch (e) {
        console.log("err:", e);
        showModal("添加评论失败！", "err");
      }
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "src/styles/index.scss";

.bookDetail {
  font-size: $font-size-base;
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
  .detail {
    padding: $base-padding;
    .avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
    }
    &.summary {
      margin-top: 10px;
      p {
        text-indent: 2em;
        font-size: 14px;
      }
    }
  }
}
.otherWrap {
  padding: $base-padding;
  font-size: $font-size-base;
  .section {
    &.location {
      margin-top: 8px;
    }
    margin-bottom: 8px;
  }
  .commentInput {
    width: 100%;
    padding: 5px;
    margin-left: -5px;
    background: $background-main;
  }
}
</style>
