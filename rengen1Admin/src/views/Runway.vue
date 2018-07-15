<template>
  <div>
    <div class="sub-header">
      <div>
        <span>SHOW FINDER</span>
        <AlphaDropDown :opts="optsAlpha" desc="search designers" class="drop"></AlphaDropDown>
        <DropDown :opts="opts" desc="search Seasons" class="drop"></DropDown>
      </div>
    </div>
    <div class="big-title">
      {{config.runway.title}}
      <input type="text" v-model="config.runway.title" style="width: 150px; height: 40px">
      <el-button type="primary" @click="changeTitle">修改标题</el-button>
    </div>
    <el-button type="default" icon="plus" style="float: right; margin-right: 50px" @click="addShowDialog = true">添加</el-button>
    <br/><br/>
    <p style="color: red; margin: 40px">排序id已经列出，修改id就能修改排序，用数字大小排序的，自己随意调整，这里列出了所有的，但是网站上只会显示头6个</p>
    <el-button type="primary" @click="changeRanks()" style="margin-left: 40px">提交排序</el-button>    
    <div class="main-container">
      <div class="left-pics">
        <div v-for="n in shows">
          <img :src="n.img_url" :alt="n.rank" @click="onImgClick($event, n.id)">
          <p>排序id: {{n.rank}} 修改： </p>
          <input type="number" v-model="n.rank">
        </div>
      </div>
      <div class="right-tabs">
        <div class="tabs">
          <div :class="[activeTab ? 'active' : '']" @click="switchTab(true)">LATEST SHOWS</div>
          <div :class="[activeTab ? '' : 'active']" @click="switchTab(false)">A-Z</div>
        </div>
        <div class="tab-content">
          <ul :class="[activeTab ? 'active': '']" id="latest-shows">
            <li v-for="item in opts">
              <ul>
                <li class="list-item list-header">{{item.head}}</li>
                <li v-for="show in item.items" class="list-item"><router-link :to="{ name: 'show', params: { showId: show.id }}">{{show.name}}</router-link></li>
              </ul>
            </li>
          </ul>
          <ul :class="[activeTab ? '': 'active']" id="A-Z">
            <li v-for="item in optsAlpha">
              <ul id="main-content" :id=item.head>
                <li class="list-item list-header">{{item.head}}</li>
                <li v-for="designer in item.items" class="list-item"><router-link :to="{ name: 'designerPro', params: { designerId: designer.id }}">{{designer.name}}</router-link></li>
              </ul>
            </li>
          </ul>
          <ul :class="['nav', dropFlag ? 'active': '']">
            <li v-for="char in alphas" @click="jump(char)">{{char}}</li>
          </ul>
        </div>
      </div>
    </div>

    <!--Add show-->
    <el-dialog
      title="添加show"
      :visible.sync="addShowDialog"
      size="large">
      <el-form :model="form" label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="年份">
          <el-date-picker
            v-model="form.year"
            align="right"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="season">
          <el-select v-model="form.season" placeholder="请选择season">
            <el-option
              v-for="item in seasons"
              :key="item.name"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="位置排序">
          <el-input v-model="form.rank"></el-input>
        </el-form-item>
        <el-form-item label="设计师">
          <el-select v-model="form.artist" placeholder="请选择设计师">
            <el-option
              v-for="item in artists"
              :key="item.name"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面上传">
          <input type="file" style="display: none" id="cover-uploader">
          <el-button type="primary" icon="upload" @click="openCoverUploader">点击上传</el-button>
          <el-progress :text-inside="true" :stroke-width="14" :percentage=showCoverProcess status="success" style="margin-top: 10px; width: 110px"></el-progress>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="addShowDialog = false; confirmAdd()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  /* eslint-disable */
  import DropDown from './drop-down/DropDown.vue'
  import AlphaDropDown from './drop-down/AlphaDropDown.vue'
  import $ from 'jquery'
  import {getAllDesigners, showCreate, addDesignerToShow, getAllShows, getAllByYear, getAllByFirstName, updateShowRank, getAllJsons, setJson, getSeasons, getAllBySeason, deleteSeason} from '../service/getData'

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
        optsAlpha: [],
        activeTab: true,
        addShowDialog: false,
        runwayEditDialog: false,
        choosePicDialog: false,
        showCoverProcess: 0,
        tmpId: 0,
        tmpEdit: '',
        config: {
          home: {
            runway: {
              title: ''
            },
            designer: '',
            news: ''
          }
        },
        runwayIndex: [
          {
            id: 1,
            show: {
              id: 1,
              name: 'test1',
              cover: '../../static/img/img1.jpg'
            },
            rank: 1
          },
          {
            id: 2,
            show: {
              id: 2,
              name: 'test2',
              cover: '../../static/img/img2.jpg'
            },
            rank: 2
          },
          {
            id: 3,
            show: {
              id: 3,
              name: 'test3',
              cover: '../../static/img/img3.jpg'
            },
            rank: 3
          },
          {
            id: 4,
            show: {
              id: 4,
              name: 'test4',
              cover: '../../static/img/img4.jpg'
            },
            rank: 4
          },
          {
            id: 5,
            show: {
              id: 5,
              name: 'test5',
              cover: '../../static/img/img5.jpg'
            },
            rank: 5
          },
          {
            id: 6,
            show: {
              id: 6,
              name: 'test6',
              cover: '../../static/img/img6.jpg'
            },
            rank: 6
          }
        ],
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
            img_url: '../../static/img/img1.jpg'
          }
        ],
        form: {
          name: '',
          desc: '',
          year: '',
          rank: '',
          artist: '无',
          img: '',
          season: ''
        },
        existSeasons: [],
        seasons: [
          {
            name: 'SS',
            value: 1
          },
          {
            name: 'AW',
            value: 2
          }
        ]
      }
    },
    components: {
      DropDown,
      AlphaDropDown
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
      }
    },
    methods: {
      changeTitle () {
        setJson({
          content: JSON.stringify(this.config)
        }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '网络原因，修改失败',
            type: 'error'
          })
        })
      },
      showSort (a, b) {
        return b.rank - a.rank
      },
      changeRanks () {
        let newRanks = []
        this.shows.forEach(item => {
          newRanks.push({
            showId: item.id,
            rank: item.rank
          })
        })
        updateShowRank({'ranks': newRanks}).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '顺序修改成功',
              type: 'success'
            })
            this.show.sort(this.showSort)
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '顺序修改失败',
            type: 'error'
          })
        })
      },
      switchTab (flag) {
        this.activeTab = flag
      },
      onImgClick (event, showId) {
        this.$router.push({name: 'show', params: {showId: showId}})
      },
      /**
       * For uploading cover
       */
      openCoverUploader () {
        $('#cover-uploader').click()
        $('#cover-uploader').change(() => {
//          $('#cover-uploader').after($('#cover-uploader').clone().val(''))
//          $('#cover-uploader').remove()
          this.showCoverProcess = 100
          this.form.img = $('#cover-uploader')[0].files[0]
        })
      },
      confirmAdd () {
        if (this.form.name === '') {
          this.$message({
            message: '请填写名称',
            type: 'warning'
          })
          return
        } else if (this.form.desc === '') {
          this.$message({
            message: '请填写描述',
            type: 'warning'
          })
          return
        } else if (this.form.year === '') {
          this.$message({
            message: '请填写年份',
            type: 'warning'
          })
          return
        } else if (this.form.artist === '无') {
          this.$message({
            message: '请填写设计师',
            type: 'warning'
          })
          return
        } else if (this.showCoverProcess === 0) {
          this.$message({
            message: '请上传封面',
            type: 'warning'
          })
          return
        }
        this.form.year = this.form.year.getFullYear()
        showCreate(this.form).then(res => {
          if (res.code === '0') {
            let showId = res.msg.id
            addDesignerToShow(this.form.artist, showId).then(res => {
              if (res.code === '0') {
                this.$message({
                  message: '创建成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '网络错误，创建失败',
                  type: 'error'
                })
              }
            }).catch(err => {
              console.log(err)
              this.$message({
                message: '网络错误，创建失败',
                type: 'error'
              })
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /**
       * For uploading show pics
       * @param file
       * @param fileList
       */
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
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
        getAllByYear().then(res => {
          console.log(res)
          Object.keys(res.msg).forEach(key => {
            this.opts.push({
              head: key,
              items: res.msg[key]
            })
          })
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
          if (res.code === '0') {
            this.config = JSON.parse(res.msg.extraTitle)
            console.log('config', this.config)
          }
        }).catch(err => {
          console.log(err)
        })
        getSeasons().then(res => {
          console.log('seasons', res)
          for (let season of res.msg) {
            getAllBySeason(season.year, season.season).then(res => {
              console.log('shows by season', res)
              if (res.msg.shows.length === 0) {
                deleteSeason({ year: Number.parseInt(season.year), season: Number.parseInt(season.season)}).then().catch(err => console.error(err))
              }
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
    }
  }
</script>

<style scoped>

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
    font-size: 2.5em;
    text-align: center;
    font-family: 'DIN Condensed Bold';
  }

  /* main container */
  .main-container {
    margin: 10px auto;
    width: 100%;
    /*height: 800px;*/
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }

  .left-pics {
    width: 40%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .left-pics > div {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .left-pics > div > img {
    padding: 3px;
    width: 160px;
    height: 240px;
    cursor: pointer;
    transition: .5s;
  }

  .left-pics > div > img:hover {
    transform: scale(1.1, 1.1);
  }

  /* tabs */
  .right-tabs {
    width: 40%;
    height: 60%;
    background-color: white;
    border: 1px solid ghostwhite;
    border-top: none;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }

  .tabs {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
  }

  .tabs > div {
    cursor: pointer;
    width: 50%;
    height: 50px;
    text-align: center;
    padding: 10px;
    background-color: #FCFBFE;
    border: 1px solid ghostwhite;
  }

  .tabs > div.active {
    background-color: white;
    border-bottom: white;
  }

  .tab-content {
    overflow-y: auto;
    height: 100%;
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
    color: #333;
    font-family: "Helvetica Neue Thin";
    font-size: 0.9em;
  }

  a {
    color: black;
    padding-left: 2px;
    text-decoration: none !important;
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
