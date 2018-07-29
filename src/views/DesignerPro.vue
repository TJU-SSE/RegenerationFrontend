<template>
  <el-container>
    <el-header height="150px">{{designer.name}}</el-header>
    <el-container>
      <el-aside width="35%">
        <div class="left">
          <div class="detail">
            <img :src="designer.img_url" alt="photo">
            <p></p>
            <div class="ranking">
            </div>
            <div class="agency" align="left">
              <p>E-mail:{{designer.mail}}</p>
              <p>Fax:{{designer.fax}}</p>
              <p>Tel:{{designer.tel}}</p>
              <p>Link:{{designer.link}}</p>
            </div>
          </div>
        </div>
      </el-aside>
      <el-main>
        <div class="right">
          <el-tabs type="border-card" :stretch="true" class="content">
            <el-tab-pane label="PROFILE">
              <transition name="slide-fade">
                <bioItem :designer="designer"></bioItem>
              </transition>
            </el-tab-pane>
            <el-tab-pane label="YIRENHEZUO">
              <transition name="slide-fade">
                <yirenhezuo/>
              </transition>
            </el-tab-pane>
            <el-tab-pane label="KUAIJIEHEZUO">
              <transition name="slide-fade">
                <outer :designer="designer"></outer>
              </transition>
            </el-tab-pane>
            <el-tab-pane label="WORK">
              <transition name="slide-fade">
                <outlook :designer="designer"></outlook>
              </transition>
            </el-tab-pane>
          </el-tabs>
          <div class="pages">            
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
  <!-- <div class="main-container">
    <div class="top">
      <h1>{{designer.name}}</h1>
    </div>
    <div class="left">
      <h1>{{designer.name}}</h1>
      <div class="detail">
        <img :src="designer.img_url" alt="photo">
        <p></p>
        <div class="ranking">
        </div>
        <div class="agency">
          <h4>社交</h4>
          <ul>
            <li>
              <img src="../../static/icon/social-rss.svg" alt="" @click="toSocialSite(designer.social)" style="cursor: pointer">
            </li>
          </ul>
          <h4>其他</h4>
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
        <button @click="tabControl=4" :class="[tabControl===4 ? 'active':'']">look book</button>
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
          <outlook v-if="tabControl===4" :designer="designer"></outlook>
        </transition>
      </div>
    </div>
  </div> -->
</template>

<script>
  import bioItem from './DesignerProCampaign.vue'
  import branding from './DesignerProBranding.vue'
  import outer from './DesignerProCooperation.vue'
  import outlook from './DesignerProOutlook.vue'
  import {getDesignerById} from '../service/getData'
  import yirenhezuo from './yirenhezuo.vue'

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
          mail: '12345@gmail.com',
          fax: '12345678',
          tel: '12345678',
          link: 'StevenLee.uk'
        },
        editDialog: false,
        deleteDialog: false
      }
    },
    components: {
      bioItem,
      branding,
      outer,
      outlook,
      yirenhezuo
    },
    methods: {
      toSocialSite (url) {
        window.location.href = url
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

  /*@font-face {*/
    /*font-family: lantinghei;*/
    /*src: url('../../static/fonts/Arial.ttf');*/
    /*!*url('../../static/fonts/Arial.ttf');*!*/
  /*}*/
  .el-header, .el-footer {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 110px;
    font-size: 48px;
  }
  
  .el-aside {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 20px;
    padding-left: 6%;
  }
  
  .el-main {
    background-color: white;
    color: #333;
    text-align: left;
    line-height: 30px;
    padding-left: 6%;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }

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
    font-family: "Lantinghei SC";
  }

  .top {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: column;
    width: 100%
  }

  .content {
    background-color: #d61518;
    color: black;
  }

  /* left */
  .left {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    width: 80%
  }

  .detail {
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    width: 90%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
  }

  .detail img {
    width: 90%;
    height: auto;
  }

  .ranking, .agency {
    align-self: flex-start;
    align-items: left;
    margin-left: 10%;
    font-size: 14px
  }

  /* right */
  .right {
    flex-direction: column;
    align-items: center;
    min-width: 60%;
    max-width: 80%
  }

  .tabs {
    align-self: flex-start;
    margin-left: 10px;
  }

  .tabs button {
    position: relative;
    float: left;
    background-color: #e5e5e5;
    border-radius: 0;
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

  /* adapt small screen */
  @media screen and (max-width: 1200px){
    .main-container {
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin: 20px auto;
    }

    .left {
      width: 50%;
    }

    .left h1 {
      margin-left: -40px;
    }
  }
</style>

<style>
  .el-tabs__item {
    background-color: black;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: black !important;
    background-color: #d61518 !important;
    border-left-color: #d61518 !important;
  }
  .el-tabs--border-card>.el-tabs__header .el-tabs__item {
    color: #d61518 !important;
  }
</style>
