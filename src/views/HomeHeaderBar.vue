<template>
  <div>
   <div class="header">
    <div class="social-icon">
      <img src="../../static/icon/facebook.svg" alt="facebook">
      <img src="../../static/icon/ins.svg" alt="ins">
      <img src="../../static/icon/wechat.svg" alt="微信">
      <img src="../../static/icon/weibo.svg" alt="新浪微博">
      <img src="../../static/icon/qq.svg" alt="QQ">
    </div>
    <div class="big-title">
      <h1>REGENERATION</h1>
    </div>
    </div>

    <div class="sub-header">
     <div class="navigation">
      <router-link to="/Home">HOME</router-link>
      <router-link :to="{ name: 'runway'}" exact>RUNWAY</router-link>
      <router-link :to="{ name: 'designerHome' }">DESIGNER</router-link>
      <router-link :to="{ name: 'news'}" exact>NEWS</router-link>
      <router-link :to="{ name: 'contact'}" exact>ABOUT US</router-link>
      <!-- <div>
        <p class="search-label">Search</p>
        <div class="search">
          <Select
            v-model="searchValue"
            placeholder="搜索"
            filterable
            remote
            @on-change="turnTo"
            :remote-method="searchMethod"
            :loading="loading">
            <OptionGroup label="Designer" v-if="resShow">
              <Option v-for="item in searchDesigners" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="Show">
              <Option v-for="item in searchShows" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
            <OptionGroup label="News" v-if="resShow">
              <Option v-for="item in searchNews" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
          </Select>
        </div>
      </div> -->
     </div>
    </div>
  </div>
</template>

<script>
  import {getAllDesigners, getAllNews, getAllShows} from '../service/getData'

  export default {
    data () {
      return {
        searchValue: '',
        startSearch: false,
        resultModal: false,
        loading: false,
        resShow: false,
        designers: [],
        searchDesigners: [],
        shows: [],
        searchShows: [],
        news: [],
        searchNews: []
      }
    },
    methods: {
      start (e) {
        this.startSearch = !this.startSearch
      },
      turnTo (value) {
        console.log(value)
        let type = ''
        let id = ''
        for (let i = 0; i < value.length; i++) {
          if (value[i] === '-') {
            type = value.substring(0, i)
            id = value.substring(i + 1, value.length)
            break
          }
        }
        if (type === 'designer') {
          this.$router.push({name: 'designerPro', params: {designerId: Number.parseInt(id)}})
        } else if (type === 'show') {
          this.$router.push({name: 'show', params: {showId: Number.parseInt(id)}})
        } else if (type === 'news') {
          this.$router.push({name: 'newsDetail', params: {newsId: Number.parseInt(id)}})
        }
      },
      searchMethod (query) {
        console.log(query)
        if (query !== '') {
          this.resShow = false
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.searchDesigners = this.designers.map(item => {
              return {
                value: 'designer-' + item.id,
                label: item.name
              }
            })
            this.searchDesigners = this.searchDesigners.filter(item => item.label.toUpperCase().includes(query.toUpperCase()))
            this.searchShows = this.shows.map(item => {
              return {
                value: 'show-' + item.id,
                label: item.name
              }
            })
            this.searchShows = this.searchDesigners.filter(item => item.label.toUpperCase().includes(query.toUpperCase()))
            this.searchNews = this.news.map(item => {
              return {
                value: 'news-' + item.newsId,
                label: item.title
              }
            })
            this.searchNews = this.searchNews.filter(item => item.label.toUpperCase().includes(query.toUpperCase()))
            this.resShow = true
            console.log(this.searchShows)
            console.log(this.searchNews)
            console.log(this.searchDesigners)
          }, 300)
        } else {
          this.designer = []
        }
      },
      async initData () {
        getAllDesigners(0, 10000).then(res => {
          if (res.code === '0') {
            this.designers = res.msg.designers
          }
        }).catch(err => {
          console.log(err)
        })
        getAllNews(0, 10000).then(res => {
          this.news = res.msg.newses
        }).catch(err => {
          console.log(err)
        })
        getAllShows(0, 10000).then(res => {
          this.shows = res.msg.shows
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted () {
      console.log('header')
      this.initData()
    }
  }
</script>

<style scoped>

  @font-face {
    font-family: 'Helvetica Neue Thin';
    src: url(../assets/fonts/HelveticaNeueLt.ttf);
  }

  @font-face {
    font-family: 'Bernard';
    src: url(../assets/fonts/Bernard.ttf);
  }

  @font-face {
    font-family: 'Tw';
    src: url(../assets/fonts/Tw.ttf);
  }

  /* header */
  .header {
    height: 300px;
    /* background: linear-gradient(70deg, white, #433B38 80%, #1E0A02); */
    background: url('../../static/img/homeheader.jpg');
  }
  .sub-header {
    background-color: #2a0910;
    height: 60px;
    font-family: 'Tw';
    font-size: 21px;
    letter-spacing: 2px;
  }
  .social-icon > img {
    padding: 10px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .big-title {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: center;
  }

  .big-title h1 {
    color: #cc141e;
    font-size: 140px;
    font-family: Tw;
    letter-spacing: 45px;
  }

  @media screen {
    .big-title  > img {
      height: 7em;
      margin: 47px;
    }
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
    width: 85%;
    margin: 0 auto;
  }

  .navigation > a {
    text-decoration: none;
    font-size: 1.5em;
    color: rgb(207, 45, 45);
    padding: 5px;
    margin: 0 auto;
  }

  .navigation > div {
    position: absolute;
    right: 10%;
    font-size: 1em;
    color: white;
    font-family:"Microsoft YaHei"
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
    text-indent: 20px;
    display: none;
    position: absolute;
    top: 40px;
    left: 10px;
    width: 160px;
    border-width: 0 0 2px;
    background: none;
    transition: 1s;
    color: black;
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

  /* adapt big screen */
  @media screen and (min-width: 1500px){

    .big-title > span {
      padding: 10px;
      font-size: 8.5em;
    }

    /* news first */
    .news-first > div > img {
      width: 60%;
      height: auto;
      max-height: 700px;
    }
  }

  /* adapt small screen */
  @media screen and (max-width: 1200px) {
    .big-title > span {
      padding: 6px;
      font-size: 6.5em;
    }
  }

  .logout {
    position: absolute;
    right: 20px;
    top: 40px;
  }

  /* For iphone 5 */
  @media (min-device-width: 320px) and (max-device-width: 568px) {
    .navigation {
      width: 70%;
    }
    .search-label {
      display: none;
    }
    .search > div{
      position: absolute;
      top: 25px;
      left: -610px;
      width: 400px;
    }
    .search > img {
      display: none;
    }
    a {
      font-size: 2.0em !important;
    }
  }

  /* For ipad */
  @media (min-width: 768px) and (max-width: 1024px) {
    .big-title > img {
      height: 6.8em;
    }
  }
  /* For ipad pro */
  @media (min-width: 1024px) and (max-width: 1366px) {
    .big-title > img {
      height: 6.8em;
    }
  }

</style>

