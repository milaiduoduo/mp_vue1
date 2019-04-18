<template>
    <div>
        <m_comments-list :commentsList=commentList titleName='我的评论' v-if="commentList.length"></m_comments-list>
        <div class="notice" v-else>你还没有评论哟~</div>
        <m_card :bookList=bookList titleName='我添加的图书' v-if="bookList.length"></m_card> 
        <div class="notice" v-else>你还没有添加图书哟~</div>
    </div>
</template>

<script>
import { get } from "@/util.js";
import config from "@/config.js";
import m_commentsList from "@/components/CommentsList";
import m_card from "@/components/CardWithTitle";
export default {
  data() {
    return {
      commentList: [],
      bookList: [],
      userinfo: {}
    };
  },
  components: {
    m_commentsList,
    m_card
  },
  onShow() {
    let userinfo = wx.getStorageSync("userinfo");
    if (userinfo && Object.keys(userinfo).length > 0) {
      this.userinfo = userinfo;
      this.init();
    }
  },
  methods: {
    init() {
      this.getCommentList();
      this.getBookList();
    },
    async getCommentList() {
      const list = await get(config.getCommentList, {
        openid: this.userinfo.openId
      });
      this.commentList = list.list;
      console.log("this.commentList:", this.commentList);
    },
    async getBookList() {
      const list = await get(config.bookList, {
        openid: this.userinfo.openId
      });
      this.bookList = list.list;
      console.log("this.bookList:", this.bookList);
    }
  }
};
</script>
<style>
</style>


1