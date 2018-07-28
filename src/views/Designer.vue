<template>
  <div class="designer-container">
    <DesignerSwiper :imgs="designers.slice(0, 5)"></DesignerSwiper>
      <el-col :span="2"><p></p></el-col> 
      <el-col :span="20">
      <div class="followers">
        
        
        <div v-for="(item, index) in designers" :key="index" class="follower">
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
          <el-row>
           <el-col :span="1"><p></p></el-col> 
           <el-col :span="6"> 
              <img :src="item.img_url" class="avatar" :border="false"/> 
           </el-col>
           <el-col :span="1"><p></p></el-col>   
          </el-row>
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
          <el-row><p>{{item.name}}</p></el-row>
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
        </div>        
      </div>
      </el-col>   
      <el-col :span="2"><p></p></el-col> 

    <!-- <div class="designer-wrap" v-for="designer in designers">
      <div class="designer-img-wrap">
        <img :src="designer.img_url"  @click="onImgClick($event,designer.id)">
      </div>
      <p class="designer-logo">
        <img :src="designer.title_img_url"  @click="onImgClick($event,designer.id)">
      </p>
    </div> -->
  </div>

</template>

<script>
  import {getAllDesigners} from '../service/getData'
  import DesignerSwiper from './swipers/DesignerSwiper.vue'
  export default {
    name: 'news',
    data () {
      return {
        title: 'DESIGNER',
        designers: []
      }
    },
    components: {
      DesignerSwiper
    },
    methods: {
      onImgClick (event, designerId) {
        this.$router.push({name: 'designerPro', params: {designerId: designerId}})
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
  .followers {
    display: flex;
    flex-wrap: wrap;
    border: 0px solid #dcdfe6;
    border-radius: 4px;
    padding: 20px 15px 15px;
    justify-content: space-around;
    font-weight: 300;
    letter-spacing: 1px;
  }
  .follower {
    text-align: center;
    font-size: 12px;
    margin: 5px;
  }  
  .avatar {
    width: 250px;
    height: 250px;

    display: inline-block;
    /* background: url('../assets/defaultAvatar2.jpg'); */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border: 10px solid black;
    border-radius: 50%;
  }
  .dname{
    align-items: center;
  }
</style>
