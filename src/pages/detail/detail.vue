<template>
<div>
    图书id:{{id}}
</div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      id:''
    };
  },
  mounted() {
    this.id = this.$root.$mp.query.id;
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
