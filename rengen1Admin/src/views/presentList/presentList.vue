<template>
  <div class="main-container">
      <transition name="slide-fade" v-for="(item, index) in itemList" :key="index">
        <div :class="['list-item', activeItem === index ? 'active':'']" @mouseover="itemActive(index)" @mouseout="activeItem=-1" v-if="item.show">
          <div class="item-img">
            <img :src="item.portfolio.img_url" alt="pic" :class="[activeItem === index ? 'active':'']">
          </div>
          <div class="item-body">
            <div class="item-body-desc">
              <h2>{{item.title}}</h2>
              <div>
                <p>{{item.description}}
                  <el-button-group>
                    <el-button size="mini" icon="edit" type="warning" @click="startEdit(item)">修改</el-button>
                    <el-button size="mini" icon="delete" type="danger" @click="startDelete(item)">删除</el-button>
                    <el-button size="mini" icon="plus" type="primary" @click="startAdd(item)">添加图片</el-button>
                  </el-button-group>
                </p>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="hide-list">
        <div v-for="(item, index) in itemList" :key="index" :class="['side-show', activeItem === index ? 'active':'']" :style="{'top': index * 140 - forSafari + 'px'}">
          <div class="side-title">
            <h3>{{item.title}}</h3>
            <hr>
          </div>
          <div class="side-img">
            <div class="side-left">
              <img :src="item.portfolio.img_url" alt="pic">
            </div>
            <div class="side-right">
              <img :src="url.img_url" alt="pic" v-for="url in item.portfolio.imgs">
              <a>more>></a>
            </div>
          </div>
          <div class="side-desc">
            <h3>Desc</h3>
            <hr>
            <p>{{item.description}}</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  /* eslint-disable */

  // TODO: safari重置一下公式就行了 判断一下浏览器

  import Vue from 'vue'

  export default {
    data () {
      return {
        itemList: [],
        activeItem: -1,
        forSafari: 0
      }
    },
    props: ['items'],
    methods: {
      initData () {
        var userAgent = navigator.userAgent;
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 1

        console.log('init')
        console.log(this.items)
        if (isSafari){
          this.forSafari = this.items.length * 140 + 100
        }
        this.items.map(function (i) {
          i['show'] = false
        })
        this.itemList = this.items
        setTimeout(() => {
          for (let i = 0; i < this.itemList.length; i++){
            this.itemList[i].show = true
          }
          // 引发刷新
          this.itemList.push()
        }, 500)
      },
      itemActive (index) {
        this.activeItem = index
      },
      startEdit(item) {
        this.$emit('startEdit', item)
      },
      startDelete(item) {
        this.$emit('startDelete', item)
      },
      startAdd(item) {
        this.$emit('startAdd', item)
      }
    },
    created () {
      this.initData()
    },
    mounted () {
      this.initData()
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
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-bottom: 200px;
  }

  /* list */
  .list-item {
    width: 500px;
    margin-top: 10px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    align-self: flex-start;
    background: white;
    height: 140px;
    transition: 0.5s;
    margin-left: 50px;
  }

  .item-img {
    margin: 5px;
    width: 130px;
    height: 130px;
  }

  .item-img > img {
    width: 130px;
    height: 130px;
    max-width: calc(200px + .5em);
    transition: 1s;
  }

  .active img {
    transform: scale(1.05, 1.05);
  }

  .list-item.active {
    background: #E4E4E4;
  }

  .item-body {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5px;
    opacity: 0.6;
  }

  .item-body-desc {
    text-align: left;
  }

  .item-body-desc h2 {
    position: relative;
    font-weight: 700;
    top: -10px;
    color: black;
    text-decoration: none;
    transition: 0.5s;
    cursor: pointer;
  }

  .item-body-desc h2:hover {
    padding-left: 40px;
    font-weight: 800;
  }

  .item-body-desc > div {
    margin-top: 10px;
    height: 85px;
    overflow-y: auto;
  }

  .item-body-desc > div > p {
    padding-top: 4px;
    font-size: 1.2em;
  }

  /* side show */
  .hide-list {
    position: absolute;
    right: -85px;
    width: 400px;
  }

  .side-show {
    display: none;
    background-color: white;
    border: 1px solid #ccc;;
    z-index: 10000;
    border-radius: 4px;
    margin-bottom: 100px;
  }

  .side-show::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 100px;
    border: 10px solid white;
    border-color: transparent white transparent transparent;
    z-index: 2;
  }

  .side-show::after {
    content: '';
    position: absolute;
    left: -21px;
    top: 100px;
    border: 10px solid #ccc;
    border-color: transparent #ccc transparent transparent;
    z-index: 1;
  }

  .side-show.active {
    position: relative;
    right: 90px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .side-title, .side-desc{
    margin-left: 20px;
    margin-top: -10px;
    width: 90%;
  }

  .side-img {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    height: 160px;
    margin-left: 10px;
  }

  .side-left {

  }

  .side-left > img {
    width: 150px;
    height: auto;
    max-height: 400px;
    margin-left: 10px;
    margin-top: 6px;
  }

  .side-right {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-left: 20px;
    width: 200px;
    height: 150px;
  }

  .side-right > img {
    width: 50px;
    margin-right: 5px;
  }

  .side-right > a {
    position: absolute;
    bottom: 100px;
    right: 10px;
    margin-top: 10px;
    font-size: 1.5em;
  }

  @media screen and (max-width: 1000px){
    .side-show {
      display: none !important;
    }
  }

  @media screen and (min-width: 1500px){
    .list-item {
      width: 100%;
    }

    .hide-list {
      right: 150px;
    }
  }

</style>
