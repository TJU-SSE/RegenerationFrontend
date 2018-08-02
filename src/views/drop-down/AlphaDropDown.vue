<template>
  <div class="drop-down" @mouseleave="removeDrop">
    <button @click="down"><strong>{{desc}}</strong></button><i class="el-icon-arrow-down"></i>
    <ul :class="[dropFlag ? 'active': '']" id="drop">
      <li v-for="item in opts">
        <ul id="main-content" :id=item.head>
          <li class="list-item list-header">{{item.head}}</li>
          <li v-for="show in item.items" class="list-item"><router-link :to="{name: 'designerPro', params: {designerId: show.id}}">{{show.name}}</router-link></li>
        </ul>
      </li>
    </ul>
    <ul :class="['nav', dropFlag ? 'active': '']">
      <li v-for="char in alphas" @click="jump(char)">{{char}}</li>
    </ul>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    data () {
      return {
        dropFlag: false,
        alphas: [
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
          'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
          'y', 'z'
        ],
        top: 0
      }
    },
    props: ['opts', 'desc'],
    methods: {
      down (e) {
        this.dropFlag = !this.dropFlag
      },
      removeDrop (e) {
        if (this.dropFlag) {
          this.dropFlag = false
        }
      },
      jump (char) {
        $('#drop').scrollTop($('#' + char).offset().top - $('#drop').offset().top + $('#drop').scrollTop())
      }
    }
  }
</script>

<style scoped>
  .drop-down {
    background-color: white;
    width: 25%;
    height: 40px;
    text-align: center;
  }

  a {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  button {
    padding: 4px;
    padding-top: 10px;
    border: none;
    /* height: 100%; */
    width: 90%;
    background-color: white;
    font-size: 1.5em;
  }
  ul {
    background-color: white;
  }

  i {
    float: right;
    margin: 15px 5px 15px 0;
  }

  #drop {
    display: none;
    position: absolute;
    border: 1px solid darkgray;
    width:100%;
    height: 740px;
    overflow-y: auto;
  }

  #drop.active {
    display: block;
    border-top: 1px solid;
  }

  li {
    text-align: left;
    padding: 5px;
  }

  .list-header {
    margin: 3px 0;
    font-weight: bold;
    color: #cc141e;
  }

  .list-item {
    width: 100%;
    letter-spacing: .1em;
    color: #333;
    font-family: "FranklinGothic", Helvetica, sans-serif;
    color: #cc141e;
  }

  a {
    color: black;
    padding-left: 2px;
    text-decoration: none !important;
  }

  /* 侧边导航栏 */
  .nav {
    display: none;
    position: absolute;
    border-left: 1px solid #DCDCD8;
    padding:10px;
    font-size: 0.5em;
    right: 10px;
    top: 60px;
    color: #cc141e;
  }

  .nav > li {
    padding: 2px;
    cursor: pointer;
    font-size: 1.5em;
  }

  .nav.active {
    display: block;
  }

  @media screen and (max-width: 1250px){
    .drop-down {
      width: 20%;
    }

    button {
      font-size: 0.5em;
    }
  }

  @media (min-device-width: 320px) and (max-device-width: 568px){
    .drop-down {
      width: 30%;
    }

    button {
      font-size: 0.6em;
    }
  }

  /* For ipad pro */
  @media (min-device-width: 568px) and (max-device-width: 1100px) {
    .drop-down {
      width: 50%;
    }

    button {
      font-size: 0.6em;
    }
  }

</style>
