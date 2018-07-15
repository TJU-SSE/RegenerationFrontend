<template>
  <header class="header">
    <router-link :to="{ name: 'Home' }" class="brand">
      <img src="../../static/img/菜单栏logo.png">
    </router-link>
    <ul class="header-list">
      <router-link tag="li" :to="{ name: 'Home'}" :active-class="activeClass" exact>HOME</router-link>
      <router-link tag="li" :to="{ name: 'runway'}" :active-class="activeClass" exact>RUNWAY</router-link>
      <router-link tag="li" :to="{ name: 'designerHome'}" :active-class="activeClass" exact>DESIGNER</router-link>
      <router-link tag="li" :to="{ name: 'news'}" :active-class="activeClass" exact>NEWS</router-link>
      <router-link tag="li" :to="{ name: 'contact'}" :active-class="activeClass" exact>ABOUT US</router-link>
    </ul>
    <a class="header-search">
      <i class="fa fa-search fa-lg" aria-hidden="true"></i>
    </a>
    <Select
      v-model="searchValue"
      placeholder="搜索"
      filterable
      remote
      class="search-bar"
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
  </header>
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
        searchNews: [],
        msg: 'This is news page',
        curPathName: '',
        activeClass: 'active'
      }
    },
    methods: {
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

  .header{
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    height: 55px;
    background: linear-gradient(20deg, #43485A, #222222);
  }

  .header a{
    text-decoration: none;
  }

  .header .brand{
    color: #ec644B;
    font-size: xx-large;
    font-weight: bolder;
    line-height: 30;
  }

  .brand img {
    width: 200px;
  }

  .header .header-list, .header .header-search, .header .header-list li a{
    color: white;
    font-family: "Helvetica Neue Thin";
  }

  .search-bar {
    width: 150px;
    margin-left: 5px;
  }

  .header .header-list{
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 0 0 10%;
    margin: 0;
    list-style: none;
    font-weight: normal;
    font-size: large;
  }

  .header .header-list li {
    position: relative;
    margin: 0 2%;
    cursor: pointer;
  }

  .header .header-list li.active{
    line-height: 2;
    border-bottom: 1px solid white;
  }

  .header .header-list li:hover a, .header .header-search:hover, .header .header-list li:hover{
    color: #d2d7d3;
  }

  @media (min-device-width: 320px) and (max-device-width: 568px){
    .header {
      height: 70px;
    }
    li {
      font-size: 1.2em;
    }
  }
</style>
