<template>
  <div class="main-container">
    <el-button style="width: 100%" type="success" icon="plus" @click="addCooperationDialog=true">添加</el-button>
    <br>
    <div class="pagination">
      <pagination :pageInfo="pageInfo" @clickCurrent="pageChange" class="pagination"></pagination>
    </div>
    <div class="honor-list">
      <presentList ref="datas" :items="showItems" :times="times" :tags="tags" @startEdit="edit" @startAdd="startAdd" @startDelete="startDelete"></presentList>
    </div>

    <el-dialog
      title="添加合作"
      :visible.sync="addCooperationDialog"
      size="small"
    >
      <el-form ref="form" :model="cooperation" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="cooperation.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" rows="2" v-model="cooperation.description"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="cooperation.releaseTime"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="封面上传">
          <input type="file" id="cooperationCoverUploader" style="display: none"/>
          <el-button type="primary" icon="upload" @click="startUploadCooperationCover">封面上传</el-button>
          <el-progress :text-inside="true" :stroke-width="14" :percentage=cooperationCoverProcess status="success" style="margin-top: 10px; width: 110px"></el-progress>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCooperationDialog = false">取 消</el-button>
        <el-button type="primary" @click="createCooperation">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑合作"
      :visible.sync="editCooperationDialog"
      size="small"
    >
      <el-form ref="form" :model="editCooperation" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="editCooperation.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" rows="2" v-model="editCooperation.description"></el-input>
        </el-form-item>
        <el-form-item label="获奖时间">
          <el-date-picker
            v-model="editCooperation.releaseTime"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="封面修改">
          <input type="file" id="editCoverUploader" style="display: none">
          <el-button type="primary" icon="upload" @click="startEditCooperationCover">封面上传</el-button>
          <br><br>
          <img :src="editCooperation.portfolio.img_url" class="avatar" alt="">
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCooperationDialog = false">取 消</el-button>
        <el-button type="primary" @click="editCooperationDialog = false; confirmEdit()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除"
      :visible.sync="deleteCooperationDialog"
      size="small">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteCooperationDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteCooperationDialog = false; confirmDelete()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加/删除图片(点击图片删除)"
      :visible.sync="addPicDialog"
      size="large">
      <el-button type="primary" icon="plus" @click="startAddImg">添加图片</el-button>
      <span>上传数量({{imgUploadList.success.length}}/{{imgUploadList.total}}) 正在上传: {{imgUploadList.cur}}</span>
      <p>上传成功: <span v-for="(file, index) in imgUploadList.success" :key='index'>{{file}} </span></p>
      <p>上传失败: <span v-for="(file, index) in imgUploadList.fail" :key='index'>{{file}} </span></p>      
      <input type="file" style="display: none" multiple="true" id="addImg">
      <div class="panel" v-if="addPicDialog">
        <div v-for="(img, index) in editCooperation.portfolio.imgs" :key='index'>
          <img :src="img.img_url" alt="" @click="imgSelected = img.img_id; deleteImg = true">
          <span>修改排序： </span>
          <input type="number" v-model="img.rank" style="width: 50px"/>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPicDialog = false; updateImgsRanks()">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除图片"
      :visible.sync="deleteImg"
      size="small">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteImg = false">取 消</el-button>
        <el-button @click="deleteImg = false; deleteImgFromCooperation()" type="danger">确 认</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  /* eslint-disable */  
  import pagination from './pagination/pagination.vue'
  import presentList from './presentList/presentList.vue'
  import $ from 'jquery'
  import {cooperationCreate, getCooperationById, getAllCooperation, addCooperation, updateCooperation,
    updateCooperationCover, deleteCooperation, cooperationDelete, addImgCooperation, deleteImgCooperation, updateImgCooperationRank} from '../service/getData'

  export default {
    data () {
      return {
        designerId: this.$route.params.designerId,
        cooperations: [],
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
          pagenum: 10,
          pagegroup: 5,
          skin: '#0088f5'
        },
        editCooperationDialog: false,
        addCooperationDialog: false,
        cooperationCoverProcess: 0,
        deleteCooperationDialog: false,
        addPicDialog: false,
        deleteImg: false,
        imgSelected: -1,
        cooperationSelected: -1,
        addImgPro: 0,
        deleteItem: {},
        cooperation: {
          title: '',
          description: '',
          releaseTime: '',
          img: ''
        },
        imgUploadList: {
          total: 0,
          cur: '',
          success: [],
          fail: []
        },
        editCooperation: {
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
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
      }
    },
    props: ['designer'],
    methods: {
      sortImgs (a, b) {
        return a.rank - b.rank
      },
      updateImgsRanks () {
        let newRanks = []
        this.editCooperation.portfolio.imgs.forEach(item => {
          newRanks.push({
            img_id: item.img_id,
            rank: item.rank
          })
        })
        updateImgCooperationRank({id: this.editCooperation.id, imgRanks: newRanks}).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '更新顺序成功',
              type: 'success'
            })
            this.editCooperation.portfolio.imgs.sort(this.sortImgs)
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
      pageChange (current) {
        getAllCooperation(this.designerId, current - 1, 5).then(res => {
          if (res.code === '0') {
            this.cooperations = res.msg.cooperations
            if (this.cooperations.length > 5) {
              this.showItems = this.cooperations.slice(0, 5)
            } else {
              this.showItems = this.cooperations
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
      async edit (item) {
        await getCooperationById(item.id).then(res => {
          console.log(res)
          this.editCooperation = res.msg
          if (res.code === '0') {
            this.editCooperationDialog = true
          }
        }).catch(err => {
          console.log(err)
        })
      },
      async confirmEdit () {
        await updateCooperation(this.editCooperation).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.initData()
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        })
        if (this.editCooperation !== 0) {
          await updateCooperationCover({'id': this.editCooperation.id, 'img': this.cooperation.img}).then(res => {
            if (res.code !== '0') {
              this.$message({
                message: '封面上传失败',
                type: 'error'
              })
            } else {
              this.cooperationCoverProcess = 0
              $('#editCoverUploader').after($('#editCoverUploader').clone().val(''))
              $('#editCoverUploader').remove()
            }
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '封面上传失败',
              type: 'error'
            })
          })
        }
      },
      startDelete (item) {
        this.deleteCooperationDialog = true
        this.deleteItem = item
      },
      async confirmDelete () {
        await deleteCooperation(this.designerId, this.deleteItem.id).then(res => {
          if (res.code !== '0') {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
            return
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
        await cooperationDelete({"id": this.deleteItem.id}).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.initData()
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
      },
      startAdd (item) {
        this.addPicDialog = true
        this.editCooperation = item
      },
      /**
       * Operation for cooperation
       */
      startUploadCooperationCover () {
        $('#cooperationCoverUploader').click()
        $('#cooperationCoverUploader').change(() => {
          this.cooperationCoverProcess = 100
          this.cooperation.img = $('#cooperationCoverUploader')[0].files[0]
        })
      },
      startEditCooperationCover () {
        $('#editCoverUploader').click()
        $('#editCoverUploader').change(() => {
          this.cooperationCoverProcess = 100
          this.cooperation.img = $('#editCoverUploader')[0].files[0]
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
          this.sendRuqestToaddImg(fileList, 0)
          $('#addImg').after($('#addImg').clone().val(''))
          $('#addImg').remove()
        })
      },
      sendRuqestToaddImg (fileList, cur) {
        let timeout = 0
        this.imgUploadList.cur = fileList[cur].name
        addImgCooperation({id: this.editCooperation.id, img: fileList[cur]}).then(res => {
            if (res.code === '0') {
              this.$message({
                message: fileList[cur].name + '添加成功',
                type: 'success'
              })
              getCooperationById(this.editCooperation.id).then(res => {
                this.editCooperation = res.msg
              }).catch(err => {
                console.error(err)
              })
              this.initData()
              this.imgUploadList.success.push(fileList[cur].name)
              cur++
              setTimeout(() => this.sendRuqestToaddImg(fileList, cur), 2000)
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
              setTimeout(() => this.sendRuqestToaddImg(fileList, cur), 2000)
            }
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '添加失败',
              type: 'err'
            })
          })
      },
      createCooperation () {
        if (this.cooperation.title === '') {
          this.$message({
            message: '未填写名称',
            type: 'warning'
          })
          return
        } else if (this.cooperation.desc === '') {
          this.$message({
            message: '未填写描述',
            type: 'warning'
          })
          return
        } else if (this.cooperation.releaseTime === '') {
          this.$message({
            message: '未填写获奖时间',
            type: 'warning'
          })
          return
        } else if (this.cooperationCoverProcess !== 100) {
          this.$message({
            message: '未上传图片',
            type: 'warning'
          })
          return
        }
        this.cooperation.releaseTime = this.cooperation.releaseTime.getTime()
        let newCooperationId = -1
        cooperationCreate(this.cooperation).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            newCooperationId = res.msg.id
            addCooperation(this.designerId, newCooperationId).then(res => {
              this.initData()
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.$message({
              message: '网络问题,创建失败',
              type: 'error'
            })
          }
          this.addCooperationDialog = false
          Object.keys(this.cooperation).forEach(key => {
            this.cooperation[key] = ''
          })
          this.cooperationCoverProcess = 0
          $('#cooperationCoverUploader').after($('#cooperationCoverUploader').clone().val(''))
          $('#cooperationCoverUploader').remove()
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '网络问题，创建失败',
            type: 'error'
          })
          Object.keys(this.cooperation).forEach(key => {
            this.cooperation[key] = ''
          })
          this.cooperationCoverProcess = 0
          $('#cooperationCoverUploader').after($('#cooperationCoverUploader').clone().val(''))
          $('#cooperationCoverUploader').remove()
        })
      },
      deleteImgFromCooperation () {
        deleteImgCooperation({'id': this.editCooperation.id, 'imgId': this.imgSelected}).then(res => {
          if (res.code === '0') {
            getCooperationById(this.editCooperation.id).then(res => {
              console.log(res)
              this.editCooperation = res.msg
              this.initData()
            }).catch(err => {
              console.log(err)
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      async initData () {
        getAllCooperation(this.designerId, 0, 5).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.pageInfo.total = res.msg.total
            this.cooperations = res.msg.cooperations
            if (this.cooperations.length > 5) {
              this.showItems = this.cooperations.slice(0, 5)
            } else {
              this.showItems = this.cooperations
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

</style>
