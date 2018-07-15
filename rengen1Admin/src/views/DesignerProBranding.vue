<template>
  <div class="main-container">
    <el-button style="width: 100%" type="success" icon="plus" @click="addBrandingDialog=true">添加</el-button>
    <br>
    <div class="pagination">
      <pagination :pageInfo="pageInfo" @clickCurrent="pageChange" class="pagination"></pagination>
    </div>
    <div class="honor-list">
      <presentList ref="datas" :items="showItems" :times="times" :tags="tags" @startEdit="edit" @startDelete="startDelete" @startAdd="startAdd"></presentList>
    </div>

    <el-dialog
      title="编辑品牌露出"
      :visible.sync="editBrandingDialog"
      size="small"
    >
      <el-form ref="form" :model="editBranding" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="editBranding.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" rows="2" v-model="editBranding.description"></el-input>
        </el-form-item>
        <el-form-item label="获奖时间">
          <el-date-picker
            v-model="editBranding.releaseTime"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="封面修改">
          <input type="file" id="editCoverUploader" style="display: none">
          <el-button type="primary" icon="upload" @click="startEditBrandingCover">封面上传</el-button>
          <br><br>
          <img :src="editBranding.portfolio.img_url" class="avatar" alt="">
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editBrandingDialog = false">取 消</el-button>
        <el-button type="primary" @click="editBrandingDialog = false; confirmEdit()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加品牌露出"
      :visible.sync="addBrandingDialog"
      size="small"
    >
      <el-form ref="form" :model="branding" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="branding.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" rows="2" v-model="branding.description"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="branding.releaseTime"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="封面上传">
          <input type="file" id="brandingCoverUploader" style="display: none"/>
          <el-button type="primary" icon="upload" @click="startUploadBrandingCover">封面上传</el-button>
          <el-progress :text-inside="true" :stroke-width="14" :percentage=brandingCoverProcess status="success" style="margin-top: 10px; width: 110px"></el-progress>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBrandingDialog = false">取 消</el-button>
        <el-button type="primary" @click="createBranding">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除"
      :visible.sync="deleteBrandingDialog"
      size="small">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteBrandingDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteBrandingDialog = false; confirmDelete()">确 定</el-button>
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
        <div v-for="(img, index) in editBranding.portfolio.imgs" :key='index'>
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
        <el-button @click="deleteImg = false; deleteImgFromBranding()" type="danger">确 认</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  /* eslint-disable */
  import pagination from './pagination/pagination.vue'
  import presentList from './presentList/presentList.vue'
  import $ from 'jquery'
  import {brandingCreate, getBrandingById, getAllBranding, addBranding, updateBranding, updateBrandingCover,
    deleteBranding, brandingDelete, deleteImgBranding, addImgBranding, updateImgBrandingRank} from '../service/getData'

  export default {
    data () {
      return {
        designerId: this.$route.params.designerId,
        brandings: [],
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
        imgUploadList: {
          total: 0,
          cur: '',
          success: [],
          fail: []
        },
        editBrandingDialog: false,
        addBrandingDialog: false,
        brandingCoverProcess: 0,
        deleteBrandingDialog: false,
        addPicDialog: false,
        deleteImg: false,
        imgSelected: -1,
        brandingSelected: -1,
        addImgPro: 0,
        deleteItem: {},
        branding: {
          title: '',
          description: '',
          releaseTime: '',
          img: ''
        },
        editBranding: {
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
      sortImgs (a, b) {
        return a.rank - b.rank
      },
      updateImgsRanks () {
        let newRanks = []
        this.editBranding.portfolio.imgs.forEach(item => {
          newRanks.push({
            img_id: item.img_id,
            rank: item.rank
          })
        })
        updateImgBrandingRank({id: this.editBranding.id, imgRanks: newRanks}).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '更新顺序成功',
              type: 'success'
            })
            this.editBranding.portfolio.imgs.sort(this.sortImgs)
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
        getAllBranding(this.designerId, current - 1, 5).then(res => {
          if (res.code === '0') {
            this.brandings = res.msg.brandings
            if (this.brandings.length > 5) {
              this.showItems = this.brandings.slice(0, 5)
            } else {
              this.showItems = this.brandings
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
        await getBrandingById(item.id).then(res => {
          console.log(res)
          this.editBranding = res.msg
          if (res.code === '0') {
            this.editBrandingDialog = true
          }
        }).catch(err => {
          console.log(err)
        })
      },
      async confirmEdit () {
        await updateBranding(this.editBranding).then(res => {
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
        if (this.brandingCoverProcess !== 0) {
          await updateBrandingCover({'id': this.editBranding.id, 'img': this.branding.img}).then(res => {
            if (res.code !== '0') {
              this.$message({
                message: '封面上传失败',
                type: 'error'
              })
            } else {
              this.brandingCoverProcess = 0
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
        this.deleteBrandingDialog = true
        this.deleteItem = item
      },
      async confirmDelete () {
        await deleteBranding(this.designerId, this.deleteItem.id).then(res => {
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
        await brandingDelete({"id": this.deleteItem.id}).then(res => {
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
        this.editBranding = item
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      /**
       * Operation for branding
       */
      startUploadBrandingCover () {
        $('#brandingCoverUploader').click()
        $('#brandingCoverUploader').change(() => {
          this.brandingCoverProcess = 100
          this.branding.img = $('#brandingCoverUploader')[0].files[0]
        })
      },
      startEditBrandingCover () {
        $('#editCoverUploader').click()
        $('#editCoverUploader').change(() => {
          this.campaignCoverProcess = 100
          this.campaign.img = $('#editCoverUploader')[0].files[0]
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
        addImgBranding({id: this.editBranding.id, img: fileList[cur]}).then(res => {
            if (res.code === '0') {
              this.$message({
                message: fileList[cur].name + '添加成功',
                type: 'success'
              })
              getBrandingById(this.editBranding.id).then(res => {
                this.editBranding = res.msg
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
      async createBranding () {
        if (this.branding.title === '') {
          this.$message({
            message: '未填写名称',
            type: 'warning'
          })
          return
        } else if (this.branding.desc === '') {
          this.$message({
            message: '未填写描述',
            type: 'warning'
          })
          return
        } else if (this.branding.releaseTime === '') {
          this.$message({
            message: '未填写获奖时间',
            type: 'warning'
          })
          return
        } else if (this.brandingCoverProcess !== 100) {
          this.$message({
            message: '未上传图片',
            type: 'warning'
          })
          return
        }
        this.branding.releaseTime = this.branding.releaseTime.getTime()
        let newBrandingId = -1
        await brandingCreate(this.branding).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            newBrandingId = res.msg.id
            addBranding(this.designerId, newBrandingId).then(res => {
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
          this.addBrandingDialog = false
          Object.keys(this.branding).forEach(key => {
            this.branding[key] = ''
          })
          this.brandingCoverProcess = 0
          $('#brandingCoverUploader').after($('#brandingCoverUploader').clone().val(''))
          $('#brandingCoverUploader').remove()
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '网络问题，创建失败',
            type: 'error'
          })
          this.addBrandingDialog = false
          Object.keys(this.branding).forEach(key => {
            this.branding[key] = ''
          })
          this.brandingCoverProcess = 0
          $('#brandingCoverUploader').after($('#brandingCoverUploader').clone().val(''))
          $('#brandingCoverUploader').remove()
        })
      },
      deleteImgFromBranding () {
        deleteImgBranding({'id': this.editBranding.id, 'imgId': this.imgSelected}).then(res => {
          if (res.code === '0') {
            getBrandingById(this.editBranding.id).then(res => {
              console.log(res)
              this.editBranding = res.msg
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
        getAllBranding(this.designerId, 0, 5).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.pageInfo.total = res.msg.total
            this.brandings = res.msg.brandings
            if (this.brandings.length > 5) {
              this.showItems = this.brandings.slice(0, 5)
            } else {
              this.showItems = this.brandings
            }
            setTimeout(() => this.$refs.datas.initData(), 200)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
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
