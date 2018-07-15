<template>
  <div class="main-container">
    <div class="left">
      <h1>{{designer.name}}</h1>
      <div class="detail">
        <img :src="designer.img_url" alt="photo">
        <p></p>
        <div class="ranking">
          <h4>首页图片的排名</h4>
          <p>{{designer.rank}}</p>
        </div>
        <div class="agency">
          <h4>社交</h4>
          <ul>
            <li>{{designer.social}}</li>
          </ul>
          <h4>零售店</h4>
          <ul>
            <li>{{designer.extraBiography}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="tabs">
        <button @click="tabControl=1" :class="[tabControl===1 ? 'active':'']">资料</button>
        <button @click="tabControl=2" :class="[tabControl===2 ? 'active':'']">品牌露出</button>
        <button @click="tabControl=3" :class="[tabControl===3 ? 'active':'']">合作</button>
        <button @click="tabControl=4" :class="[tabControl===4 ? 'active':'']">lookout+大片</button>
      </div>
      <div class="pages">
        <transition name="slide-fade">
          <bioItem v-if="tabControl===1" :designer="designer"></bioItem>
        </transition>
        <transition name="slide-fade">
          <branding v-if="tabControl===2" :designer="designer"></branding>
        </transition>
        <transition name="slide-fade">
          <outer v-if="tabControl===3" :designer="designer"></outer>
        </transition>
        <transition name="slide-fade">
          <outlook v-if="tabControl===4"></outlook>
        </transition>
      </div>
      <el-button-group class="edit">
        <el-button type="warning" icon="edit" @click="editDialog=true">修改</el-button>
        <el-button type="danger" icon="delete" @click="deleteDialog=true">删除</el-button>
      </el-button-group>
    </div>

    <el-dialog
      title="删除"
      :visible.sync="deleteDialog"
      size="small">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialog = false; deleteDesigner()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑"
      :visible.sync="editDialog"
      size="full">
      <el-form ref="form" :model="designer" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="designer.name"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-input v-model="designer.identity"></el-input>
        </el-form-item>
        <el-form-item label="排名">
          <el-input v-model="designer.rank"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="designer.address"></el-input>
        </el-form-item>
        <el-form-item label="社交">
          <el-input v-model="designer.social"></el-input>
        </el-form-item>
        <el-form-item label="Biography">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入Biography"
            v-model="designer.biography">
          </el-input>
        </el-form-item>
        <el-form-item label="额外信息">
          <el-input v-model="designer.extraBiography"></el-input>
        </el-form-item>
        <el-form-item label="修改封面">
          <input type="file" style="display: none" id="editDesignerCoverUploader">
          <el-button type="primary" icon="upload" @click="uploadNewCover">上传新封面(不修改就别传)</el-button>
        </el-form-item>
        <el-form-item label="修改LOGO">
          <input type="file" style="display: none" id="editDesignerLogoUploader">
          <el-button type="primary" icon="upload" @click="uploadNewLogo">上传新LOGO(不修改就别传)</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editDialog = false; editDesigner()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import bioItem from './DesignerProCampaign.vue'
  import branding from './DesignerProBranding.vue'
  import outer from './DesignerProCooperation.vue'
  import outlook from './DesignerProOutlook.vue'
  import $ from 'jquery'
  import {getDesignerById, editDesigner, updateDesignerRanks, designerDelete, updateLogo, updateCover} from '../service/getData'

  var pinyin = require('pinyin')

  export default {
    data () {
      return {
        title: '设计师Profile',
        designerId: this.$route.params.designerId,
        tabControl: 1,
        designer: {
          id: -1,
          biography: '',
          extraBiography: '',
          address: '',
          identity: '',
          name: '',
          rank: '',
          social: '',
          viewcount: '',
          first: '',
          cover: '',
          logo: ''
        },
        editDialog: false,
        deleteDialog: false
      }
    },
    components: {
      bioItem,
      branding,
      outer,
      outlook
    },
    methods: {
      /**
       * Upload cover for designer
       */
      uploadDesignerCover () {
        $('#designerCoverUploader').click()
        $('#designerCoverUploader').change(() => {
          this.form.img = $('#designerCoverUploader')[0].files[0]
        })
      },
      deleteDesigner () {
        /* eslint-disable */
        designerDelete({"id": this.designerId}).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.$router.push('/designer')
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
      },
      editDesigner () {
        this.designer['first'] = pinyin(this.designer.name)[0][0][0]
        editDesigner(this.designer).then(res => {
          if (res.code === '0') {
            /* eslint-disable */
            updateDesignerRanks({"ranks": [{"id": this.designerId, "rank": this.designer.rank}]}).then(res => {
              console.log(res)
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }).catch(err => {
              console.log(err)
              this.$message({
                message: '网络原因，修改失败',
                type: 'error'
              })
            })
          } else {
            this.$message({
              message: '网络原因，修改失败',
              type: 'error'
            })
          }
        }).catch(err => {
          this.$message({
            message: '网络原因，修改失败',
            type: 'error'
          })
          console.log(err)
        })
        if (this.designer.logo !== '') {
          updateLogo({id: this.designer.id, img: this.designer.logo}).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        }
        if (this.designer.cover !== '') {
          updateCover({id: this.designer.id, img: this.designer.cover}).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        }
      },
      uploadNewCover () {
        $('#editDesignerCoverUploader').click()
        $('#editDesignerCoverUploader').change(() => {
          this.designer.cover = $('#editDesignerCoverUploader')[0].files[0]
        })
      },
      uploadNewLogo () {
        $('#editDesignerLogoUploader').click()
        $('#editDesignerLogoUploader').change(() => {
          this.designer.logo = $('#editDesignerLogoUploader')[0].files[0]
        })
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
      }
    },
    mounted () {
      document.title = this.title
      getDesignerById(this.designerId).then(res => {
        console.log(res)
        if (res.code === '0') {
          this.designer = res.msg
        }
      }).catch(err => {
        console.log(err)
      })
    },
    watch: {
      tabControl: function (newVal) {
        console.log(newVal)
      }
    }
  }
</script>

<style scoped>

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(10px);
    opacity: 0;
  }

  .main-container {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    width: 80%;
    margin: 20px auto;
  }

  /* left */
  .left {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
  }

  .detail {
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    width: 90%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
  }

  .detail img {
    width: 90%;
    height: auto;
  }

  .ranking, .agency {
    align-self: flex-start;
    margin-left: 10px;
  }

  /* right */
  .right {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    width: 75%;
    margin-top: 65px;
  }

  .tabs {
    align-self: flex-start;
    margin-left: 10px;
  }

  .tabs button {
    position: relative;
    float: left;
    background-color: #e5e5e5;
    border-bottom: 1px solid #cacaca!important;
    border-left: 0 solid;
    border-color: rgba(255,255,255,.5);
    padding: 10px;
    margin-left: 1px;
  }

  button.active {
    background-color: white;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #fff!important;
  }

  .hide {
    display: none;
  }

  .pages {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 50px;
  }

  .top {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #42495B;
    color: white;
    text-align: center;
    position: fixed;
    bottom: 2%;
    right: 5%;
    cursor: pointer;
    z-index: 200000;
  }

  .top p {
    margin-top: 10px;
  }

  .edit {
    position: absolute;
    top: 80px;
    right: 50px;
  }
</style>
