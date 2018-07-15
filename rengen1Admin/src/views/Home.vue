<template>
  <div>
    <AutoSwiper :imgs="news.slice(0, 4)"></AutoSwiper>
    <div class="magazine">
      <div class="sub-header mag-bg">
        <img src="../../static/img/RUNWAY-01.png"/>
        <h3>{{config.home.runway}}<el-button type="primary" @click="editSubTitle = true">修改</el-button></h3>
      </div>
      <div class="center">
        <div class="mag-photo">
          <div v-for="img in shows.slice(0, 5)" :key="img.id">
            <img :src="img.img_url" alt="magzine" @click="toShow(img.id)">
          </div>
        </div>
      </div>
    </div>
    <div class="runway">
      <div class="sub-header run-bg">
        <img src="../../static/img/designer.png"/>
        <h3>{{config.home.designer}}<el-button type="primary" @click="editSubTitle = true">修改</el-button></h3>
      </div>
      <div class="center">
        <div class="run-photo">
          <div v-for="img in designerImgs" :key="img.id">
            <img :src="img.img_url" alt="runway" @click="turnToDesigner(img.id)" style="margin-top: 20px">
          </div>
        </div>
      </div>
    </div>
    <div class="news">
      <!--<div class="bg"></div>-->

      <div class="sub-header" style="position: relative; left: -50px;">
        <img src="../../static/img/news.png" style="width: 120px"/>
        <h3>{{config.home.news}}<el-button type="primary" @click="editSubTitle = true">修改</el-button></h3>
      </div>

      <div class="news-photo">
        <div class="news-first" >
          <div v-for="item in news.slice(0, 3)" :key="item.newsId">
            <div>
              <div>
                <p>{{item.time}}</p>
                <!--<p>{{item.writer}}</p>-->
                <ul>
                  <li v-for="tag in item.tag" :key="tag.id">{{tag.tagTitle}}</li>
                </ul>
              </div>
            </div>
            <img style="margin-left: 40px;" :src="item.cover_img" alt="news" @click="toNews(item.newsId)">
            <h4 style="margin-left: 15px;">{{item.title}}</h4>
          </div>
        </div>
        <div class="news-second">
          <img :src="config.home.img" class="add-img" @click="toRegen">
          <el-button type="primary" style="z-index: 1000; width: 100px" @click="editRightBottomImg = true">修改</el-button>
        </div>
      </div>
    </div>
    <Footer></Footer>

    <el-dialog
      title="更换小标题"
      :visible.sync="editSubTitle"
      size="small"
      v-if="config !== {}">
      <el-form ref="form" :model="config.home" label-width="120px">
        <el-form-item label="RUNWAY小标题">
          <el-input v-model="config.home.runway"></el-input>
        </el-form-item>
        <el-form-item label="DESIGNER小标题">
          <el-input v-model="config.home.designer"></el-input>
        </el-form-item>
        <el-form-item label="NEWS小标题">
          <el-input v-model="config.home.news"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSubTitle = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改右下角图片"
      :visible.sync="editRightBottomImg"
      size="small"
      v-if="config !== {}">
      <el-form ref="form" :model="config.home" label-width="120px">
        <el-form-item label="右下图片上传, 选完图片之后稍等片刻等右侧图片刷新之后再点确认">
          <input type="file" style="display: none" id="imgUploader">
          <el-button type="primary" icon="upload" @click="uploadPic">点击上传</el-button>
          <img :src="config.home.img" alt="" style="height: 200px">
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelUpload">取 消</el-button>
        <el-button type="primary" @click="saveUpload">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
  import $ from 'jquery'
  import AutoSwiper from './swipers/AutoSwiper.vue'
  import {getAllDesigners, getAllNews, getAllShows, getAllJsons, setJson, uploadImg} from '../service/getData'

  // TODO: 把东西读取完成

  export default {
    name: 'Home',
    data () {
      return {
        title: 'RENGENATION',
        shows: [],
        config: {
          home: {
            runway: '',
            designer: '',
            news: ''
          }
        },
        editSubTitle: false,
        editRightBottomImg: false,
        designerImgs: [
          {
            url: '../static/img/img2.jpg',
            id: 1
          },
          {
            url: '../static/img/img6.jpg',
            id: 2
          },
          {
            url: '../static/img/img7.jpg',
            id: 3
          },
          {
            url: '../static/img/img8.jpg',
            id: 4
          }
        ],
        news: [],
        imgUpload: null,
        startSearch: false,
        searchValue: ''
      }
    },
    methods: {
      uploadPic () {
        $('#imgUploader').click()
        $('#imgUploader').change(() => {
          this.imgUpload = $('#imgUploader')[0].files[0]
          uploadImg({'img': this.imgUpload}).then(res => {
            if (res.code === '0') {
              this.config.home.img = res.msg.url
              $('#imgUploader').after($('#imgUploader').clone().val(''))
              $('#imgUploader').remove()
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
      cancelUpload () {
        $('#imgUploader').after($('#imgUploader').clone().val(''))
        $('#imgUploader').remove()
        this.editRightBottomImg = false
      },
      saveUpload () {
        this.editRightBottomImg = false
        setJson({
          content: JSON.stringify(this.config)
        }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '网络原因，修改失败',
            type: 'error'
          })
        })
      },
      formatDate (time) {
        let res = ''
        let date = new Date(time)
        res = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return res
      },
      toRegen () {
        window.location.href = 'http://regen.org.cn/'
      },
      toShow (id) {
        this.$router.push({name: 'show', params: {showId: id}})
      },
      toNews (id) {
        this.$router.push({name: 'newsDetail', params: {newsId: id}})
      },
      test () {
        console.log('test')
      },
      start (e) {
        this.startSearch = !this.startSearch
      },
      submit (e) {
        console.log(this.searchValue)
        this.startSearch = false
        this.searchValue = ''
      },
      turnToDesigner (id) {
        this.$router.push({name: 'designerPro', params: { designerId: id }})
      },
      saveEdit () {
        this.editSubTitle = false
        setJson({content: JSON.stringify(this.config)}).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '网络原因，修改失败',
              type: 'error'
            })
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '网络原因，修改失败',
            type: 'error'
          })
        })
      },
      async initData () {
        getAllDesigners(0, 5).then(res => {
          if (res.code === '0') {
            this.designerImgs = res.msg.designers
          }
        }).catch(err => {
          console.log(err)
        })

        getAllNews(0, 9).then(res => {
          console.log(res)
          this.news = res.msg.newses
//          let today = new Date()
          this.news.forEach(n => {
//            let d = new Date(n.time)
//            console.log(n.time)
//            console.log((today.getTime() - d.getTime()) / 1000 / 60 / 60 / 24)
//            if ((today.getTime() - d.getTime()) / 1000 / 60 / 60 / 24 <= 1) {
//              n.time = 'today'
//            } else if ((today.getTime() - d.getTime()) / 1000 / 60 / 60 / 24 > 1 && (today.getTime() - d.getTime()) / 1000 / 60 / 60 / 24 <= 2) {
//              n.time = 'yesterday'
//            } else {
//              n.time = '2 days ago'
//            }
            n.time = this.formatDate(n.time)
          })
        }).catch(err => {
          console.log(err)
        })

        getAllShows(0, 10).then(res => {
          console.log(res)
          this.shows = res.msg.shows
        }).catch(err => {
          console.log(err)
        })

//        setJson({
//          content: JSON.stringify({
//            home: {
//              runway: '',
//              designer: '',
//              news: '',
//              img: ''
//            },
//            runway: {
//              title: ''
//            }
//          })
//        }).then(res => {
//          console.log(res)
//        }).catch(err => {
//          console.log(err)
//        })

        getAllJsons().then(res => {
          if (res.code === '0') {
            this.config = JSON.parse(res.msg.extraTitle)
            console.log('config', this.config)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    components: {
      AutoSwiper
    },
    mounted () {
      console.log('ready')
      document.title = this.title
      this.initData()
    }
  }
</script>

<style scoped>
  /* header */
  .header {
    height: 300px;
    background: linear-gradient(70deg, white, #433B38 80%, #1E0A02);
  }

  .social-icon > img {
    padding: 10px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .big-title {
    width: 60%;
    margin: 0 auto;
  }

  .big-title > span {
    padding: 10px;
    color: #E43F37;
    font-size: 8.5em;
    text-shadow: black -5px 5px 5px;
  }

  .navigation {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    width: 40%;
    margin: 0 auto;
  }

  .navigation > a {
    text-decoration: none;
    font-size: 1.5em;
    color: white;
    padding: 5px;
    margin: 0 auto;
  }

  .navigation > div {
    position: absolute;
    right: 4%;
    font-size: 1em;
    color: white;
  }

  .search > img {
    position: relative;
    width: 30px;
    height: 30px;
    transition: 1s;
    -webkit-transition: 1s;
    -moz-transition: 1s;
    -o-transition: 1s;
    cursor: pointer;
  }

  .search > input {
    display: none;
    position: absolute;
    top: 40px;
    left: 10px;
    width: 80px;
    border-width: 0 0 2px;
    background: none;
    transition: 1s;
  }

  .img-active {
    transform: translateX(-20px);
    -webkit-transform: translateX(-20px);
    -moz-transform: translateX(-20px);
    -o-transform: translateX(-20px);
  }

  .input-active {
    display: block !important;
  }

  /* magazine */
  .sub-header {
    height: 430px;
    /*background-color: white;*/
    text-align: center;
  }

  .sub-header > img {
    width: 200px;
    height: 60px;
    margin: 20px;
  }

  .sub-header > h3 {
    position: relative;
    top: -44px;
    font-size: 2.5em;
  }

  .center {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    margin-top: -240px;
  }

  .mag-photo {
    /*width: 100%;*/
    position: relative;
    top: -80px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
  }

  .mag-bg {
    background: linear-gradient(70deg, white 72%, rgb(67, 59, 56));
  }

  .mag-photo > div {
    /*margin: 0 5px*/
  }

  .mag-photo > div > img {
    max-width: 100%;
    margin: 0 20px;
    cursor: pointer;
  }

  /* runway */
  .run-photo {
    /*width: 100%;*/
    position: relative;
    top: -80px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }

  .run-bg {
    background: linear-gradient(70deg, white 71%, rgb(120, 114, 112));
  }

  .run-photo > div {
    /*margin: 0 5px;*/
  }

  .run-photo > div > img {
    max-width: 100%;
    margin: 0 20px;
    cursor: pointer;
  }

  /* news */
  .news {
    margin: 10px;
    width: 99%;
  }

  .news-photo {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    font-family: "DIN Condensed Bold";
  }

  .news-first {
    position: relative;
    width: 60%;
    top: -80px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    padding: 10px;
  }

  .news-first li {
    color: RGBA(34, 194, 221, 1.00);
    margin: 2px;
  }

  .news-first > div {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    padding-top: 20px;
  }

  .news-first > div > div:nth-child(1) {
    text-align: center;
    width: 80px;
  }

  .news-first > div > img {
    width: 250px;
    cursor: pointer;
    /*height: auto;*/
  }

  .news-first > div > div:nth-child(3) {
    width: 25%;
    text-align: left;
    padding-left: 10px;
  }

  .news-second {
    position: relative;
    width: 45%;
    top: -210px;
    left: 80px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 1600px;
  }

  .news-second > img {
    width: 45%;
    height: auto;
    padding: 10px;
    cursor: pointer;
  }

  .weibo-follow {
    position: absolute;
    top: 15%;
    left: 25%;
  }

  .weibo-follow > img {
    opacity: 0.7;
    cursor: pointer;
  }

  .weibo-follow > div {
    background-color: white;
    text-align: center;
    font-size: 1.5em;
    padding:20px;
  }


  .add-img {
    position: absolute;
    width: 400px !important;
  }

  .panel {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 10px auto;
    overflow-y: scroll;
  }

  .panel > div {
    margin: 5px;
  }

  .panel > div img {
    height: 150px;
    cursor: pointer;
    transition: .5s;
  }

  .panel > div img:hover {
    transform: scale(1.1, 1.1);
  }

  .magazine {
    height: 540px;
  }

  .runway {
    height: 490px;
  }

  .bg {
    height: 800px;
    position: absolute;
    right: 0;
    width: 1500px;
    background: linear-gradient(70deg, white 85%, rgb(175, 175, 175));
  }

  /* adapt small screen */
  @media screen and (max-width: 1200px){
    .big-title > span {
      padding: 5px;
      font-size: 6.5em;
    }

    .navigation {
      width: 50%;
    }

    .navigation > a {
      padding-top: 60px;
    }

  }

  /* adapt media screen */
  @media screen and (max-width: 1500px) and (min-width: 1200px) {
    .news-second {
      max-height: 1000px;
    }
  }

  /* adapt big screen */
  @media screen and (min-width: 1500px){
    .news-second {
      margin-left: 40px;
    }
  }

  @media screen and (max-width: 1200px) {
    .news-second {
      max-height: 1000px;
    }
  }

  /* For iphone 5 */
  @media (min-width: 320px) and (max-width: 768px) {
    .mag-photo > div > img {
      height: 21.5em;
    }

    .run-photo > div > img {
      height: 21.5em;
    }

    .news-first {
      width: 20%;
    }

    .magazine {
      height: 420px;
    }

    .runway {
      height: 370px;
    }

    .add-img {
      width: 300px !important;
    }

    p, span, h1, h2, h3, h4, h5, h6, strong, a {
      font-size: 2.5em;
    }
  }

  /* For ipad */
  @media (min-width: 768px) and (max-width: 1024px) {
    .mag-photo > div > img {
      height: 17em;
    }

    .run-photo > div > img {
      height: 17em;
    }

    .run-bg {
      background: linear-gradient(70deg, white 85%, rgb(160, 160, 160));
    }

    .news-first {
      width: 45%;
    }

    .magazine {
      height: 420px;
    }

    .runway {
      height: 378px;
    }

    .news-photo {
      margin-top: -210px;
    }

    p, span, h1, h2, h3, h4, h5, h6, strong, a {
      font-size: 2em;
    }
  }
  /* For ipad pro */
  @media (min-width: 1024px) and (max-width: 1200px) {
    .mag-photo > div > img {
      height: 28em;
    }

    .run-photo > div > img {
      height: 28em;
    }

    .news-first {
      width: 45%;
    }

    .magazine {
      height: 510px;
    }

    .runway {
      height: 425px;
    }

    p, span, h1, h2, h3, h4, h5, h6, strong, a {
      font-size: 2.4em;
    }
  }

  @media (min-width: 1200px) and (max-width: 1400px){
    .mag-photo > div > img {
      height: 24em;
    }

    .mag-bg {
      background: linear-gradient(70deg, white 77%, rgb(67, 59, 56));
    }

    .run-photo > div > img {
      height: 24em;
    }

    .run-bg {
      background: linear-gradient(70deg, white 88%, rgb(144, 144, 144));
    }

    .news-photo {
      margin-top: -220px;
    }

    .magazine {
      height: 430px;
    }

    .runway {
      height: 490px;
    }

  }

  @media (min-width: 1400px) and (max-width: 1500px){
    .mag-photo > div > img {
      height: 28em;
    }

    .run-photo > div > img {
      height: 28em;
    }

    .magazine {
      height: 565px;
    }

    .runway {
      height: 518px;
    }

  }

  @media (min-width: 1500px){
    .mag-photo > div > img {
      margin-top: -210px;
      height: 37em;
    }

    .run-photo > div > img {
      margin-top: -220px !important;
      height: 37em;
    }

    .sub-header {
      height: 705px;
    }

    .mag-bg {
      background: linear-gradient(70deg, white 77%, rgb(67, 59, 56));
    }

    .run-bg {
      background: linear-gradient(70deg, white 89%, rgb(144, 144, 144));
    }

    .news-photo {
      margin-top: -440px;
    }

    .magazine {
      height: 705px;
    }

    .runway {
      height: 658px;
    }

    .news-second {
      width: 36%;
    }
  }
</style>
