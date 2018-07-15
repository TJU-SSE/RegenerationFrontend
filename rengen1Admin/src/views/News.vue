<template>
  <main class="regen-container">
    <br>
    <el-button type="default" icon="plus" @click="addNewsDialog = true">添加新闻</el-button>
    <br><br>
    <NewsSwiper :imgs="swiperNews.slice(0, 5)"></NewsSwiper>
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

    <el-dialog
      title="添加新闻"
      :visible.sync="addNewsDialog"
      size="full">
      <el-form :modal="form" label-width="50px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="form.time"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.writer"></el-input>
        </el-form-item>
        <el-form-item label="标签选择">
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="tag.title" v-for="tag in tags"></el-checkbox>
          </el-checkbox-group>
          <el-button type="success" size="mini" icon="plus" @click="addTagDialog = true"></el-button>
        </el-form-item>
        <el-form-item label="封面">
          <input type="file" id="newsCoverUploader" style="display: none;">
          <el-button type="primary" icon="upload" @click="startUploadCover">点击上传</el-button>
          <el-progress :text-inside="true" :stroke-width="14" :percentage=newsCoverProcess status="success" style="margin-top: 10px; width: 110px"></el-progress>
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
      <markdownEditor ref="markdown" v-model="form.content"></markdownEditor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addNewsDialog = false">取 消</el-button>
        <el-button @click="addNewsDialog = false; confirmCreateNews();" type="danger">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="新建标签"
      :visible.sync="addTagDialog"
      size="small">
      <el-form :model="tagForm" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="tagForm.title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTagDialog = false">取 消</el-button>
        <el-button @click="addTagDialog = false; confirmCreateTag();" type="danger">确 认</el-button>
      </span>
    </el-dialog>

  </main>

</template>

<script>
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  import NewsItem from './NewsItem.vue'
  import NewsSwiper from './swipers/NewsSwiper.vue'
  import markdownEditor from 'vue-simplemde/markdown-editor.vue'
  import {getAllTags, tagCreate, newsCreate, updateNews, getAllNews, uploadImg} from '../service/getData'
  import $ from 'jquery'

  export default {
    name: 'news',
    data () {
      return {
        title: 'NEWS',
        addNewsDialog: false,
        addTagDialog: false,
        newsCoverProcess: 0,
        tags: [],
        checkList: [],
        swiperNews: [],
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
      confirmCreateTag () {
        if (this.tagForm.title === '') {
          this.$message({
            message: '请输入标签名称',
            type: 'warning'
          })
          return
        }
        tagCreate(this.tagForm).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.tagForm.title = ''
            this.initData()
          } else {
            this.$message({
              message: '网络原因，创建失败',
              type: 'error'
            })
          }
        }).catch(err => {
          this.$message({
            message: '网络原因，创建失败',
            type: 'error'
          })
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
      startUploadCover () {
        $('#newsCoverUploader').click()
        $('#newsCoverUploader').change(() => {
          this.newsCoverProcess = 100
          this.form.img = $('#newsCoverUploader')[0].files[0]
        })
      },
      confirmCreateNews () {
        /* eslint-disable */
        newsCreate({"title": this.form.title, "time": this.form.time, "content": this.form.content, "writer": this.form.writer,
          "img": this.form.img, "tags": []}).then(res => {
            if (res.code === '0') {
              this.$message({
                message: '创建成功',
                type: 'success'
              })
              this.checkList.forEach(item => {
                updateNews({"title": this.form.title, "time": this.form.time, "content": this.form.content, "writer": this.form.writer,
                  "img": this.form.img, "tags": item, "id": res.msg.id}).then(res => {}).catch(err => console.log(err))
              })
            } else {
              this.$message({
                message: '网络原因，创建失败',
                type: 'error'
              })
            }
        }).catch(err => {
          console.log(err)
        })
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
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
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
</style>
