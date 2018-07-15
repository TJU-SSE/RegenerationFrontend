<template>
  <div>
    <ThumbSwiper></ThumbSwiper>
    <br>
    <NormalSwiper></NormalSwiper>
    <br>
    <AutoSwiper></AutoSwiper>
  </div>
</template>

<script>
  import ThumbSwiper from './swipers/ThumbSwiper.vue'
  import NormalSwiper from './swipers/NormalSwiper.vue'
  import AutoSwiper from './swipers/AutoSwiper.vue'

  export default {
    data () {
      return {

      }
    },
    components: {
      ThumbSwiper,
      NormalSwiper,
      AutoSwiper
    }
  }
</script>

<style scoped>

</style>
