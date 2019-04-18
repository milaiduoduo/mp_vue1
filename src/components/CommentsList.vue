<template>
    <div class="commentListWrap base_padding group">
        <div class="groupTitle text-primary" >
            {{titleName}}
        </div>
        <div class="comment" 
        v-for="(comment,index) in commentsList"
        :key="index"
        @click='handleClick(comment)'>
            <div class="section inline">
                    <img :src="comment.user_info.image" class="m_avatar" :alt="comment.user_info.title">
                    {{comment.user_info.title}}
            </div>
            <div class="section location">
                来至：{{comment.location || '未知地点'}}  
            </div>
            <div class="section phone">
                设备：{{comment.phone || '未知型号'}}
            </div>
            <div class="section content">{{comment.comment}}</div>
        </div>
        
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["commentsList", "titleName"],
  methods: {
    handleClick(comment) {}
  },
  mounted() {
    // console.log("子组件props commentsList：", this.commentsList);
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "src/styles/index.scss";
.commentListWrap {
  font-size: 14px;
  .comment {
    border-bottom: 1px solid $background-main;
    .location,
    .phone {
      padding-left: 5px;
      font-size: $font-size-small;
    }
  }
  .content {
    padding: 8px 4px;
    background: $background-light;
    border-radius: 2px;
  }
}
</style>
