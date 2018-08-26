<template>
  <div>
    <AutoSwiper :imgs="news.slice(0, 4)"></AutoSwiper>
    <div class="magazine" style="height:1200px">
      <div class="sub-header mag-bg">
        <img src="../../static/img/RUNWAY-01.png"/>
        <h3>{{config.home.runway}}</h3>
      </div>
      <div class="center" >
        <div class="mag-photo" >        
            <div v-for="img in shows.slice(0, 3)">           
                <img :src="img.img_url" alt="magzine" style="height:800px" @click="toShow(img.id)">     
            </div>                      
        </div>
        <div>
            <div v-for="img in shows.slice(0, 3)"> 
              <el-col :span="1"><p></p></el-col>  
              <el-col :span="6">
                <p class="desc">{{img.desc}}</p> 
              </el-col>         
              <el-col :span="1"><p></p></el-col>     
            </div>  
        </div> 

      </div>      
    </div>
    <div class="runway">
      <div class="sub-header run-bg" >
        <img src="../../static/img/designer.png"/>
        <h3>{{config.home.designer}}</h3>
      </div>
      <div class="center">
        <div class="run-photo">
          <div v-for="img in designerImgs">
            <img :src="img.img_url" alt="runway" @click="turnToDesigner(img.id)" style="margin-top: 20px">
          </div>
        </div>
      </div>
    </div>
    <div class="news">
      <!--<div class="bg"></div>-->

      <div class="sub-header" style="position: relative; left: -50px;">
        <img src="../../static/img/news.png" style="width: 120px"/>
        <h3>{{config.home.news}}</h3>
      </div>

      <div class="news-photo">
        <div class="news-first" >
          <div v-for="item in news.slice(0, 3)">
            <div>
              <div>
                <p style="font-family: Bernard, CH; letter-spacing: 2px">{{item.time}}</p>
                <!--<p>{{item.writer}}</p>-->
                <ul>
                  <li v-for="tag in item.tag" style="font-family: Bernard, CH; letter-spacing: 2px">{{tag.tagTitle}}</li>
                </ul>
              </div>
            </div>
            <img style="margin-left: 40px;" :src="item.cover_img" alt="news" @click="toNews(item.newsId)">
            <h4 style="margin-left: 15px; font-family: Bernard, CH; letter-spacing: 2px">{{item.title}}</h4>
          </div>
        </div>
        <div class="news-second">
          <img :src="config.home.img" class="add-img" @click="toRegen">
          <!--<img v-for="img in news.slice(3)" :src="img.cover_img" alt="weibo" @click="toNews(img.newsId)">-->
        </div>
      </div>
    </div>
    <Footer></Footer>

  </div>

</template>

<script>
  import AutoSwiper from './swipers/AutoSwiper.vue'
  import {getAllDesigners, getAllNews, getAllShows, getAllJsons} from '../service/getData'
  /* eslint-disable */
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
        startSearch: false,
        searchValue: ''
      }
    },
    methods: {
      formatDate (time) {
        let res = ''
        let date = new Date(time)
        res = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        return res
      },
      toRegen () {
        window.open('http://regen.org.cn/')
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
          function sortDate (new1, new2) {
            let day1 = new Date(new1.time)
            let day2 = new Date(new2.time)
            return day2.getTime() - day1.getTime()
          }
          this.news.sort(sortDate)
          this.news.forEach(n => {
            n.time = this.formatDate(n.time)
          })
        }).catch(err => {
          console.log(err)
        })

        getAllShows(0, 10).then(res => {
          console.log("all shows here")
          console.log(res)
          this.shows = res.msg.shows
        }).catch(err => {
          console.log(err)
        })

        getAllJsons().then(res => {
          console.log('config', res)
          if (res.code === '0') {
            this.config = JSON.parse(res.msg.extraTitle)
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

  @font-face {
    font-family: 'CH';
    src: url(../assets/fonts/CH.otf);
  }

  /* header */
  .header {
    height: 300px;
    background: white;
  
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
   
    padding: 5px;
    margin: 0 auto;
  }

  .navigation > div {
    position: absolute;
    right: 4%;
    font-size: 1em;
   
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
    font-family: Bernard, CH;
    letter-spacing: 2px;
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
    background: white;
   
  }

  .mag-photo > div {
    /*margin: 0 5px*/
  }

  .mag-photo > div > img {
    max-width: 100%;
    margin: 0 20px;
    cursor: pointer;
  }
  .desc{
    font-size: 15px;

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

  .desc {
    font-size: 15pt;
  }

  .run-bg {
    background: white;
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
    font-family: "CH";
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
    color: #2c3e50;
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
    margin-top: 200px;
  }

  .bg {
    height: 800px;
    position: absolute;
    right: 0;
    width: 1500px;
    background: white;
  
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
      background: white;
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
      background: white;
    }

    .run-photo > div > img {
      height: 24em;
    }

    .run-bg {
      background: white;
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
      font-family: Bernard, CH;
      letter-spacing: 2px;
    }

    .mag-bg {
      background:white;
    }

    .run-bg {
      background: white;
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
