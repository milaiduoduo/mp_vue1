<template>
    <div> 
        <TopSwiper :tops=topList></TopSwiper>
        <card :book=book v-for='book in bookList' :key=book.id>{{book.title}}</card> 
    </div>
</template>

<script>
import { get } from '@/util.js';
import config from '@/config.js';
import Card from '@/components/Card';
import TopSwiper from '@/components/TopSwiper';
export default {
  components: { Card, TopSwiper },
  data () {
    return {
      bookList: [],
      pageNum: 1,
      pageSize: 10,
      more: true,
      topList: []
    };
  },
  methods: {
    async getTop () {
      const topList = await get(config.getTop, { size: 9 });
      this.topList = topList.list;
      // console.log("this.topList:", this.topList);
    },
    async getBookList (getNew = false) {
      // wx.showNavigationBarLoading();
      let books = [];
      // getNew参数是为了区分是从上往下拉还是从底部往上拉。getNew=true 表示从上往下拉。
      // 两者请求数据的方式不一样。
      // 从上往下拉，我们让其每一次都从数据库去获取最新的第一页数据
      // 从底部往上拉，我们是去请求后续页面的数据，对当前页面数据做追加。
      if (getNew) {
        // getNew表示从数据库获取第一组最新数据,从上往下拉，表示获取当前页第一组数据
        books = await get(config.bookList, {
          pageNum: 1,
          pageSize: this.pageSize
        });
      } else {
        // 表示从底部往上拉获取更多数据，并且永远能发请求，只是需要把获取的数据跟之前的数据做去重比较在显示。
        // 暂时使用if, 去重问题解决后，就关闭if
        if (this.more) {
          books = await get(config.bookList, {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          });
        }
      }

      if (books.list.length < this.pageSize) {
        // 表示没有更多数据，pageNum不需要再增加
        this.more = false;
      } else {
        this.more = true;
      }

      // 构造展示的图书列表
      if (getNew) {
        this.bookList = books.list;
      } else {
        // 需要解决的场景，第一次加载完成后，数据库中新增了几条数据，这时再触底加载时，此次加载的数据可能包含了第一组加载的数据
        // 所以后续来的数据需要去重,不能只是不让其发请求
        // 逻辑应该是，
        // 如果发现新的数据分页完成后不够一页，则显示“没有更多数据”
        // this.bookList = [...new Set([...this.bookList, ...books.list])];
        this.bookList = [...this.bookList, ...books.list];
      }

      // console.log("booklist:", this.bookList);
      wx.stopPullDownRefresh();
      // wx.hideNavigationBarLoading();
    }
  },
  mounted () {
    // 发请求获取图书列表
    this.getTop();
    this.getBookList();
  },
  onPullDownRefresh () {
    // console.log("下拉了！");
    this.getTop();
    this.getBookList(true);
  },
  onReachBottom () {
    if (this.more) {
      this.pageNum++;
    }
    this.getTop();
    this.getBookList();
  }
};
</script>
<style lang="scss">
</style>


