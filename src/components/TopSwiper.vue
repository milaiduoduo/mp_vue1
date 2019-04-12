<template>
    <swiper
    :indicator-dots='true'
    indicator-color='#EA5A49'
    :autoplay='true'
    :interval='6000'
    :duration='1000'
    :circular='true'
    >
    <div v-for='(top,index) in tops' :key='index'>
        <swiper-item>
            <img :src="top.image" :alt="top.title" mode="aspectFit">
        </swiper-item>
    </div>
    </swiper>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["tops"]
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
