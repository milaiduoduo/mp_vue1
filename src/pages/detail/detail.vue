<template>
<div>
    图书id:{{id}}
</div>
</template>

<script type="text/ecmascript-6">
import { get } from "@/util";
import config from "@/config";
export default {
  data() {
    return {
      id: ""
    };
  },
  mounted() {
    this.id = this.$root.$mp.query.id;
    this.getBookDetail();
  },
  methods: {
    async getBookDetail() {
      //浏览量+1
      console.log("in getBookDetail:", config.getBookDetail);
      await get(config.getBookDetail, { id: this.id });
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
