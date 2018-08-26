<template>

  <div :class="wrapClass">
    <img class="wf-img" :src="imgUrl" :index="index" @click="goToNewsDetail($event,newsId)">
    <p class="wf-title" @click="goToNewsDetail($event,newsId)">{{title}}</p>
    <span class="wf-time">{{time}}</span>
    <p class="wf-writer">{{writer}}</p>
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
    }
  }
</script>

<style scoped>

.wf-title {
  font-size: 14pt;
}

.wf-time {
  font-size: 10pt;
}

.wf-writer {
  font-size: 10pt;
}

</style>
