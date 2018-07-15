<template>
  <div class="main-container">
    <div class="biography">
      <h4>Biography</h4>
      <hr>
      <p>{{designer.biography}}</p>
      <h4>Updates</h4>
      <hr>
      <el-button type="success" icon="plus" @click="addCampaignDialog=true">添加</el-button>
      <br>
    </div>
    <div class="pagination">
      <pagination :pageInfo="pageInfo" @clickCurrent="pageChange" class="pagination"></pagination>
    </div>
    <div class="honor-list" v-if="showItems.length !== 0">
      <presentList ref="datas" :items="showItems" :times="times" :tags="tags"
                   @startEdit="edit" @startDelete="startDelete" @startAdd="startAdd"></presentList>
    </div>

    <el-dialog
      title="编辑获奖信息"
      :visible.sync="editCampaignDialog"
      size="small"
    >
      <el-form ref="form" :model="editCampaign" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="editCampaign.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" rows="2" v-model="editCampaign.description"></el-input>
        </el-form-item>
        <el-form-item label="获奖时间">
          <el-date-picker
            v-model="editCampaign.releaseTime"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="封面修改">
          <input type="file" id="editCoverUploader" style="display: none">
          <el-button type="primary" icon="upload" @click="startEditCampaignCover">封面上传</el-button>
          <br><br>
          <img :src="editCampaign.portfolio.img_url" class="avatar" alt="">
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCampaignDialog = false">取 消</el-button>
        <el-button type="primary" @click="editCampaignDialog = false; confirmEdit()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加奖项"
      :visible.sync="addCampaignDialog"
      size="small"
    >
      <el-form ref="form" :model="campaign" label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="campaign.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" rows="2" v-model="campaign.description"></el-input>
        </el-form-item>
        <el-form-item label="获奖时间">
          <el-date-picker
            v-model="campaign.releaseTime"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="封面上传">
          <input type="file" id="campaignCoverUploader" style="display: none"/>
          <el-button type="primary" icon="upload" @click="startUploadCampaignCover">封面上传</el-button>
          <el-progress :text-inside="true" :stroke-width="14" :percentage=campaignCoverProcess status="success" style="margin-top: 10px; width: 110px"></el-progress>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCampaignDialog = false">取 消</el-button>
        <el-button type="primary" @click="createCampaign">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除"
      :visible.sync="deleteCampaignDialog"
      size="small">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteCampaignDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteCampaignDialog = false; confirmDelete()">确 定</el-button>
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
        <div v-for="(img, index) in editCampaign.portfolio.imgs" :key='index'>
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
        <el-button @click="deleteImg = false; deleteImgFromCampaign()" type="danger">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  /* eslint-disable */
  import pagination from './pagination/pagination.vue'
  import presentList from './presentList/presentList.vue'
  import $ from 'jquery'
  import {campaignCreate, getCampaignById, getAllCampaign, addCampaign, campaignDelete, deleteCampaign,
    updateCampaign, updateCampaignCover, deleteImgCampaign, addImgCampaign, updateImgCampaignRank} from '../service/getData'
  import ElDialog from '../../node_modules/element-ui/packages/dialog/src/component.vue'
  export default {
    data () {
      return {
        designerId: this.$route.params.designerId,
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
        },
        imgUploadList: {
          total: 0,
          cur: '',
          success: [],
          fail: []
        },
        editCampaignDialog: false,
        addCampaignDialog: false,
        deleteCampaignDialog: false,
        addPicDialog: false,
        deleteImg: false,
        imgSelected: -1,
        camSelected: -1,
        addImgPro: 0,
        campaignCoverProcess: 0,
        deleteItem: {}
      }
    },
    components: {
      ElDialog,
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
        this.editCampaign.portfolio.imgs.forEach(item => {
          newRanks.push({
            img_id: item.img_id,
            rank: item.rank
          })
        })
        updateImgCampaignRank({id: this.editCampaign.id, imgRanks: newRanks}).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '更新顺序成功',
              type: 'success'
            })
            this.editCampaign.portfolio.imgs.sort(this.sortImgs)
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
        getAllCampaign(this.designerId, current - 1, 5).then(res => {
          if (res.code === '0') {
            this.campaigns = res.msg.campaigns
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
      async edit (item) {
        await getCampaignById(item.id).then(res => {
          console.log(res)
          this.editCampaign = res.msg
          if (res.code === '0') {
            this.editCampaignDialog = true
          }
        }).catch(err => {
          console.log(err)
        })
      },
      async confirmEdit () {
        await updateCampaign(this.editCampaign).then(res => {
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
        if (this.campaignCoverProcess !== 0) {
          await updateCampaignCover({'id': this.editCampaign.id, 'img': this.campaign.img}).then(res => {
            if (res.code !== '0') {
              this.$message({
                message: '封面上传失败',
                type: 'error'
              })
            } else {
              this.campaignCoverProcess = 0
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
        this.deleteCampaignDialog = true
        this.deleteItem = item
      },
      async confirmDelete () {
        await deleteCampaign(this.designerId, this.deleteItem.id).then(res => {
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
        await campaignDelete({"id": this.deleteItem.id}).then(res => {
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
        this.editCampaign = item
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      /**
       * Operation about campaign
       */
      startUploadCampaignCover () {
        $('#campaignCoverUploader').click()
        $('#campaignCoverUploader').change(() => {
          this.campaignCoverProcess = 100
          this.campaign.img = $('#campaignCoverUploader')[0].files[0]
        })
      },
      startEditCampaignCover () {
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
          this.sendRequestToaddImg(fileList, 0)
          $('#addImg').after($('#addImg').clone().val(''))
          $('#addImg').remove()
        })
      },
      sendRequestToaddImg (fileList, cur) {
        let timeout = 0
        this.imgUploadList.cur = fileList[cur].name
        addImgCampaign({id: this.editCampaign.id, img: fileList[cur]}).then(res => {
            if (res.code === '0') {
              this.$message({
                message: fileList[cur].name + '添加成功',
                type: 'success'
              })
              getCampaignById(this.editCampaign.id).then(res => {
                this.editCampaign = res.msg
              }).catch(err => {
                console.error(err)
              })
              this.initData()
              this.imgUploadList.success.push(fileList[cur].name)
              cur++
              setTimeout(() => this.sendRequestToaddImg(fileList, cur), 2000)
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
              setTimeout(() => this.sendRequestToaddImg(fileList, cur), 2000)
            }
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '添加失败',
              type: 'err'
            })
          })
      },
      async createCampaign () {
        if (this.campaign.title === '') {
          this.$message({
            message: '未填写名称',
            type: 'warning'
          })
          return
        } else if (this.campaign.desc === '') {
          this.$message({
            message: '未填写描述',
            type: 'warning'
          })
          return
        } else if (this.campaign.releaseTime === '') {
          this.$message({
            message: '未填写获奖时间',
            type: 'warning'
          })
          return
        } else if (this.campaignCoverProcess !== 100) {
          this.$message({
            message: '未上传图片',
            type: 'warning'
          })
          return
        }
        this.campaign.releaseTime = this.campaign.releaseTime.getTime()
        let newCampaignId = -1
        await campaignCreate(this.campaign).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            newCampaignId = res.msg.id
            addCampaign(this.designerId, newCampaignId).then(res => {
              console.log(res)
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
          this.addCampaignDialog = false
          Object.keys(this.campaign).forEach(key => {
            this.campaign[key] = ''
          })
          this.campaignCoverProcess = 0
          $('#campaignCoverUploader').after($('#campaignCoverUploader').clone().val(''))
          $('#campaignCoverUploader').remove()
        }).catch(err => {
          this.$message({
            message: '网络问题，创建失败',
            type: 'error'
          })
          console.log(err)
          this.addCampaignDialog = false
          Object.keys(this.campaign).forEach(key => {
            this.campaign[key] = ''
          })
          this.campaignCoverProcess = 0
          $('#campaignCoverUploader').after($('#campaignCoverUploader').clone().val(''))
          $('#campaignCoverUploader').remove()
        })
      },
      deleteImgFromCampaign () {
        deleteImgCampaign({'id': this.editCampaign.id, 'imgId': this.imgSelected}).then(res => {
          if (res.code === '0') {
            getCampaignById(this.editCampaign.id).then(res => {
              console.log(res)
              this.editCampaign = res.msg
            }).catch(err => {
              console.log(err)
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      async initData () {
        getAllCampaign(this.designerId, 0, 5).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.pageInfo.total = res.msg.total
            this.campaigns = res.msg.campaigns
            console.log(this.campaigns)
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

  /* 简历 */
  .biography {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }

  .biography table {
    font-size: 1.1em;
    margin: 10px auto;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
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

</style>
