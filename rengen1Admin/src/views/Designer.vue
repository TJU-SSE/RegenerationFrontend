<template>
  <main class="regen-container">
    <el-button type="default" icon="plus" style="position: absolute;float: right; margin: 30px" @click="addDialog = true">添加设计师</el-button>
    <div class="designer-wrap" v-for="designer in designers">
      <div class="designer-img-wrap">
        <img :src="designer.img_url"  @click="onImgClick($event,designer.id)">
      </div>
      <p class="designer-logo">
        <img :src="designer.title_img_url"  @click="onImgClick($event,designer.id)">
      </p>
    </div>

    <el-dialog
      title="添加"
      :visible.sync="addDialog"
      size="full">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-input v-model="form.identity"></el-input>
        </el-form-item>
        <el-form-item label="排名">
          <el-input v-model="form.rank"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="社交">
          <el-input v-model="form.social"></el-input>
        </el-form-item>
        <el-form-item label="Biography">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入Biography"
            v-model="form.biography">
          </el-input>
        </el-form-item>
        <el-form-item label="额外信息">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入额外信息"
            v-model="form.extraBiography"></el-input>
        </el-form-item>
        <el-form-item label="头像上传">
          <input type="file" style="display: none" id="designerCoverUploader">
          <el-button type="primary" icon="upload" @click="uploadDesignerCover">点击上传</el-button>
        </el-form-item>
        <el-form-item label="Logo上传">
          <input type="file" style="display: none;" id="designerLogoUploader">
          <el-button type="primary" icon="upload" @click="uploadDesignerLogo">点击上传</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="createDesigner">确 定</el-button>
      </span>
    </el-dialog>

  </main>

</template>

<script>
  /* eslint-disable */
  import {designerCreate, getAllDesigners, updateLogo} from '../service/getData'
  import $ from 'jquery'

  var pinyin = require('pinyin')

  export default {
    name: 'news',
    data () {
      return {
        title: 'DESIGNER',
        designers: [],
        addDialog: false,
        uploadProcess: 0,
        form: {
          name: '',
          desc: '',
          rank: '',
          identity: '',
          social: '',
          address: '',
          biography: '',
          extraBiography: '',
          img: '',
          logo: '',
          first: ''
        }
      }
    },
    methods: {
      onImgClick (event, designerId) {
        this.$router.push({name: 'designerPro', params: {designerId: designerId}})
      },
      uploadDesignerCover () {
        $('#designerCoverUploader').click()
        $('#designerCoverUploader').change(() => {
          this.form.img = $('#designerCoverUploader')[0].files[0]
          this.uploadProcess = 30
          setTimeout(function () {
            this.uploadProcess = 100
          }, 100)
        })
      },
      uploadDesignerLogo () {
        $('#designerLogoUploader').click()
        $('#designerLogoUploader').change(() => {
          this.form.logo = $('#designerLogoUploader')[0].files[0]
        })
      },
      async createDesigner () {
        if (this.form.name === '') {
          this.$message({
            message: '未填写姓名',
            type: 'warning'
          })
          return
        } else if (this.form.identity === '') {
          this.$message({
            message: '未填写身份',
            type: 'warning'
          })
          return
        } else if (this.form.social === '') {
          this.$message({
            message: '未填写社交信息',
            type: 'warning'
          })
          return
        } else if (this.form.address === '') {
          this.$message({
            message: '未填写地址',
            type: 'warning'
          })
          return
        }
        this.addDialog = false
        this.form.first = pinyin(this.form.name)[0][0][0]
        let d_id = -1
        await designerCreate(this.form).then(res => {
          console.log(res)
          if (res.code === '0') {
            d_id = res.msg.id
            this.$message({
              message: '创建成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '网络原因，创建失败',
              type: 'error'
            })
          }
        }).catch(err => {
          this.$message({
            message: '网络原因，创建失败',
            type: 'error'
          })
          console.log(err)
        })

        await updateLogo({id: d_id, img: this.form.logo}).then(res => {
          Object.keys(this.form).forEach(key => {
            this.form[key] = ''
          })
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
        this.uploadProcess = 0
        $('#designerCoverUploader').after($('#designerCoverUploader').clone().val(''))
        $('#designerCoverUploader').remove()
        $('#designerLogoUploader').after($('#designerLogoUploader').clone().val(''))
        $('#designerLogoUploader').remove()
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
      }
    },
    mounted () {
      document.title = this.title
      getAllDesigners(0, 10000).then(res => {
        console.log(res)
        if (res.code === '0') {
          this.designers = res.msg.designers
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style scoped>
  .designer-container {
    width: 70%;
    margin: 0 auto;
  }

  .designer-wrap {
    display: flex;
  }

  .designer-img-wrap img, .designer-name span {
    cursor: pointer;
  }

  .designer-img-wrap {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
  }

  .designer-img-wrap img {
    margin: 10px 1%;
    height: 400px;
  }

  .designer-logo {
    width: 85%;
    position: relative;
    font-size: 3em;
  }
  .designer-logo img {
    position: relative;
    margin: 7% 1%;
    height: 250px;
    max-width: 90%;
    cursor: pointer;
  }
</style>
