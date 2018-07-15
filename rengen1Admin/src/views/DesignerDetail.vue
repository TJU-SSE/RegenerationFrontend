<template>
  <div class="main-container">
    <el-button type="default" icon="edit" class="edit" @click="editBasicDialog = true">基本资料</el-button>
    <el-button type="default" icon="edit" class="edit" @click="editCoverDialog = true" style="top: 120px;">封面</el-button>
    <el-button type="default" icon="edit" class="edit" @click="editPicDialog = true" style="top: 170px; left: 10px;">show照</el-button>
    <el-button type="default" icon="close" class="edit" @click="deleteDialog = true" style="top: 220px; left: 10px;">删除</el-button>
    <div class="designer-show">
      <div class="thumb-swiper">
        <thumbSwiper :designerName="show.designer.name" :imgs="show.imgs"></thumbSwiper>
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
        <p>Raf Simons</p>
      </div>
      <hr>
      <smallSwiper :swiperSlides="otherShows" ></smallSwiper>
    </div>

    <el-dialog
      title="修改基本资料"
      :visible.sync="editBasicDialog"
      size="large">
      <el-form :model="show" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="show.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :rows=2 v-model="show.desc"></el-input>
        </el-form-item>
        <el-form-item label="首页排名">
          <input type="number" v-model="show.rank">
        </el-form-item>
        <el-form-item label="年份">
          <el-date-picker
            v-model="show.year"
            align="right"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="season">
          <el-input v-model="show.season" type="text" placeholder="SS输入1 AW输入2"></el-input>
        </el-form-item>
        <el-form-item label="设计师">
          <el-select v-model="show.designer.id" placeholder="请选择设计师">
            <el-option
              v-for="item in designers"
              :key="item.name"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editBasicDialog = false">取 消</el-button>
        <el-button @click="editBasicDialog = false; confirmEditBasic()" type="danger">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改封面"
      :visible.sync="editCoverDialog"
      size="large">
      <input type="file" style="display: none" id="editCoverUploader">
      <el-button type="primary" icon="upload" @click="startEditCover">点击上传</el-button>
      <el-progress :text-inside="true" :stroke-width="14" :percentage=showCoverProcess status="success" style="margin-top: 10px; width: 110px"></el-progress>
      <img :src="show.img_url" alt="" style="margin-top: 5px; max-height: 200px">
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCoverDialog = false">取 消</el-button>
        <el-button @click="editCoverDialog = false;confirmEditCover()" type="danger" >确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加/删除图片(点击图片删除)"
      :visible.sync="editPicDialog"
      size="large">
      <el-button type="primary" icon="plus" @click="startAddImg">添加图片</el-button>
      <span>上传数量({{imgUploadList.success.length}}/{{imgUploadList.total}}) 正在上传: {{imgUploadList.cur}}</span>
      <p>上传成功: <span v-for="(file, index) in imgUploadList.success" :key='index'>{{file}} </span></p>
      <p>上传失败: <span v-for="(file, index) in imgUploadList.fail" :key='index'>{{file}} </span></p>
      <input type="file" style="display: none" multiple="true" id="addImg">
      <div class="panel" v-if="editPicDialog">
        <div v-for="(img, index) in show.imgs" :key="index">
          <img :src="img.img_url" alt="" @click="imgSelected = img.img_id; deleteImg = true">
          <span>修改顺序: </span>
          <input type="number" v-model="img.rank" style="width: 50px"/>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPicDialog = false">取 消</el-button>
        <el-button @click="editPicDialog = false; updateImgRanks()" type="danger">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除图片"
      :visible.sync="deleteImg"
      size="small">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteImg = false">取 消</el-button>
        <el-button @click="deleteImg = false; deleteImgFromShow()" type="danger">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除"
      :visible.sync="deleteDialog"
      size="small">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button @click="deleteDialog = false; deleteShow()" type="danger">确 认</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  /* eslint-disable */
  import smallSwiper from './swipers/SmallSwiper.vue'
  import thumbSwiper from './swipers/ThumbSwiper.vue'
  import alpha from './drop-down/DesignerAlpha.vue'
  import $ from 'jquery'
  import {getShowById, getAllDesigners, updateShow, addDesignerToShow, updateShowCover, addImgToShow, deleteImgFromShow, updateShowRank, getAllByDesigner, getAllByFirstName, showDelete, updateImgShowRank} from '../service/getData'

  export default {
    data () {
      return {
        title: '设计师详情',
        showId: this.$route.params.showId,
        editBasicDialog: false,
        editCoverDialog: false,
        editPicDialog: false,
        deleteImg: false,
        deleteDialog: false,
        showCoverProcess: 0,
        addImgPro: 0,
        imgSelected: -1,
        imgUploadList: {
          total: 0,
          cur: '',
          success: [],
          fail: []
        },
        otherShows: [
          {
            id: -1,
            img_url: '',
            desc: ''
          }
        ],
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
          year: '',
          season: ''
        },
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
    methods: {
      sortImgs (a, b) {
        return a.rank - b.rank
      },
      updateImgRanks () {
        let newRanks = []
        this.show.imgs.forEach(item => {
          newRanks.push({
            showLinkId: item.show_link_id,
            rank: item.rank
          })
        })
        updateImgShowRank({ranks: newRanks}).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '更新顺序成功',
              type: 'success'
            })
            this.show.imgs.sort(this.sortImgs)
          } else {
            this.$message({
              message: '后端问题，更新顺序失败',
              type: 'error'
            })
          }
        }).catch(err => {
          console.error(err)
          this.$message({
            message: '网络问题，更新顺序失败',
            type: 'error'
          })
        })
      },
      startAddImg () {
        $('#addImg').click()
        $('#addImg').change(() => {
          console.log($('#addImg')[0].files)
          if ($('#addImg')[0].files.length === 0) {
            return
          }
          let fileList = []
          for (let i = 0; i < $('#addImg')[0].files.length; i++) {
            fileList.push($('#addImg')[0].files[i])
          }
          this.imgUploadList.total = 0
          this.imgUploadList.cur = ''
          this.imgUploadList.success = []
          this.imgUploadList.fail = []
          this.imgUploadList.total = fileList.length
          this.sendRuestToaddImg(fileList, 0)
          $('#addImg').after($('#addImg').clone().val(''))
          $('#addImg').remove()
        })
      },
      sendRuestToaddImg (fileList, cur) {
        let timeout = 0
        this.imgUploadList.cur = fileList[cur].name
        addImgToShow({id: this.show.id, img: fileList[cur]}).then(res => {
            if (res.code === '0') {
              this.$message({
                message: fileList[cur].name + '添加成功',
                type: 'success'
              })
              this.initData()
              this.imgUploadList.success.push(fileList[cur].name)
              cur++
              setTimeout(() => this.sendRuestToaddImg(fileList, cur), 2000)
            } else {
              this.$message({
                message: '添加失败, 重试第' + timeout + '次',
                type: 'err'
              })
              timeout++
              if (timeout >= 3) {
                this.$message({
                  message: '请重新上传',
                  type: 'err'
                })
                this.imgUploadList.fail.push(fileList[cur].name)
                return
              }
              setTimeout(() => this.sendRuestToaddImg(fileList, cur), 2000)
            }
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '添加失败',
              type: 'err'
            })
          })
      },
      deleteImgFromShow () {
        deleteImgFromShow({'id': this.show.id, 'imgId': this.imgSelected}).then(res => {
          if (res.code === '0') {
            this.initData()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      startEditCover () {
        $('#editCoverUploader').click()
        $('#editCoverUploader').change(() => {
          this.showCoverProcess = 100
        })
      },
      confirmEditCover () {
        if (this.showCoverProcess !== 100) {
          this.$message({
            message: '未上传新封面',
            type: 'warning'
          })
          return
        }
        updateShowCover({'id': this.show.id, 'img': $('#editCoverUploader')[0].files[0]}).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '修改封面成功',
              type: 'success'
            })
            this.initData()
            this.showCoverProcess = 0
          } else {
            this.$message({
              message: '网络原因，上传失败',
              type: 'error'
            })
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '网络原因，上传失败',
            type: 'error'
          })
        })
      },
      confirmEditBasic () {
        try {
          this.show.year = this.show.year.getFullYear()
        } catch (e) {
          console.log(e)
        }
        if (this.show.season !== '1' && this.show.season !== '2') {
          this.$message({
            message: '秀season错误',
            type: 'error'
          })
          return
        }
        updateShow(this.show).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '设计师基本资料修改成功',
              type: 'success'
            })
            updateShowRank({'ranks': [{'showId': this.show.id, 'rank': this.show.rank}]}).then(res => {
              if (res.code === '0') {
                this.$message({
                  message: '设计师排名修改成功',
                  type: 'success'
                })
              }
            }).catch(err => {
              console.log(err)
              this.$message({
                message: '网络问题，设计师排名修改失败',
                type: 'error'
              })
            })
            addDesignerToShow(this.show.designer.id, this.showId).then(res => {
              this.$message({
                message: '设计师绑定修改成功',
                type: 'success'
              })
            }).catch(err => {
              console.log(err)
              this.$message({
                message: '网络问题，设计师绑定修改失败',
                type: 'error'
              })
            })
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '网络问题，基本资料修改失败',
            type: 'error'
          })
        })
        setTimeout(() => this.initData(), 500)
      },
      deleteShow () {
        showDelete({id: this.showId}).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.$router.push({name: 'runway'})
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '网络问题，删除失败',
            type: 'error'
          })
        })
      },
      async initData () {
        await getShowById(this.showId).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.show = res.msg
            this.show['season'] = ''
            console.log(this.show)
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
            this.optsAlpha.push({
              head: key,
              items: res.msg[key]
            })
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
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
      }
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
    margin-top: 10px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .designer-show {
    width: 80%;
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
</style>
