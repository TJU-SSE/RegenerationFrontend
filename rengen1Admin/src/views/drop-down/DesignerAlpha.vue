<template>
  <div class="alpha-container">
    <ul id="drop">
      <li v-for="item in opts">
        <ul id="main-content" :id=item.head>
          <li class="list-item list-header">{{item.head}}</li>
          <li v-for="show in item.items" class="list-item"><router-link :to="{name: 'designerPro', params: {designerId: show.id}}">{{show.name}}</router-link></li>
        </ul>
      </li>
    </ul>
    <ul class="nav">
      <li v-for="char in alphas" @click="jump(char)">{{char}}</li>
    </ul>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    data () {
      return {
        alphas: [
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
          'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
          'Y', 'Z'
        ],
        top: 0
      }
    },
    props: ['opts'],
    methods: {
      jump (char) {
        $('#drop').scrollTop($('#' + char).offset().top - $('#drop').offset().top + $('#drop').scrollTop())
      }
    }
  }
</script>

<style scoped>
  .alpha-container {
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
  }

  a {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  ul {
    background-color: white;
  }

  i {
    float: right;
    margin: 15px 5px 15px 0;
  }
  #drop {
    display: block;
    position: absolute;
    border: 1px solid darkgray;
    height: 700px;
    width: 300px;
    overflow-y: auto;
    /*top: 65px;*/
  }

  li {
    text-align: left;
    padding: 5px;
  }

  .list-header {
    margin: 3px 0;
    font-weight: bold;
  }

  .list-item {
    width: 100%;
    letter-spacing: .1em;
    color: #333;
    font-family: "FranklinGothic", Helvetica, sans-serif;
    font-size: 18px;
  }

  a {
    color: black;
    padding-left: 2px;
    text-decoration: none !important;
  }

  /* 侧边导航栏 */
  .nav {
    display: block;
    position: relative;
    border-left: 1px solid #DCDCD8;
    padding:10px;
    font-size: 0.5em;
    top: 5px;
    right: -215px;
    max-height: 490px;
    overflow-y: auto;
  }

  .nav > li {
    padding: 0px;
    font-size: 1.5em;
    cursor: pointer;
  }

  /* For iphone 5 */
  @media (min-device-width: 320px) and (max-device-width: 568px){
    #drop {
      width: 200px;
      top:80px;
    }

    .nav {
      right: -160px;
      font-size: 1.2em;
    }
  }

  /* For ipad pro */
  @media (min-device-width: 568px) and (max-device-width: 1100px) {
    #drop {
      width: 200px;
    }

    .nav {
      right: -180px;
    }
  }

  @media (min-width: 1500px) {
    #drop {
      width: 360px;
    }

    .nav {
      right: -320px;
    }
  }

</style>
