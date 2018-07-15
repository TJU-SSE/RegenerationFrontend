<template>
  <div class="main-container">
    <div class="pagination">
      <pagination :pageInfo="pageInfo" @clickCurrent="pageChange" class="pagination"></pagination>
    </div>
    <div class="honor-list">
      <presentList ref="datas" :items="showItems" :designer="designer"></presentList>
    </div>
  </div>
</template>

<script>
  import pagination from './pagination/pagination.vue'
  import presentList from './presentList/presentList.vue'
  import {getAllLookBook} from '../service/getData'

  export default {
    data () {
      return {
        designerId: this.$route.params.designerId,
        lookbooks: [],
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
        outLook: {
          title: '',
          description: '',
          releaseTime: '',
          img: ''
        },
        editOutLook: {
          title: '',
          description: '',
          releaseTime: '',
          portfolio: {
            img_url: ''
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
        getAllLookBook(this.designerId, current - 1, 5).then(res => {
          if (res.code === '0') {
            this.lookbooks = res.msg.lookbooks
            this.lookbooks.sort(this.sortItem)
            if (this.lookbooks.length > 5) {
              this.showItems = this.lookbooks.slice(0, 5)
            } else {
              this.showItems = this.lookbooks
            }
            setTimeout(() => this.$refs.datas.initData(), 200)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      sortByTime (time) {
        let tmp = []
        this.honors.forEach(i => {
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
        this.honors.forEach(i => {
          if (i.tag === tag) {
            tmp.push(i)
          }
        })
        this.showItems = tmp
        this.pageInfo.total = tmp.length
        setTimeout(() => this.$refs.datas.initData(), 200)
      },
      showAll (e) {
        this.showItems = this.honors
        this.pageInfo.total = this.honors.length
        setTimeout(() => this.$refs.datas.initData(), 200)
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      async initData () {
        getAllLookBook(this.designerId, 0, 5).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.pageInfo.total = res.msg.total
            this.lookbooks = res.msg.lookbooks
            this.lookbooks.sort(this.sortItem)
            if (this.lookbooks.length > 5) {
              this.showItems = this.lookbooks.slice(0, 5)
            } else {
              this.showItems = this.lookbooks
            }
            setTimeout(() => this.$refs.datas.initData(), 200)
          }
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


</style>
