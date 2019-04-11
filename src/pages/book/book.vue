<template>
    <div>
        <card :book=book v-for='book in bookList' :key=book.id>{{book.title}}</card>
    </div>
</template>

<script>
import { get } from "@/util.js";
import config from "@/config.js";
import Card from "@/components/Card";
export default {
  components: { Card },
  data() {
    return {
      bookList: [],
      pageNum: 1,
      init: true,
      pageSize: 10,
      more: true
    };
  },
  methods: {
    async getBookList() {
      // wx.showNavigationBarLoading();
      const books = await get(config.bookList, {
        pageNum: this.pageNum,
        size: this.pageSize
      });
      if (
        books.list.length < this.pageSize ||
        books.list.length < this.pageSize
      ) {
        //表示没有更多数据，pageNum不需要再增加
        this.more = false;
      }
      this.bookList = [...this.bookList, ...books.list];
      console.log("booklist:", books.list);
      wx.stopPullDownRefresh();
      // wx.hideNavigationBarLoading();
    }
  },
  mounted() {
    //发请求获取图书列表
    this.getBookList();
  },
  onPullDownRefresh() {
    console.log("下拉了！");
    this.getBookList();
  },
  onReachBottom() {
    if (this.more) {
      this.pageNum++;
    }
    this.getBookList();
  }
};
</script>
<style>
</style>


