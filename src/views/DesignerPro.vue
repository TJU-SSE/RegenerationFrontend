<template>
  <div class="main-container">
    <div class="left">
      <h1>{{designer.name}}</h1>
      <div class="detail">
        <img :src="designer.img_url" alt="photo">
        <p></p>
        <div class="ranking">
          <!--<h4>首页图片的排名</h4>-->
          <!--<p>{{designer.rank}}</p>-->
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
  </div>
</template>

<script>
  import bioItem from './DesignerProCampaign.vue'
  import branding from './DesignerProBranding.vue'
  import outer from './DesignerProCooperation.vue'
  import outlook from './DesignerProOutlook.vue'
  import {getDesignerById} from '../service/getData'

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
          first: ''
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

  /* left */
  .left {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
  }

  .left h1 {
    align-self: flex-start;
    margin-left: 15px;
    font-family: Arial;
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
    width: 60%;
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
