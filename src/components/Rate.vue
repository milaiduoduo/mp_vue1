<template>
<div class="rate">
    <span>☆☆☆☆☆☆☆☆☆☆</span>
    <div class="hello" :style='style'>
        ★★★★★★★★★★
    </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    value: { type: [Number], default: 0 }
  },
  computed: {
    style() {
      return `width:${this.value}em`;
    }
  },
  mounted() {
    console.log("value:", this.value);
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.rate {
  position: relative;
  display: inline-block;
  .hello {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden;
  }
}
</style>
