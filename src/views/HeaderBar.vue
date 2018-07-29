<template>
  <div>
  <header class="header">
    <router-link :to="{ name: 'Home' }" class="brand">
      <img class="big-title" src="../../static/img/regeneration主页logo-01.png">
    </router-link>
    <ul class="header-list">
      <router-link tag="li" :to="{ name: 'Home'}" :active-class="activeClass" exact>HOME</router-link>
      <router-link tag="li" :to="{ name: 'runway'}" :active-class="activeClass" exact>RUNWAY</router-link>
      <router-link tag="li" :to="{ name: 'designerHome'}" :active-class="activeClass" exact>DESIGNER</router-link>
      <router-link tag="li" :to="{ name: 'news'}" :active-class="activeClass" exact>NEWS</router-link>
      <router-link tag="li" :to="{ name: 'contact'}" :active-class="activeClass" exact>ABOUT US</router-link>
    </ul>
    <!-- <a class="header-search">
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
    </Select> -->
  </header>
  <div>
      <div class="sub-header">
      <div>
        <span style="color:#cc141e; font-size: 20px">SHOW FINDER</span>
        <AlphaDropDown :opts="optsAlpha" desc="search designers" class="drop"></AlphaDropDown>
        <DropDown :opts="opts" desc="search Seasons" class="drop"></DropDown>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import DropDown from './drop-down/DropDown.vue'
  import AlphaDropDown from './drop-down/AlphaDropDown.vue'
  import {getAllDesigners, getAllNews, getAllShows, getSeasons, getAllBySeason, getAllByFirstName} from '../service/getData'

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
        activeClass: 'active',
        opts: [
          {
            head: '',
            items: [
              {
                id: -1,
                name: ''
              }
            ]
          }
        ],
        optsAlpha: []
      }
    },
    components: {
      DropDown,
      AlphaDropDown
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
        getSeasons().then(res => {
          console.log('seasons', res)
          for (let season of res.msg) {
            getAllBySeason(season.year, season.season).then(res => {
              console.log('shows by season', res)
              this.opts.push({
                head: season.season === '1' ? (Number.parseInt(season.year) + 1) + ' SS' : season.year + ' AW',
                items: res.msg.shows
              })
            }).catch(err => {
              console.error(err)
            })
          }
        }).catch(err => {
          console.error(err)
        })
        getAllByFirstName().then(res => {
          Object.keys(res.msg).forEach(key => {
            if (key !== 'a') {
              this.optsAlpha.push({
                head: key,
                items: res.msg[key]
              })
            }
          })
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
    height: 200px;
    background: url('../../static/img/homeheader.jpg');
  }
  .big-title {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    /* justify-content: left; */
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
  /* sub header */
  .sub-header {
    background-color: #241E26;
    height: 60px;
  }

  .sub-header > div {
    position: relative;
    width: 60%;
    left: 40%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .sub-header > div > span {
    color: white;
    position: relative;
    top: 20px;
    margin-right: 20px;
  }

  .drop {
    position: relative;
    top: 10px;
    margin-right: 10px;
    font-size: 0.8em;
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
