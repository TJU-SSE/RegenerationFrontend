<template>
  <div class="main-container">
    <div class="biography">
      <h4 style="font-family: Arial; margin-bottom: -10px"><strong>Biography</strong></h4>
      <hr>
      <p class="bio-content">{{designer.biography}}</p>
      <h4 style="margin-bottom: -10px"><strong>Awards</strong></h4>
      <hr>
    </div>
    <div class="honor-list" v-if="showItems.length !== 0">
      <presentList ref="datas" :items="showItems" :designer="designer"></presentList>
    </div>
  </div>
</template>

<script>
  import pagination from './pagination/pagination.vue'
  import presentList from './presentList/presentList.vue'
  import {getAllCampaign, getDesignerById} from '../service/getData'

  export default {
    data () {
      return {
        designerId: this.$route.params.designerId,
        specificBiography: '',
        moreText: '',
        moreFlag: false,
        campaigns: [],
        times: [
          '2017',
          '2016',
          '2015'
        ],
        tags: [
          'Advertising',
          'Shows',
          'Others'
        ],
        showItems: [],
        pageInfo: {
          total: 0,
          current: 1,
          pagenum: 5,
          pagegroup: 5,
          skin: '#0088f5'
        },
        campaign: {
          title: '',
          description: '',
          releaseTime: '',
          img: ''
        },
        editCampaign: {
          title: '',
          description: '',
          releaseTime: '',
          portfolio: {
            imgs: [
              {
                img_url: ''
              }
            ]
          }
        }
      }
    },
    components: {
      pagination,
      presentList
    },
    props: ['designer'],
    methods: {
      sortItem (a, b) {
        return b.releaseTime - a.releaseTime
      },
      pageChange (current) {
        getAllCampaign(this.designerId, current - 1, 5).then(res => {
          if (res.code === '0') {
            this.campaigns = res.msg.campaigns
            this.campaigns.sort(this.sortItem)
            if (this.campaigns.length > 5) {
              this.showItems = this.campaigns.slice(0, 5)
            } else {
              this.showItems = this.campaigns
            }
            setTimeout(() => this.$refs.datas.initData(), 200)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      sortByTime (time) {
        let tmp = []
        this.campaigns.forEach(i => {
          if (i.time.toString() === time) {
            tmp.push(i)
          }
        })
        this.showItems = tmp
        this.pageInfo.total = tmp.length
        setTimeout(() => this.$refs.datas.initData(), 200)
      },
      sortByTag (tag) {
        let tmp = []
        this.campaigns.forEach(i => {
          if (i.tag === tag) {
            tmp.push(i)
          }
        })
        this.showItems = tmp
        this.pageInfo.total = tmp.length
        setTimeout(() => this.$refs.datas.initData(), 200)
      },
      showAll (e) {
        this.showItems = this.campaigns
        this.pageInfo.total = this.campaigns.length
        setTimeout(() => this.$refs.datas.initData(), 200)
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      async initData () {
        await getAllCampaign(this.designerId, 0, 5).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.pageInfo.total = res.msg.total
            this.campaigns = res.msg.campaigns
            this.campaigns.sort(this.sortItem)
            console.log(this.campaigns)
            if (this.campaigns.length > 5) {
              this.showItems = this.campaigns.slice(0, 5)
            } else {
              this.showItems = this.campaigns
            }
            setTimeout(() => {
              this.$refs.datas.initData()
            }, 200)
          }
        }).catch(err => {
          console.log(err)
        })
        await getDesignerById(this.designerId).then(res => {
          this.designer = res.msg
          this.specificBiography = this.designer.biography
          console.log(this.specificBiography.length)
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    created () {
      this.initData()
    }
  }
</script>

<style scoped>
  .main-container {
    height: 100%;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }

  /* 简历 */
  .biography {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }

  .biography hr {
    border-top: 1px solid black
  }

  .biography table {
    font-size: 1.1em;
    margin: 10px auto;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .biography h4 {
    font-family: 'Tw', CH !important;
  }

  .bio-content {
    font-family: 'Tw', CH !important;
    font-size: 14pt;
  }

  .biography thead > tr > th {
    padding: 5px;
    color: #ccc;
  }

  .biography th {
    text-align: center;
  }

  /* 标签和时间 */
  .tags {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-self: center;
  }

  .tags a {
    margin: 5px;
    padding: 5px;
    text-decoration: none;
    cursor: pointer;
    color: black;
    background-color: #ccc;
    transition: 0.5s;
    border-radius: 5px;
  }

  .tags a:hover {
    opacity: 0.6;
  }

  /* 获奖列表 */
  .honor-list {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    height: 900px;
  }

  .pagination {
    margin: 0 auto;
    display: inline-block !important;
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

  .more {
    color: #1c8de0;
    cursor: pointer;
  }

  /* For iphone5 */
  @media (min-device-width: 320px) and (max-device-width: 568px){
    .bio-content {
      font-size: 1.7em;
    }
  }

  /* For ipad pro */
  @media (min-device-width: 568px) and (max-device-width: 1100px) {
    .bio-content {
      font-size: 1.7em;
    }
  }

</style>
