<template>
  <article class="container news-article" v-if="show" style="font-family: 'Lantinghei SC'">
    <div class="news-main">
      <h1 class="news-title" style="font-size: 40px; font-family: 'Bernard', CH">{{news.title}}</h1>
      <div class="news-info">
        <a class="regen-tag" v-for="tag in news.tag" style="font-family: 'Helvetica Neue', CH">{{tag.tagTitle}}</a>
        <span class="news-time">{{news.time}}</span>
        <span class="news-author-wrap">
      作者：
      <a class="news-author">{{news.writer}}</a>
    </span>
      </div>

      <div>
        <img style="max-width: 80%" :src="news.img_url">
        <!--<p  class="imgDesc">点击：{{news.viewcount}}</p>-->
      </div>

      <main class="news-content">
        <vue-markdown class="markdown" v-if="news.content !== ''">{{news.content}}</vue-markdown>
      </main>
    </div>

    <div class="arrow-bar">
      <span>MORE NEWS</span>
      <div class="arrow"></div>
    </div>

    <div class="news-wrap">
      <NewsItem v-for="curNews,index in moreNews"
                :wrapClass="wrapClass"
                :imgUrl="curNews.cover_img"
                :newsId="curNews.newsId"
                :key="index"
                :tags="curNews.tag"
                :title="curNews.title"
                :time="curNews.time"
                :desc="curNews.writer"
                @goToNewsDetail="goToNewsDetail">
      </NewsItem>
    </div>
  </article>
</template>

<script>
  import VueMarkdown from '../../node_modules/vue-markdown'
  import NewsItem from './NewsItem.vue'
  import {getNewsById, getAllTags, getNewsByTag} from '../service/getData'
  import markdownEditor from 'vue-simplemde/markdown-editor.vue'
  require('../../node_modules/github-markdown-css/github-markdown.css')

  export default {
    name: 'index',
    components: {
      NewsItem,
      VueMarkdown,
      markdownEditor
    },
    data () {
      return {
        newsId: this.$route.params.newsId,
        show: true,
        wrapClass: 'news-item',
        moreNews: [],
        checkList: [],
        tags: [],
        NewsImg: [],
        news: {
          content: '',
          id: '',
          img_url: '',
          tag: [],
          time: '',
          title: '',
          writer: ''
        }
      }
    },
    watches: {

    },
    methods: {
      goToNewsDetail (newsId) {
        this.$router.push({name: 'newsDetail', params: {newsId: newsId}})
        this.newsId = newsId
        this.show = false
        /*eslint-disable*/
        this.initData(newsId)
        setTimeout(() => this.show = true, 1000)
      },
      toNews () {
        this.$router.push({name: 'news'})
      },
      async initData (id) {
        await getAllTags().then(res => {
          console.log(res)
          this.tags = res.msg
        }).catch(err => {
          console.log(err)
        })
        await getNewsById(id).then(res => {
          console.log(res)
          this.news = res.msg
          this.news.tag.forEach(item => {
            this.checkList.push(item.tagTitle)
          })
        }).catch(err => {
          console.log(err)
        })
        await getNewsByTag(this.news.tag[0].tagId).then(res => {
          console.log(res)
          this.moreNews = res.msg
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted () {
      document.title = this.news.title
      console.log('newsId', this.newsId)
      this.initData(this.newsId)
    }
  }
</script>

<style scoped>

  @font-face {
    font-family: 'qingkebenyue';
    src:url(../assets/fonts/FZQKBYSJW.ttf);
  }

  .markdown {
    font-family: bernard, CH
  }

  .news-article{
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .news-main{
    text-align: center;
  }
  .news-article .news-title{
    font-weight: bold;
    margin-bottom: 6px;
  }
  .news-article .news-desc{
    font-size: 1.4em;
    line-height: 1.1em;
    font-weight: normal;
  }
  .news-article .news-info{
    margin: 20px 0;
    font-family: Tw, CH;
    font-size: 14px;
    letter-spacing: 1.5px;
  }
  .news-article .news-time{
    font-size: .8em;
    font-weight: normal;
  }
  .news-article .news-author-wrap, .news-article .news-time{
    margin: 0 2%;
    font-family: bernard, CH
  }
  .news-article .news-author{
    text-decoration: none;
    cursor: pointer;
    color: #222222;
    font-weight: bold;
  }
  .news-article .news-author:hover{
    color: #6c7a89;
  }

  .news-article .imgDesc{
    font-size: .85em;
    font-weight: bold;
    margin: 10px 0;
  }

  .news-article .news-content{
    font-size: 18px;
    text-align: left;
    margin: 10px 10%;
    font-family: Tw, CH;
    letter-spacing: 1.2px;
    /*margin-right: 30%;*/
  }

  .news-wrap{
    display: flex;
    justify-content: space-between;
    font-family: Bernard, CH;
    letter-spacing: 1px;
    font-size: 15px;
  }
  .news-item{
    margin-right: 5%;
  }

  .news-item:last-child{
    margin-right: 0;
  }

  .arrow-bar{
    text-align: center;
    border-bottom: 2px solid #222222;
    border-top: 2px solid #222222;
    margin-bottom: 20px;
    margin-top: 20px;
    font-family: Bernard, CH;
    letter-spacing: 2px;
  }
  .arrow{
    bottom: 4px;
    border: 0 transparent;
    position: relative;
    background: #fff;
    height: 0;
    top: 0;
    display: block;
    width: 100%;
  }
  .arrow:after, .arrow:before{
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .arrow:after{
    border-color: rgba(255,255,255,0);
    border-top-color: #fff;
    border-width: 10px;
    margin-left: -10px;
  }
  .arrow:before{
    border-color: transparent;
    border-top-color: #000;
    border-width: 11px;
    margin-left: -11px;
  }

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

  /* For iphone5 */
  @media (min-device-width: 320px) and (max-device-width: 568px){
    .news-time, .news-author, .regen-tag {
      font-size: 1.3em !important;
    }
  }

  /* For ipad pro */
  @media (min-device-width: 568px) and (max-device-width: 1100px) {
    .news-time, .news-author, .regen-tag {
      font-size: 1.3em !important;
    }
  }
</style>
