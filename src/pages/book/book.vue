<template>
    <div>
        <div v-for='book in bookList' :key=book.id>{{book.title}}</div>
    </div>
</template>

<script>
import { get } from "@/util.js";
import config from "@/config.js";
export default {
  data() {
    return {
      bookList: []
    };
  },
  methods: {
    async getBookList() {
      const books = await get(config.bookList);
      console.log("booklist:", books.list);
      this.bookList = books.list;
    }
  },
  mounted() {
    //发请求获取图书列表
    this.getBookList();
  }
};
</script>
<style>
</style>


