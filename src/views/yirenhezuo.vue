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
      <el-row v-for="o in corpList[year]" :key="o">
        <el-col :span="5"><img :src="o.image" class="imgAbr"></el-col>
        <el-col :span="19">
          <h3 class="title">{{o.title}}</h3>
          <div class="intro">
            <p>{{o.time}}</p>
            <p>{{o.desc}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
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
        length: 'TYPE ALL'
      }
    },
    methods: {
      sortItem (a, b) {
        return b.releaseTime - a.releaseTime
      },
      async initData () {
        getAllBranding(this.designerId, 0, 5).then(res => {
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
