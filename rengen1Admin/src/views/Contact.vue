<template>
  <div class="main-container">
    <el-button type="default" icon="edit" style="position: absolute;left: 20px;top: 70px;" @click="addWorkerDialog = true">添加工作人员</el-button>
    <el-button type="default" icon="edit" style="position: absolute;left: 150px;top: 70px;" @click="editContactDialog = true">修改基本内容</el-button>
    <div class="left">
      <vue-markdown class="markdown" v-if="contact.desc !== ''" style="font-family: qingkebenyue">{{contact.desc}}</vue-markdown>
      <div class="photos">
        <div v-for="w in workers">
          <img :src="w.img_url" alt="" @click="selectWorker = w;uploadPicDialog = true">
          <h2>{{w.name}}</h2>
          <h3>{{w.identity}}</h3>
          <h4>{{w.email}}</h4>
        </div>
      </div>
    </div>
    <div class="right">
      <h3 style="padding-left: 15px; color: red">SHANGHAI 上海</h3>
      <div class="contacts">
        <div>
          <strong>电话:</strong>
          <p>{{contact.phone}}</p>
        </div>
        <div>
          <strong>传真:</strong>
          <p>{{contact.fax}}</p>
        </div>
      </div>
      <div class="location">
        <p>{{contact.address}}</p>
      </div>
      <div class="links">
        <a :href="contact.link" target="_blank" style="cursor: pointer">{{contact.link}}</a>
      </div>
      <div class="map">
        <img src="../../static/img/location.png" alt="">
      </div>
      <h3 style="padding-left: 15px; color: red">LONDON 伦敦</h3>
      <div class="contacts">
        <div>
          <strong>电话:</strong>
          <p>021-63232306(SH)</p>
        </div>
        <div>
          <strong>邮箱:</strong>
          <p>INDO@REGEN.ORG.CN</p>
        </div>
      </div>
    </div>

    <el-dialog
      title="添加工作人员"
      :visible.sync="addWorkerDialog"
      size="large">
      <el-form :model="worker" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="worker.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="worker.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="worker.identity"></el-input>
        </el-form-item>
        <el-form-item label="位置顺序">
          <el-input v-model="worker.rank" type="number"></el-input>
        </el-form-item>
        <el-form-item label="照片">
          <input type="file" style="display: none" id="picUploader">
          <el-button type="primary" icon="upload" @click="startUploadPic">点击上传</el-button>
          <el-progress :text-inside="true" :stroke-width="14" :percentage=uploadProcess status="success" style="margin-top: 10px; width: 110px"></el-progress>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addWorkerDialog = false">取 消</el-button>
        <el-button @click="addWorkerDialog = false; confirmCreate();" type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改工作人员"
      :visible.sync="editWorkerDialog"
      size="large">
      <el-form :model="selectWorker" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="selectWorker.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="selectWorker.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="selectWorker.identity"></el-input>
        </el-form-item>
        <el-form-item label="位置顺序">
          <el-input v-model="selectWorker.rank" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editWorkerDialog = false">取 消</el-button>
        <el-button @click="editWorkerDialog = false; confirmEdit();" type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改基本信息"
      :visible.sync="editContactDialog"
      size="large">
      <el-form :model="contact" label-width="120px">
        <el-form-item label="地址">
          <el-input v-model="contact.address"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="contact.phone" type="number"></el-input>
        </el-form-item>
        <el-form-item label="传真">
          <el-input v-model="contact.fax"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="contact.link"></el-input>
        </el-form-item>
        <el-form-item label="LOGO图片">
          <input type="file" id="logoPicUploader" style="display: none">
          <el-button type="primary" icon="upload" @click="startUploadLogoPic">点击上传</el-button>
          <div class="img-box">
            <p>![]({{logoUrl}})</p>
          </div>
        </el-form-item>
        <el-form-item label="简介">
          <markdownEditor ref="markdown" v-model="contact.desc"></markdownEditor>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editContactDialog = false">取 消</el-button>
        <el-button @click="editContactDialog = false; confirmUpdateContact();" type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="上传新照片"
      :visible.sync="uploadPicDialog"
      size="small">
      <input type="file" style="display: none" id="editPic">
      <el-button type="primary" icon="upload" @click="startEditPic" size="small">上传新照片</el-button>
      <el-progress :text-inside="true" :stroke-width="14" :percentage=uploadProcess status="success" style="margin-top: 10px; width: 110px"></el-progress>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadPicDialog = false">取 消</el-button>
        <el-button @click="uploadPicDialog = false; confirmCover();" type="primary">确 认</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除"
      :visible.sync="deleteDialog"
      size="mini">
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button @click="deleteDialog = false; confirmDelete();" type="primary">确 认</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

  import VueMarkdown from '../../node_modules/vue-markdown'
  import markdownEditor from 'vue-simplemde/markdown-editor.vue'
  import $ from 'jquery'
  import {workerCreate, getAllWorkers, updateWorker, updateWorkerCover, workerDelete, getContact, updateContact, uploadImg} from '../service/getData'
  require('../../node_modules/github-markdown-css/github-markdown.css')

  export default {
    data () {
      return {
        title: '联系我们',
        contact: {
          phone: '',
          fax: '',
          link: '',
          desc: '',
          address: ''
        },
        logoUrl: '',
        addWorkerDialog: false,
        editWorkerDialog: false,
        uploadPicDialog: false,
        deleteDialog: false,
        editContactDialog: false,
        selectWorker: {
          id: '',
          name: '',
          email: '',
          identity: '',
          rank: 0
        },
        worker: {
          img: '',
          name: '',
          email: '',
          identity: '',
          rank: 0
        },
        uploadProcess: 0,
        photos: [
          {
            name: 'John Shegda',
            desc: 'President, Photography and Art Directors',
            email: 'xxxxxx@gmail.com',
            imgUrl: '../static/img/img1.jpg'
          },
          {
            name: 'John Shegda',
            desc: 'President, Photography and Art Directors',
            email: 'xxxxxx@gmail.com',
            imgUrl: '../static/img/img2.jpg'
          },
          {
            name: 'John Shegda',
            desc: 'President, Photography and Art Directors',
            email: 'xxxxxx@gmail.com',
            imgUrl: '../static/img/img1.jpg'
          },
          {
            name: 'John Shegda',
            desc: 'President, Photography and Art Directors',
            email: 'xxxxxx@gmail.com',
            imgUrl: '../static/img/img2.jpg'
          },
          {
            name: 'John Shegda',
            desc: 'President, Photography and Art Directors',
            email: 'xxxxxx@gmail.com',
            imgUrl: '../static/img/img1.jpg'
          },
          {
            name: 'John Shegda',
            desc: 'President, Photography and Art Directors',
            email: 'xxxxxx@gmail.com',
            imgUrl: '../static/img/img2.jpg'
          }
        ],
        workers: [
          {
            id: '',
            name: '',
            identity: '',
            email: '',
            img_url: '',
            rank: 0
          }
        ]
      }
    },
    components: {
      VueMarkdown,
      markdownEditor
    },
    methods: {
      startUploadPic () {
        $('#picUploader').click()
        $('#picUploader').change(() => {
          this.uploadProcess = 100
          this.worker.img = $('#picUploader')[0].files[0]
        })
      },
      startUploadLogoPic () {
        $('#logoPicUploader').click()
        $('#logoPicUploader').change(() => {
          uploadImg({'img': $('#logoPicUploader')[0].files[0]}).then(res => {
            if (res.code === '0') {
              this.logoUrl = res.msg.url
              $('#logoPicUploader').after($('#logoPicUploader').clone().val(''))
              $('#logoPicUploader').remove()
            }
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '网络原因，上传失败',
              type: 'error'
            })
          })
        })
      },
      confirmCreate () {
        if (this.worker.name === '') {
          this.$message({
            message: '请填写名称',
            type: 'warning'
          })
          return
        } else if (this.worker.email === '') {
          this.$message({
            message: '请填写邮箱',
            type: 'warning'
          })
          return
        } else if (this.uploadProcess === 0) {
          this.$message({
            message: '请上传照片',
            type: 'warning'
          })
          return
        }
        workerCreate(this.worker).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '创建成功',
              type: 'success'
            })
            this.uploadProcess = 0
            $('#picUploader').after($('#picUploader').clone().val(''))
            $('#picUploader').remove()
            this.worker = {}
          } else {
            this.$message({
              message: '网络原因创建失败',
              type: 'success'
            })
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '网络原因创建失败',
            type: 'success'
          })
        })
      },
      confirmEdit () {
        updateWorker(this.selectWorker).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '网络原因，修改失败',
              type: 'error'
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
      startEditPic () {
        $('#editPic').click()
        $('#editPic').change(() => {
          this.uploadProcess = 100
        })
      },
      confirmCover () {
        /*eslint-disable*/
        updateWorkerCover({"id": this.selectWorker.id, "img": $('#editPic')[0].files[0]}).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.uploadProcess = 0
            this.initData()
          } else {
            this.$message({
              message: '网络原因，修改失败',
              type: 'error'
            })
            this.uploadProcess = 0
          }
          $('#editPic').after($('#editPic').clone().val(''))
          $('#editPic').remove()
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '网络原因，修改失败',
            type: 'error'
          })
        })
      },
      confirmDelete () {
        workerDelete({"id": this.selectWorker.id}).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.initData()
          } else {
            this.$message({
              message: '网络原因，删除失败',
              type: 'error'
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
      confirmUpdateContact () {
        updateContact(this.contact).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.initData()
          } else {
            this.$message({
              message: '网络原因，修改失败',
              type: 'error'
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
      async initData () {
        getContact().then(res => {
          console.log(res)
          this.contact = res.msg
        }).catch(err => {
          console.log(err)
        })
        getAllWorkers(0, 10000).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.workers = res.msg.workers
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
    mounted () {
      document.title = this.title
      this.initData()
    }
  }
</script>

<style scoped>
  .main-container {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    width: 90%;
    height: 700px;
    align-items: flex-start;
    margin: 60px auto;
  }

  /* left */
  .left {
    width: 75%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    margin-right: 8%;
  }

  .markdown p {
    font-size: 1.5em;
    text-indent: 2em;
  }

  .photos {
    margin-top: 60px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .photos > div {
    width: 250px;
  }

  .photos img {
    height: 100px;
    width: auto;
    cursor: pointer;
    transition: .5s;
  }

  .photos img:hover {
    transform: scale(1.1, 1.1);
  }

  .photos h2 {
    font-size: 1.5em;
  }

  .photos h3 {
    font-size: 1.0em;
    font-style: italic;
  }

  .photos h4 {
    font-size: 0.8em;
  }

  /* right */
  .right {
    width: 30%;
    border-left: 1px solid gray;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }

  .contacts > div {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
  }

  .contacts > div > strong {
    flex-grow: 2;
    font-size: 1.6em;
    padding-left: 15px;
    margin-top: 3px;
  }

  .contacts > div > p {
    flex-grow: 1;
    font-size: 1.4em;
    text-align: right;
    padding-right: 4%;
  }

  .location {
    margin-top: 20px;
    padding-left: 5px;
    font-size: 1.5em;
    font-family: 'Helvetica Neue Thin';
  }

  .location > p {
    color: #989FBF;
    text-align: center;
  }

  .links {
    margin-top: 30px;
    padding-left: 5px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .links > a {
    text-decoration: none;
    color: black;
    font-size: 1.2em;
    margin: 0 auto;
    width: 100%;
    text-align: center;
  }

  .links > div {
    margin: 20px auto 20px auto;
  }

  .links > div > img{
    width: 30px;
    margin-left: 20px;
    cursor: pointer;
  }

  .map > img {
    max-width: 300px;
    margin-left: 25px;
  }

  @media screen and (max-width: 835px){
    .links > a {
      font-size: 0.5em;
    }

    .photos  img {
      width: 400px;
      height: auto;
    }

    .photos h2 {
      font-size: 1.8em;
    }

    .photos h3 {
      font-size: 1.6em;
      font-style: italic;
    }

    .photos h4 {
      font-size: 1.2em;
    }
  }

  @media (max-device-width: 835px) {
    .links > a {
      font-size: 0.5em;
    }

    .photos > div {
      width: 300px;
    }

    .photos  img {
      width: 450px;
      height: auto;
    }

    .photos h2 {
      font-size: 1.8em;
    }

    .photos h3 {
      font-size: 1.6em;
      font-style: italic;
    }

    .photos h4 {
      font-size: 1.2em;
    }
  }

</style>
