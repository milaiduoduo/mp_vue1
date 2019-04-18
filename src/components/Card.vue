<template>
    <div>
      <div class="book-card clear">
        <a :href="detailUrl">
          <div class="thumb" @click.stop="previewImg(book.image)">
              <img class='img' :src="book.image" :alt="book.alt" mode="aspectFit">
          </div>
          <div class="detail clear">
            <div class="row text-primary" >
                <div class="right">
                    {{book.rate}}<rate :value="book.rate"></rate>
                </div>
                <div>
                    {{book.title}}
                </div>
            </div>
            <div class="row">
                <div class="right text-primary" >
                    浏览量：{{book.count}}
                </div>
                <div>
                    {{book.author}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                    {{book.user_info.nickName}}
                </div>
                <div>
                    {{book.publisher}}
                </div>
            </div>
          </div>
        </a>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Rate from "@/components/Rate";
import config from "@/config.js";
export default {
  props: {
    book: Object,
   
  },
  components: {
    Rate
  },
  computed: {
    detailUrl() {
      return config.pageUrl.bookDetail + "?id=" + this.book.id;
    }
  },
  methods: {
    previewImg(url) {
      wx.previewImage({
        current: "url", // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      });
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "src/styles/variables.scss";
.book-card {
  padding: 5px;
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  .thumb {
    width: 90px;
    height: 90px;
    // border: 1px solid red;
    float: left;
    overflow: hidden;
    // margin-right: 20px;
    .img {
      width: 100%;
      height: 100%;
      //   max-width: 100%;
      //   max-height: 100%;
    }
  }
  .detail {
    .row {
      line-height: 20px;
      margin-bottom: 3px;
    }
  }
}
</style>


