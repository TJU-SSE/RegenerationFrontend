<template>
  <div class="main-container">
    <el-button style="width: 100%" type="success" icon="plus" @click="addOutLookDialog=true">添加</el-button>
    <br>
    <div class="pagination">
      <pagination :pageInfo="pageInfo" @clickCurrent="pageChange" class="pagination"></pagination>
    </div>
    <div class="honor-list">
      <presentList ref="datas" :items="showItems" :times="times" :tags="tags" @startEdit="edit"
                   @startDelete="startDelete" @startAdd="startAdd"></presentList>
    </div>

    <el-dialog
      title="编辑OutLook"
      :visible.sync="editOutLookDialog"
      size="small"
    >
      <el-form ref="form" :model="editOutLook" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="editOutLook.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" rows="2" v-model="editOutLook.description"></el-input>
        </el-form-item>
        <el-form-item label="获奖时间">
          <el-date-picker
            v-model="editOutLook.releaseTime"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="封面修改">
          <input type="file" id="editCoverUploader" style="display: none">
          <el-button type="primary" icon="upload" @click="startEditOutLookCover">封面上传</el-button>
          <br><br>
          <img :src="editOutLook.portfolio.img_url" class="avatar" alt="">
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editOutLookDialog = false">取 消</el-button>
        <el-button type="primary" @click="editOutLookDialog = false; confirmEdit()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除"
      :visible.sync="deleteOutLookDialog"
      size="small">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteOutLookDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteOutLookDialog = false; confirmDelete()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加大片"
      :visible.sync="addOutLookDialog"
      size="small"
    >
      <el-form ref="form" :model="outLook" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="outLook.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" rows="2" v-model="outLook.description"></el-input>
        </el-form-item>
        <el-form-item label="发行时间">
          <el-date-picker
            v-model="outLook.releaseTime"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="封面上传">
          <input type="file" id="outLookCoverUploader" style="display: none"/>
          <el-button type="primary" icon="upload" @click="startUploadOutLookCover">封面上传</el-button>
          <el-progress :text-inside="true" :stroke-width="14" :percentage=outLookCoverProcess status="success" style="margin-top: 10px; width: 110px"></el-progress>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOutLookDialog = false">取 消</el-button>
        <el-button type="primary" @click="createOutLook">确 定</el-button>
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
        <div v-for="(img, index) in editOutLook.portfolio.imgs" :key='index'>
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
        <el-button @click="deleteImg = false; deleteImgFromOutLook()" type="danger">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  /* eslint-disable */
  import pagination from './pagination/pagination.vue'
  import presentList from './presentList/presentList.vue'
  import {lookBookCreate, getAllLookBook, addLookbook, getLookBookById, updateLookbook, updateLookbookCover,
    deleteLookbook, lookBookDelete, addImgLookbook, deleteImgLookbook, updateImgLookbookRank} from '../service/getData'
  import $ from 'jquery'

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
        editOutLookDialog: false,
        addOutLookDialog: false,
        deleteOutLookDialog: false,
        addPicDialog: false,
        deleteImg: false,
        imgSelected: -1,
        outSelected: -1,
        addImgPro: 0,
        deleteItem: {},
        outLookCoverProcess: 0,
        outLook: {
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
        this.editOutLook.portfolio.imgs.forEach(item => {
          newRanks.push({
            img_id: item.img_id,
            rank: item.rank
          })
        })
        updateImgLookbookRank({id: this.editOutLook.id, imgRanks: newRanks}).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '更新顺序成功',
              type: 'success'
            })
            this.editOutLook.portfolio.imgs.sort(this.sortImgs)
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
        getAllLookBook(this.designerId, current - 1, 5).then(res => {
          if (res.code === '0') {
            this.lookbooks = res.msg.lookbooks
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
      async edit (item) {
        await getLookBookById(item.id).then(res => {
          console.log(res)
          this.editOutLook = res.msg
          if (res.code === '0') {
            this.editOutLookDialog = true
          }
        }).catch(err => {
          console.log(err)
        })
      },
      async confirmEdit () {
        await updateLookbook(this.editOutLook).then(res => {
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
        if (this.outLookCoverProcess !== 0) {
          await updateLookbookCover({'id': this.editOutLook.id, 'img': this.outLook.img}).then(res => {
            if (res.code !== '0') {
              this.$message({
                message: '封面上传失败',
                type: 'error'
              })
            } else {
              this.outLookCoverProcess = 0
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
        this.deleteOutLookDialog = true
        this.deleteItem = item
      },
      async confirmDelete () {
        await deleteLookbook(this.designerId, this.deleteItem.id).then(res => {
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
        await lookBookDelete({"id": this.deleteItem.id}).then(res => {
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
        this.editOutLook = item
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      /**
       * Operation about outlook
       */
      startUploadOutLookCover () {
        $('#outLookCoverUploader').click()
        $('#outLookCoverUploader').change(() => {
          this.outLookCoverProcess = 100
          this.outLook.img = $('#outLookCoverUploader')[0].files[0]
        })
      },
      startEditOutLookCover () {
        $('#editCoverUploader').click()
        $('#editCoverUploader').change(() => {
          this.outLookCoverProcess = 100
          this.outLook.img = $('#editCoverUploader')[0].files[0]
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
        addImgLookbook({id: this.editOutLook.id, img: fileList[cur]}).then(res => {
            if (res.code === '0') {
              this.$message({
                message: fileList[cur].name + '添加成功',
                type: 'success'
              })
              getLookBookById(this.editOutLook.id).then(res => {
                this.editOutLook = res.msg
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
      async createOutLook () {
        if (this.outLook.title === '') {
          this.$message({
            message: '未填写名称',
            type: 'warning'
          })
          return
        } else if (this.outLook.desc === '') {
          this.$message({
            message: '未填写描述',
            type: 'warning'
          })
          return
        } else if (this.outLook.releaseTime === '') {
          this.$message({
            message: '未填写发行时间',
            type: 'warning'
          })
          return
        } else if (this.outLookCoverProcess !== 100) {
          this.$message({
            message: '未上传图片',
            type: 'warning'
          })
          return
        }
        this.outLook.releaseTime = this.outLook.releaseTime.getTime()
        let newLookBookId = -1
        await lookBookCreate(this.outLook).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            newLookBookId = res.msg.id
            addLookbook(this.designerId, newLookBookId).then(res => {
              this.initData()
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.$message({
              message: '网络问题，创建失败',
              type: 'error'
            })
          }
          this.addOutLookDialog = false
          Object.keys(this.outLook).forEach(key => {
            this.outLook[key] = ''
          })
          this.outLookCoverProcess = 0
          $('#outLookCoverUploader').after($('#outLookCoverUploader').clone().val(''))
          $('#outLookCoverUploader').remove()
        }).catch(err => {
          console.log(err)
          this.addOutLookDialog = false
          Object.keys(this.outLook).forEach(key => {
            this.outLook[key] = ''
          })
          this.outLookCoverProcess = 0
          $('#outLookCoverUploader').after($('#outLookCoverUploader').clone().val(''))
          $('#outLookCoverUploader').remove()
        })
      },
      deleteImgFromOutLook () {
        deleteImgLookbook({'id': this.editOutLook.id, 'imgId': this.imgSelected}).then(res => {
          if (res.code === '0') {
            getLookBookById(this.editOutLook.id).then(res => {
              console.log(res)
              this.editOutLook = res.msg
            }).catch(err => {
              console.log(err)
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      async initData () {
        getAllLookBook(this.designerId, 0, 5).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.pageInfo.total = res.msg.total
            this.lookbooks = res.msg.lookbooks
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
