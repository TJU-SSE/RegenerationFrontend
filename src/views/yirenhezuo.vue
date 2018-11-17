<template>
  <div class="main">
    <el-collapse>
        <el-collapse-item :title="length">
            <div class="imgList">
              <el-row>
                <el-col :span="4" v-for="o in brandings" :key="o" class="imgList"><img :src="o.portfolio.img_url" class="imgAbr"></el-col>
              </el-row>
            </div>
        </el-collapse-item>
    </el-collapse>  

    <div v-for="(year, index) in yearList" :key="index">
      <p class="para">{{year}}</p>
      <HR class="hr"></HR>
      <el-row v-for="(o, index) in corpList[year]" :key="o">
        <el-popover placement="right-start" trigger="hover">
          <div class="side-title">
            <h3>{{o.title}}</h3>
            <p> &nbsp {{o.releaseTime}}</p>
            <hr>
          </div>
          <div class="side-img">
            <div class="side-left">
              <img :src="o.portfolio.img_url" alt="pic">
            </div>
            <div class="side-right">
              <div>
                <img :src="url.img_url" alt="pic" v-for="(url, index) in o.portfolio.imgs.slice(0, 2)" :key="index">
              </div>
              <div>
                <img :src="url.img_url" alt="pic" v-for="(url, index) in o.portfolio.imgs.slice(2, 4)" :key="index">
              </div>
            </div>
          </div>
          <div class="side-desc">
            <hr>
            <p>{{o.description}}</p>
          </div>
          <p style="position: relative; right: -300px; color: #1d90e6; cursor: pointer" @click="itemActive(index, year);modalFlag=true">More</p>
          <el-col :span="5" slot="reference"><img :src="o.image" class="imgAbr"></el-col>
        </el-popover>
        <el-col :span="19">
          <h3 class="title">{{o.title}}</h3>
          <div class="intro">
            <p>{{o.time}}</p>
            <p>{{o.desc}}</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="modalFlag"
      width="100%">
      <h4>{{choose.title}}</h4>
      <div style="overflow-y: auto; height: 100%">
        <img :src="choose.image" alt="pic" style="width: 100%">
        <img :src="url.img_url" alt="pic" v-for="(url, index) in corpList[year][index].portfolio.imgs" :key="index" style="width: 100%; margin-top: 5px">
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="modalFlag = false">关闭</Button>
      </div>
    </el-dialog>

  </div>    
</template>

<script>
  import {getAllBranding} from '../service/getData'

  export default {
    data () {
      return {
        designerId: this.$route.params.designerId,
        brandings: [],
        yearList: [],
        total: 0,
        corpList: {},
        length: 'TYPE ALL',
        modalFlag: false,
        choose: {},
        year: 2016,
        index: 1,
        activeItem: -1
      }
    },
    methods: {
      sortItem (a, b) {
        return b.releaseTime - a.releaseTime
      },
      initData () {
        getAllBranding(this.designerId, 0, 1000).then(res => {
          console.log('origin res', res)
          if (res.code === '0') {
            this.total = res.msg.total
            this.brandings = res.msg.brandings
            this.brandings.sort(this.sortItem)
            var monthAbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            this.brandings.forEach(element => {
              var newDate = new Date()
              newDate.setTime(element.releaseTime)
              var year = newDate.getFullYear()
              if (this.yearList.indexOf(year) === -1) {
                this.yearList.push(year)
              }
              var str = monthAbr[newDate.getMonth()] + ' ' + year
              element.releaseTime = str

              var item = {}
              item['title'] = element.title
              item['desc'] = element.description
              item['time'] = element.releaseTime
              item['image'] = element.portfolio.img_url
              item['portfolio'] = element.portfolio
              if (this.corpList[year] == null) {
                this.corpList[year] = [item]
              } else {
                this.corpList[year].push(item)
              }
            })
            this.yearList.sort().reverse()
            console.log('yearList', this.yearList)
            setTimeout(() => this.$refs.datas.initData(), 200)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      itemActive (index, year) {
        this.choose = this.corpList[year][index]
        this.year = year
        this.index = index
        console.log('choose', this.choose)
      }
    },
    created () {
      this.initData()
      console.log('corpList', this.corpList)
    }
  }
</script>

<style scoped>

  @font-face {
    font-family: 'Tw';
    src: url(../assets/fonts/Tw.ttf);
  }

  .main {
    font-family: 'Tw', CH;
  }

  .imgAbr {
    width: 60%;
    height: 100%;
    padding: 5px;
    margin: 5px;
  }

  .para {
    padding-top: 50px;
    padding-bottom: 0px;
    margin-bottom: 0px;
  }

  hr {
    margin-top: 0px !important;
    border-top: 1px solid black !important;
  }

  .title {
    font-size: 13.5px;
    color: white;
  }

  .intro {
    margin: 0 0 0px;
    line-height: 5px;
  }

  .side-title, .side-desc{
    margin-left: 20px;
    margin-top: -10px;
    width: 90%;
  }

  .side-title h3 {
    font-size: 0.9em;
  }

  .side-img {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    height: 270px;
    margin-left: 10px;
  }

  .side-left {

  }

  .side-left > img {
    max-width: 150px;
    max-height: 150px;
    margin-left: 10px;
    margin-top: 6px;
  }

  .side-right {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-left: 20px;
    width: 200px;
    height: 150px;
  }

  .side-right > div {
    width: 90px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }

  .side-right > div > img {
    width: 80px;
    /* height: 80px; */
    margin: 5px;
  }

  .side-right > a {
    position: absolute;
    bottom: 100px;
    right: 10px;
    margin-top: 10px;
    font-size: 1.5em;
  }

</style>

<style>
  .el-collapse-item__header {
    background-color: #d61518 !important;
    color: white;
    text-align: center;
    border-bottom: 1px solid black !important;
  }

  .el-collapse {
    border: 1px solid black !important;
  }

  .el-collapse-item__content {
    background-color: black;
    color: white;
    border: 0px solid black !important;
  }

  .el-collapse-item__wrap {
    border: 0px !important;
  }

  .el-collapse-item__arrow {
    float: unset !important;
  }
</style>
