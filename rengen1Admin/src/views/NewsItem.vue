<template>

  <div :class="wrapClass">
    <img class="wf-img" :src="imgUrl" :index="index" @click="goToNewsDetail($event,newsId)">
    <p class="wf-title" @click="goToNewsDetail($event,newsId)">{{title}}</p>
    <span class="wf-time">{{time}}</span>
    <p class="wf-desc">{{writer}}</p>
  </div>

</template>

<script>
  export default {
    name: 'news',
    data () {
      return {}
    },
    props: {
      wrapClass: {
        default: ''
      },
      imgUrl: {
        default: 'imgUrl'
      },
      index: {
        default: 0
      },
      newsId: {
        default: 0
      },
      title: {
        default: 'title'
      },
      time: {
        default: 'time'
      },
      writer: {
        default: 'writer'
      }
    },
    methods: {
      goToNewsDetail: function (event, newsId) {
        this.$emit('goToNewsDetail', newsId)
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>

</style>
