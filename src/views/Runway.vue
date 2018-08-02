<template>
  <div>
    <!-- <div class="sub-header">
      <div>
        <span style="color:#cc141e; font-size: 20px">SHOW FINDER</span>
        <AlphaDropDown :opts="optsAlpha" desc="SEARCH DESIGNERS" class="drop"></AlphaDropDown>
        <DropDown :opts="opts" desc="SEARCH SEASONS" class="drop"></DropDown>
      </div>
    </div> -->
    <div class="big-title">
      {{config.runway.title}}
    </div>
    <br/><br/>
    <div class="main-container">
      <div class="left-pics">
        <div v-for="(n, index) in result.slice(0, 6)" :key="index">
          <img :src="n.img_url" alt="pic" @click="onImgClick($event, n.id)">
          <span class="showname">{{n.name}}</span>
        </div>
      </div>
      <div class="right-tabs">
        <div class="tabs">
          <div :class="[activeTab ? 'active' : '']" @click="switchTab(true)">LATEST SHOWS</div>
          <div :class="[activeTab ? '' : 'active']" @click="switchTab(false)">A-Z</div>
        </div>
        <div class="tab-content">
          <ul :class="[activeTab ? 'active': '']" id="latest-shows">
            <li v-for="(item, index) in opts" :key="index">
              <ul>
                <li class="list-item list-header">{{item.head}}</li>
                <li v-for="(show, index) in item.items" :key="index" class="list-item"><router-link :to="{ name: 'show', params: { showId: show.id }}">{{show.name}}</router-link></li>
              </ul>
            </li>
          </ul>
          <ul :class="[activeTab ? '': 'active']" id="A-Z">
            <li v-for="(item, index) in optsAlpha" :key="index">
              <ul id="main-content" :id=item.head>
                <li class="list-item list-header">{{item.head}}</li>
                <li v-for="(designer, index) in item.items" :key="index" class="list-item"><router-link :to="{ name: 'designerPro', params: { designerId: designer.id }}">{{designer.name}}</router-link></li>
              </ul>
            </li>
          </ul>
          <ul :class="['nav', dropFlag ? 'active': '']">
            <li v-for="(char, index) in alphas" :key="index" @click="jump(char)">{{char}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DropDown from './drop-down/DropDown.vue'
  import AlphaDropDown from './drop-down/AlphaDropDown.vue'
  import {getAllDesigners, getAllShows, getAllByFirstName, getAllJsons, getSeasons, getAllBySeason} from '../service/getData'

  export default {
    name: 'runway',
    data () {
      return {
        title: 'Runway',
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
        config: {
          home: {
            runway: {
              title: ''
            },
            designer: '',
            news: ''
          }
        },
        optsAlpha: [],
        activeTab: true,
        artists: [
          {
            id: 1,
            name: ''
          }
        ],
        shows: [
          {
            id: 1,
            name: 'test1',
            img_url: ''
          }
        ]
      }
    },
    components: {
      DropDown,
      AlphaDropDown
    },
    methods: {
      switchTab (flag) {
        this.activeTab = flag
      },
      onImgClick (event, showId) {
        this.$router.push({name: 'show', params: {showId: showId}})
      },
      async initData () {
        getAllDesigners(0, 10000).then(res => {
          if (res.code === '0') {
            this.artists = res.msg.designers
          }
        }).catch(err => {
          console.log(err)
        })
        getAllShows(0, 10000).then(res => {
          console.log(res)
          this.shows = res.msg.shows
        }).catch(err => {
          console.log(err)
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
        getAllJsons().then(res => {
          console.log('config', res)
          if (res.code === '0') {
            this.config = JSON.parse(res.msg.extraTitle)
          }
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
      }
    },
    mounted () {
      document.title = this.title
      this.initData()
    },
    computed: {
      result () {
        return this.shows
      }
    }
  }
</script>

<style scoped>

  @font-face {
    font-family: "DIN Condensed Bold";
    src: url(../assets/fonts/DINCond-Bold.otf);
  }

  @font-face {
    font-family: "Helvetica Neue Thin";
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

  /* big title */
  .big-title {
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 5em;
    text-align: center;
    font-family: Bernard;
    letter-spacing: 2px;
    color: black;
  }

  /* main container */
  .main-container {
    margin: 10px auto;
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    font-family: Bernard;
  }

  .left-pics {
    width: 550px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: space-between;
  }

  .left-pics > div {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 9px;
  }

  .left-pics > div > img {
    padding: 6px;
    padding-bottom: 0px;
    width: 240px !important;
    height: 360px !important;
    cursor: pointer;
    transition: .5s;
    border: 0px solid black !important;
  }

  /* .left-pics > div > img:hover {
    transform: scale(1.1, 1.1);
  } */

  .showname {
    width: 228px;
    height: 40px;
    color: #cc141e;
    text-align: center;
    background-color: #241E26;
    font-size: 12px;
    line-height: 40px;
  }

  /* tabs */
  .right-tabs {
    width: 20%;
    height: 80%;
    background-color: #cc141e;
    border: 1px solid ghostwhite;
    border-top: none;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }

  .tabs {
    display: flex;
    display: -webkit-flex;
    font-size: 18px;
    flex-direction: row;
    align-items: center;
    font-family: Tw;
    letter-spacing: 1.5px;
  }

  .tabs > div {
    cursor: pointer;
    width: 50%;
    height: 50px;
    text-align: center;
    font-weight: 900;
    padding: 10px;
    background-color: #2c0206;
    color: #cc141e;
    border: 0px solid ghostwhite;
  }

  .tabs > div.active {
    background-color: #cc141e;
    border-bottom: white;
    color: black;
  }

  .tab-content {
    overflow-y: auto;
    height: 100%;
    font-weight: bold;
  }

  #latest-shows {
    display: none;
    width:100%;
    overflow-y: auto;
  }

  #latest-shows.active {
    display: block;
  }

  #A-Z {
    display: none;
    width:100%;
    overflow-y: auto;
  }

  #A-Z.active {
    display: block;
  }

  li {
    text-align: left;
    padding: 5px;
  }

  .list-header {
    margin: 3px 0;
    font-weight: bold;
  }

  .list-item {
    width: 100%;
    letter-spacing: .1em;
    color: black;
    font-family: Tw;
    font-size: 1.5em;
    font-weight: 900;
  }

  a {
    color: black;
    padding-left: 2px;
    text-decoration: none !important;
    font-size: 0.7em;
    font-weight: bold;
  }

  /* 侧边导航栏 */
  .nav {
    display: none;
    position: absolute;
    border-left: 1px solid #DCDCD8;
    padding:10px;
    font-size: 0.5em;
    right: 10px;
    top: 60px;
  }

  .nav > li {
    padding: 2px;
    cursor: pointer;
  }

  .nav.active {
    display: block;
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

  /* For editing pic */
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

  @media screen and (max-width: 1250px){
    .sub-header > div {
      left: 5%;
    }
  }

  /* For iphone5 */
  @media (min-device-width: 320px) and (max-device-width: 568px){

    .main-container {
      flex-direction: column;
      align-items: center;
    }

    .left-pics {
      width: 65%;
    }

    .left-pics > div > img {
      width: 200px;
    }

    .right-tabs {
      width: 65%;
      margin-top: 10px;
    }

    .sub-header {
    }

    .sub-header > div {
      width: 80%;
    }

    .sub-header > div > span{
      font-size: 1.5em;
    }

    .drop {
      font-size: 2em;
    }
  }

  /* For ipad pro */
  @media (min-device-width: 568px) and (max-device-width: 1100px) {
    .main-container {
      flex-direction: column;
      align-items: center;
    }

    .left-pics {
      width: 65%;
    }

    .left-pics > div > img {
      width: 200px;
    }

    .right-tabs {
      width: 65%;
      margin-top: 10px;
    }

    .sub-header > div {
      width: 70%;
    }

    .sub-header > div > span{
      font-size: 1em;
    }

    .drop {
      font-size: 2em;
    }
  }

  @media (min-width: 1500px) {
    .left-pics > div > img {
      height: 270px;
      width: 180px;
    }
  }

  @media (min-width: 1800px) {
    .left-pics > div > img {
      height: 300px;
      width: 240px;
    }
  }

</style>
