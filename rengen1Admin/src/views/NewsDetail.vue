<template>
  <article class="container news-article" v-if="show">
    <el-button-group>
      <el-button type="success" icon="arrow-left" @click="toNews"></el-button>
      <el-button type="warning" icon="edit" @click="editNewsDialog = true">基本信息</el-button>
      <el-button type="primary" icon="upload" @click="editNewsCoverDialog = true">封面</el-button>
      <el-button type="danger" icon="delete" @click="deleteNewsDialog = true">删除</el-button>
    </el-button-group>

    <div class="news-main">
      <h1 class="news-title" style="font-family: 'qingkebenyue'">{{news.title}}</h1>
      <div class="news-info">
        <a class="regen-tag" v-for="tag in news.tag" style="font-family: 'Helvetica Neue'">{{tag.tagTitle}}</a>
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

    <el-dialog
      title="删除新闻"
      :visible.sync="deleteNewsDialog"
      size="small">
      <span>确认删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteNewsDialog = false">取 消</el-button>
        <el-button @click="deleteNewsDialog = false; confirmDeleteNews();" type="danger">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改封面"
      :visible.sync="editNewsCoverDialog"
      size="small">
      <input type="file" id="cover" style="display: none">
      <el-button type="primary" icon="upload" @click="startUpload">上传</el-button>
      <el-progress :text-inside="true" :stroke-width="14" :percentage=newsCoverProcess status="success" style="margin-top: 10px; width: 110px"></el-progress>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editNewsCoverDialog = false">取 消</el-button>
        <el-button @click="editNewsCoverDialog = false; confirmUploadNewsCover();" type="danger">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改新闻"
      :visible.sync="editNewsDialog"
      size="full">
      <el-form :modal="news" label-width="50px">
        <el-form-item label="标题">
          <el-input v-model="news.title"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="news.time"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="news.writer"></el-input>
        </el-form-item>
        <el-form-item label="标签选择">
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="tag.title" v-for="tag in tags"></el-checkbox>
          </el-checkbox-group>
          <!--<el-button type="success" size="mini" icon="plus" @click="addTagDialog = true"></el-button>-->
        </el-form-item>
        <el-form-item label="新闻图片">
          <input type="file" id="newsPicUploader" style="display: none">
          <el-button type="primary" icon="upload" @click="startUploadNewsPic">点击上传</el-button>
          <div class="img-box" v-for="img in NewsImg">
            <img :src="img" alt="">
            <p>![]({{img}})</p>
          </div>
        </el-form-item>
      </el-form>
      <markdownEditor ref="markdown" v-model="news.content"></markdownEditor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editNewsDialog = false">取 消</el-button>
        <el-button @click="editNewsDialog = false; confirmEditNews();" type="danger">确 认</el-button>
      </span>
    </el-dialog>

  </article>
</template>

<script>
  import VueMarkdown from '../../node_modules/vue-markdown'
  import NewsItem from './NewsItem.vue'
  import {getNewsById, newsDelete, updateNewsCover, getAllTags, updateNews, getNewsByTag, uploadImg} from '../service/getData'
  import markdownEditor from 'vue-simplemde/markdown-editor.vue'
  import $ from 'jquery'
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
        editNewsDialog: false,
        editNewsCoverDialog: false,
        deleteNewsDialog: false,
        newsCoverProcess: 0,
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
      confirmDeleteNews () {
        newsDelete({id: this.newsId}).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.$router.push({name: 'news'})
          } else {
            this.$message({
              message: '网络原因，删除失败',
              type: 'error'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      startUploadNewsPic () {
        $('#newsPicUploader').click()
        $('#newsPicUploader').change(() => {
          uploadImg({'img': $('#newsPicUploader')[0].files[0]}).then(res => {
            if (res.code === '0') {
              this.NewsImg.push(res.msg.url)
              $('#newsPicUploader').after($('#newsPicUploader').clone().val(''))
              $('#newsPicUploader').remove()
            }
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '网络原因，上传失败',
              type: 'error'
            })
          })
        })
      },
      startUpload () {
        $('#cover').click()
        $('#cover').change(() => {
          this.newsCoverProcess = 100
        })
      },
      confirmUploadNewsCover () {
        updateNewsCover({id: this.newsId, img: $('#cover')[0].files[0]}).then(res => {
          if (res.code === '0') {
            this.initData(this.newsId)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      confirmEditNews () {
        /* eslint-disable */
        for (let i = 0; i < this.checkList.length; i++) {
          updateNews({"title": this.news.title, "time": this.news.time, "content": this.news.content, "writer": this.news.writer,
            "tags": this.checkList[i], "id": this.newsId}).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        }
        updateNews({"title": this.news.title, "time": this.news.time, "content": this.news.content, "writer": this.news.writer, "id": this.newsId}).then(res => {
          this.$message({
            message: '修改成功,请刷新页面',
            type: 'success'
          })
        }).catch(err => {
          console.log(err)
        })

        this.initData(this.newsId)
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
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
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
  }
  .news-article .news-time{
    font-size: .8em;
    font-weight: normal;
  }
  .news-article .news-author-wrap, .news-article .news-time{
    margin: 0 2%;
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
    font-size: 1.2em;
    text-align: left;
    margin: 10px 10%;
    /*margin-right: 30%;*/
  }

  .news-wrap{
    display: flex;
    justify-content: space-between;
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
