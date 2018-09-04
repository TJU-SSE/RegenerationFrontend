<template>
  <header class="header regen-container">
    <router-link :to="{ name: 'Home' }" class="brand">
      REGENERATION
    </router-link>
    <ul class="header-list">
      <router-link tag="li" :to="{ name: 'Home'}" :active-class="activeClass" exact>HOME</router-link>
      <router-link tag="li" :to="{ name: 'runway'}" :active-class="activeClass" >RUNWAY</router-link>
      <router-link tag="li" :to="{ name: 'designerHome'}" :active-class="activeClass" >DESIGNER</router-link>
      <router-link tag="li" :to="{ name: 'news'}" :active-class="activeClass" >NEWS</router-link>
      <router-link tag="li" :to="{ name: 'contact'}" :active-class="activeClass" exact>ABOUT US</router-link>
    </ul>
    <a class="header-search">
      <i class="fa fa-search fa-lg" aria-hidden="true"></i>
    </a>
    <el-button type="primary" class="logout" @click="logout">登出</el-button>
  </header>
</template>

<script>
  import {LogOut} from '../service/getData'

  export default {
    data () {
      return {
        msg: 'This is news page',
        curPathName: '',
        activeClass: 'active'
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/login')
      }
    },
    methods: {
      logout () {
        LogOut().then(res => {
          console.log(res)
          this.$session.destroy()
          this.$router.push('/login')
        }).catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>

<style scoped>
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    height: 55px;
    background: linear-gradient(20deg, #43485A, #222222);
  }

  .header a{
    text-decoration: none;
  }

  .header .brand{
    color: #ec644B;
    font-size: xx-large;
    font-weight: bolder;
    line-height: 30;
  }

  .header .header-list, .header .header-search, .header .header-list li a{
    color: white;
  }

  .header .header-list{
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 0 0 10%;
    margin: 0;
    list-style: none;
    font-weight: normal;
    font-size: large;
  }

  .header .header-list li {
    position: relative;
    margin: 0 2%;
    cursor: pointer;
  }

  .header .header-list li.active{
    line-height: 2;
    border-bottom: 1px solid white;
  }

  .header .header-list li:hover a, .header .header-search:hover, .header .header-list li:hover{
    color: #d2d7d3;
  }

  .logout {
    margin-left: 30px;
  }
</style>
