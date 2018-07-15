<template>
  <div class="header">
    <div class="social-icon">
      <img src="../../static/icon/facebook.svg" alt="facebook">
      <img src="../../static/icon/ins.svg" alt="ins">
      <img src="../../static/icon/wechat.svg" alt="微信">
      <img src="../../static/icon/weibo.svg" alt="新浪微博">
      <img src="../../static/icon/qq.svg" alt="QQ">
    </div>
    <div class="big-title">
      <span>REGENERATION</span>
    </div>
    <div class="navigation">
      <router-link to="/Home">HOME</router-link>
      <router-link :to="{ name: 'runway'}" exact>RUNWAY</router-link>
      <router-link :to="{ name: 'designerHome' }">DESIGNER</router-link>
      <router-link :to="{ name: 'news'}" exact>NEWS</router-link>
      <router-link :to="{ name: 'contact'}" exact>ABOUT US</router-link>
      <div>
        <p>SUBSCRIBE</p>
        <div class="search">
          <img :class="{'img-active' : startSearch}" src="../../static/icon/search.svg" alt="搜索" @click="start">
          <input type="text" name="search" :class="{'input-active' : startSearch}" placeholder="..." v-model="searchValue" @keyup.enter="submit"/>
        </div>
      </div>
    </div>
    <el-button type="primary" class="logout" @click="logout">登出</el-button>
  </div>
</template>

<script>

  import {LogOut} from '../service/getData'

  export default {
    data () {
      return {
        startSearch: false
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
      }
    },
    methods: {
      test () {
        console.log('test')
      },
      start (e) {
        this.startSearch = !this.startSearch
      },
      submit (e) {
        console.log(this.searchValue)
        this.startSearch = false
        this.searchValue = ''
      },
      logout () {
        LogOut().then(res => {
          this.$session.destroy()
          this.$router.push('/login')
        }).catch(e => {
          console.log(e)
          this.$message({
            message: '登出失败',
            type: 'error'
          })
        })
      }
    }
  }
</script>

<style scoped>
  /* header */
  .header {
    height: 300px;
    background: linear-gradient(70deg, white, #433B38 80%, #1E0A02);
  }

  .social-icon > img {
    padding: 10px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .big-title {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: center;
  }

  .big-title > span {
    padding: 10px;
    color: #E43F37;
    font-size: 8.5em;
    text-shadow: black -5px 5px 5px;
  }

  .navigation {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    width: 40%;
    margin: 0 auto;
  }

  .navigation > a {
    text-decoration: none;
    font-size: 1.5em;
    color: white;
    padding: 5px;
    margin: 0 auto;
  }

  .navigation > div {
    position: absolute;
    right: 4%;
    font-size: 1em;
    color: white;
  }

  .search > img {
    position: relative;
    width: 30px;
    height: 30px;
    transition: 1s;
    -webkit-transition: 1s;
    -moz-transition: 1s;
    -o-transition: 1s;
    cursor: pointer;
  }

  .search > input {
    display: none;
    position: absolute;
    top: 40px;
    left: 10px;
    width: 80px;
    border-width: 0 0 2px;
    background: none;
    transition: 1s;
  }

  .img-active {
    transform: translateX(-20px);
    -webkit-transform: translateX(-20px);
    -moz-transform: translateX(-20px);
    -o-transform: translateX(-20px);
  }

  .input-active {
    display: block !important;
  }

  /* adapt big screen */
  @media screen and (min-width: 1500px){

    .big-title > span {
      padding: 10px;
      font-size: 8.5em;
    }

    /* news first */
    .news-first > div > img {
      width: 60%;
      height: auto;
      max-height: 700px;
    }
  }

  /* adapt small screen */
  @media screen and (max-width: 1200px) {
    .big-title > span {
      padding: 6px;
      font-size: 6.5em;
    }
  }

  .logout {
    position: absolute;
    right: 20px;
    top: 40px;
  }
</style>

