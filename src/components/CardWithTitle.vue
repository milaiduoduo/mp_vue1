<template>
    <div class="base_padding group">
        <div class="groupTitle text-primary" >
            {{titleName}}
        </div>
        <m_card :book=book v-for='book in bookList' :key=book.id>{{book.title}}</m_card> 
    </div>
</template>

<script type="text/ecmascript-6">
import m_card from "@/components/Card.vue";
export default {
  components: {
    m_card
  },
  props: {
    bookList: [],
    titleName: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "src/styles/index.scss";
</style>
