<template>

  <div class="main-container">
    <div class="big-title">
      {{show.designer.name}}
    </div>
    <div class="designer-show">
      <div class="thumb-swiper">
        <thumbSwiper :designer="show" :imgs="show.imgs" :year="year" :season="season"></thumbSwiper>
      </div>
      <div class="alpha">
        <alpha :opts="optsAlpha"></alpha>
      </div>
    </div>
    <div class="biography">
      <h2>biography</h2>
      <hr>
      <br>
      <p>{{show.desc}}</p>
      <hr>
    </div>
    <div class="seasons-swiper">
      <div class="center-text">
        <h2>All Seasons</h2>
      </div>
      <hr>
      <smallSwiper :swiperSlides="otherShows" @toShow="changePage"></smallSwiper>
    </div>

  </div>
</template>

<script>
  import smallSwiper from './swipers/SmallSwiper.vue'
  import thumbSwiper from './swipers/ThumbSwiper.vue'
  import alpha from './drop-down/DesignerAlpha.vue'
  import {getShowById, getAllDesigners, getAllByDesigner, getAllByFirstName, getAllShows} from '../service/getData'

  export default {
    data () {
      return {
        title: '设计师详情',
        showId: this.$route.params.showId,
        otherShows: [
          {
            id: -1,
            img_url: '',
            desc: ''
          }
        ],
        year: '',
        season: '',
        optsAlpha: [],
        designers: [],
        show: {
          desc: '',
          designer: {
            name: ''
          },
          id: '',
          img_id: '',
          img_url: '',
          imgs: [],
          name: '',
          rank: '',
          year: ''
        }
      }
    },
    methods: {
      changePage () {
        this.initData()
      },
      async initData () {
        this.showId = this.$route.params.showId
        getAllShows(0, 10000).then(res => {
          res.msg.shows.forEach(item => {
            if (item.id === this.showId) {
              this.year = item.year
              this.season = item.season
            }
          })
        })
        await getShowById(this.showId).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.show = res.msg
            getAllByDesigner(this.show.designer.id).then(res => {
              this.otherShows = res.msg.shows
            }).catch(err => {
              console.log(err)
            })
          }
        }).catch(err => {
          console.log(err)
        })
        await getAllDesigners(0, 10000).then(res => {
          if (res.code === '0') {
            this.designers = res.msg.designers
          }
        }).catch(err => {
          console.log(err)
        })
        await getAllByFirstName().then(res => {
          console.log(res)
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
    components: {
      smallSwiper,
      thumbSwiper,
      alpha
    },
    mounted () {
      document.title = this.title
      console.log(this.showId)
      this.initData()
    }
  }
</script>

<style scoped>
  /* main container */

  .main-container {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .designer-show {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
  }

  .thumb-swiper {
    width: 80%;
  }

  .alpha {
    width: 20%;
  }

  /* biography */
  .biography {
    margin-top: 10px;
    width: 80%;
  }

  .biography p {
    font-size: 1.2em;
  }

  .biography hr {
    height: 2px;
    z-index: 1;
  }

  /* seasons swiper */
  .seasons-swiper hr {
    position: relative;
    width: 100%;
    top: -70px;
    z-index: -1;
  }

  .big-title {
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 5em;
    text-align: center;
    font-family: Bernard;
  }

  .center-text {
    text-align: center;
    background-color: white;
    opacity: 1;
    z-index: 100;
    width: 20%;
    margin: 0 auto;
  }

  .center-text h2 {
    font-weight: 100;
  }

  .swiper-wrapper > div {
    height: 200px !important;
    width: 100%;
  }

  .seasons-swiper {
    margin-top: 10px;
    margin-bottom: 15px;
    width: 80%;
  }

  .edit {
    position: absolute;
    top: 65px;
    left: 15px;
  }

  /* 图片上传 */
  .avatar {
    width: 178px;
    height: 178px;
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

  .panel > div {
    margin: 5px;
  }

  .panel > div img {
    height: 120px;
    cursor: pointer;
    transition: .5s;
  }

  .panel > div img:hover {
    transform: scale(1.1, 1.1);
  }

  /* For iphone 5 */
  @media (min-device-width: 320px) and (max-device-width: 568px){

  }

  /* For ipad pro */
  @media (min-device-width: 568px) and (max-device-width: 1100px) {

  }

</style>
