<template>
    <div class="book-card">
        <div class="thumb">
            <img class='img' :src="book.image" :alt="book.alt" mode="aspectFit">
        </div>
        <div class="detail">
            <div class="row">
                <div class="right">
                    {{book.rate}}
                </div>
                <div class="left">
                    {{book.title}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                    浏览量
                </div>
                <div class="left">
                    {{book.author}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                    添加人
                </div>
                <div class="left">
                    {{book.publisher}}
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["book"]
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
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
    .right {
      float: right;
    }
    .left {
      margin-right: 80px;
    }
  }
}
</style>


