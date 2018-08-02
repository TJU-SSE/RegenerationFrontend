<template>
  <main class="regen-container">
    <br/>
    <NewsSwiper :imgs="swiperNews"></NewsSwiper>
    <waterfall
      :line="waterfallInfo.line"
      :line-gap="waterfallInfo.lineGap"
      :min-line-gap="waterfallInfo.minLineGap"
      :max-line-gap="waterfallInfo.maxLineGap"
      :watch="waterfallInfo.items"
      ref="waterfall"
    >
      <WaterfallSlot
        v-for="(item, index) in waterfallInfo.items"
        :width="item.width"
        :height="item.height"
        :order="index"
        :key="item.index"
      >
        <NewsItem :wrapClass="waterfallInfo.wrapClass"
                  :imgUrl="item.cover_img"
                  :index="item.newsId"
                  :newsId="item.newsId"
                  :title="item.title"
                  :time="item.time"
                  :writer="item.writer"
                  @goToNewsDetail="goToNewsDetail">
        </NewsItem>
      </WaterfallSlot>
    </waterfall>

  </main>

</template>

<script>
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  import NewsItem from './NewsItem.vue'
  import NewsSwiper from './swipers/NewsSwiper.vue'
  import markdownEditor from 'vue-simplemde/markdown-editor.vue'
  import {getAllTags, getAllNews} from '../service/getData'

  export default {
    name: 'news',
    data () {
      return {
        title: 'NEWS',
        tags: [],
        pageOffset: 0,
        tagForm: {
          title: ''
        },
        form: {
          title: '',
          writer: '',
          time: '',
          tags: '',
          img: '',
          content: ''
        },
        NewsData: [],
        swiperNews: [],
        NewsImg: [],
        waterfallInfo: {
          minLineGap: 100,
          maxLineGap: 600,
          lineGap: 380,
          line: 'v',
          items: [],
          wrapClass: 'wf-item',
          newId: 0
        }
      }
    },
    components: {
      Waterfall,
      WaterfallSlot,
      NewsItem,
      NewsSwiper,
      markdownEditor
    },
    methods: {
      goToNewsDetail (newsId) {
        this.$router.push({name: 'newsDetail', params: {newsId: newsId}})
      },
      addItems: function (NewsData) {
        let curData = NewsData
        let curHeight = 300
        let context = this
        for (let i = 0; i <= curData.length; i++) {
          let image = new Image()
          let curItem = curData[i]
          image.onload = function () {
            let remainHeight = Math.ceil(curItem.title.length / 20) * 28 + Math.ceil(curItem.time.length / 30) * 18 + 26
            curItem.width = image.width / image.height * curHeight
            curItem.height = curHeight + remainHeight
            context.waterfallInfo.items.push(curItem)
            console.log(curItem.title, curItem.height)
          }
          image.src = curItem.cover_img
        }
      },
      addNews () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop + window.innerHeight >= document.body.clientHeight) {
          this.pageOffset += 1
          getAllNews(this.pageOffset, 10).then(res => {
            console.log(res)
            this.NewsData = res.msg.newses
            this.addItems(this.NewsData)
          }).catch(err => {
            console.log(err)
          })
        }
      },
      async initData () {
        getAllTags().then(res => {
          console.log(res)
          this.tags = res.msg
        }).catch(err => {
          console.log(err)
        })
        getAllNews(this.pageOffset, 10).then(res => {
          console.log(res)
          this.NewsData = res.msg.newses
          this.swiperNews = this.NewsData.slice(0, 5)
          this.addItems(this.NewsData)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted () {
      document.title = this.title
      console.log('index', this.$route.name)
      this.initData()

      window.addEventListener('scroll', this.addNews)
    }
  }

</script>

<style scoped>
  .img-box {
    margin: 8px;
    padding: 2px;
    border: 1px solid RGBA(34, 194, 221, 1.00);
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    text-align: left;
  }

  .img-box > img {
    max-height: 140px;
  }

  .img-box > p {
    margin-top: 10px;
    margin-left: 20px;
    font-size: 1.1em;
  }

  .regen-container {
    font-family: Tw, CH
  }
</style>
