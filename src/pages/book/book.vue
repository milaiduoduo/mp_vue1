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
      pageSize: 10,
      more: true
    };
  },
  methods: {
    async getBookList(getNew = false) {
      // wx.showNavigationBarLoading();
      let books = [];
      // getNew参数是为了区分是从上往下拉还是从底部往上拉。getNew=true 表示从上往下拉。
      // 两者请求数据的方式不一样。
      // 从上往下拉，我们让其每一次都从数据库去获取最新的第一页数据
      // 从底部往上拉，我们是去请求后续页面的数据，对当前页面数据做追加。
      if (getNew) {
        //getNew表示从数据库获取第一组最新数据,从上往下拉，表示获取当前页第一组数据
        books = await get(config.bookList, {
          pageNum: 1,
          pageSize: this.pageSize
        });
      } else {
        //表示从底部往上拉或者更多数据
        // if (this.more) {
        books = await get(config.bookList, {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        });
        // }
      }

      if (books.list.length < this.pageSize) {
        //表示没有更多数据，pageNum不需要再增加
        this.more = false;
      }
      if (getNew) {
        this.bookList = books.list;
      } else {
        // 需要解决的场景，第一次加载完成后，数据库中新增了几条数据，这时再触底加载时，此次加载的数据可能包含了第一组加载的数据
        // 所以后续来的数据需要去重
        this.bookList = [...this.bookList, ...books.list];
      }

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
    this.getBookList(true);
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


