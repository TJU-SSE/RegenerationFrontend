<template>
  <div class="main-container" @click="activeItem=-1">
      <transition name="slide-fade" v-for="(item, index) in itemList" :key="index">
        <div :class="['list-item', activeItem === index ? 'active':'']" @mouseover="itemActive(index)"  v-if="item.show">
          <div class="item-img">
            <img :src="item.portfolio.img_url" alt="pic" :class="[activeItem === index ? 'active':'']">
          </div>
          <div class="item-body">
            <div class="item-body-desc">
              <h4 @click="choose = item;modalFlag=true;activeItem=-1" style="color: red;">{{item.title}}</h4>
              <h5>{{designer.name}}</h5>
              <p>Published: {{item.time}}</p>
            </div>
          </div>
        </div>
      </transition>
      <div class="hide-list">
        <div v-for="(item, index) in itemList" :key="index" :class="['side-show', activeItem === index ? 'active':'']" :style="{'top': index * 140 - forSafari + 'px'}">
          <div class="side-title">
            <h3>{{item.title}}</h3>
            <p><strong style="font-size: 0.8em">{{designer.name}}</strong> &nbsp {{item.time}}</p>
            <hr>
          </div>
          <div class="side-img">
            <div class="side-left">
              <img :src="item.portfolio.img_url" alt="pic">
            </div>
            <div class="side-right">
              <div>
                <img :src="url.img_url" alt="pic" v-for="(url, index) in item.portfolio.imgs.slice(0, 3)" :key="index">
              </div>
              <div>
                <img :src="url.img_url" alt="pic" v-for="(url, index) in item.portfolio.imgs.slice(3, 6)" :key="index">
              </div>
            </div>
          </div>
          <p style="position: relative; right: -350px; color: #1d90e6; cursor: pointer" @click="modalFlag=true;activeItem=index">More</p>
          <div class="side-desc">
            <hr>
            <p>{{item.description}}</p>
          </div>
        </div>
      </div>

    <Modal
      v-model="modalFlag"
      title="详情"
      width="100%"
      :styles="{top: 0, bottom: 0}"
    >
      <h4 v-if="modalFlag">{{choose.title}}</h4>
      <div style="overflow-y: auto; height: 100%">
        <img :src="choose.portfolio.img_url" alt="pic" v-if="modalFlag" style="width: 100%">
        <img :src="url.img_url" alt="pic" v-for="(url, index) in choose.portfolio.imgs" :key="index" v-if="modalFlag" style="width: 100%; margin-top: 5px">
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="modalFlag = false">关闭</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
  /* eslint-disable */


  import Vue from 'vue'

  export default {
    data () {
      return {
        itemList: [],
        modalFlag: false,
        activeItem: -1,
        forSafari: 0,
        choose: {}
      }
    },
    props: ['items', 'designer'],
    methods: {
      initData () {
        var userAgent = navigator.userAgent;
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 1
        if (isSafari){
          this.forSafari = this.items.length * 140 + 100
        }
        this.items.map(function (i) {
          i['show'] = false
          let time = new Date(i.releaseTime)
          i['time'] = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
        })
        this.itemList = this.items
        this.choose = this.items[0]
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
        this.choose = this.items[index]
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
    font-family: Tw, CH;
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
    margin-left: 30px;
  }

  .item-img {
    margin: 5px;
    display: block;
    min-width: 200px;
  }

  .item-img > img {
    height: 130px;
    max-width: calc(200px + .5em);
    transition: 1s;
    /*max-height: 130px;*/
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
    margin-left: 50px;
    opacity: 0.6;
  }

  .item-body-desc {
    text-align: left;
  }

  .item-body-desc h3 {
    position: relative;
    font-weight: 200;
    top: -10px;
    color: black;
    text-decoration: none;
    transition: 0.5s;
    cursor: pointer;
  }

  .item-body-desc > div {
    margin-top: 10px;
    height: 85px;
    overflow-y: auto;
  }

  .item-body-desc > div > p {
    padding-top: 20px;
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

  .side-title h3 {
    font-size: 0.9em;
  }

  .side-img {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    height: 270px;
    margin-left: 10px;
  }

  .side-left {

  }

  .side-left > img {
    max-width: 150px;
    max-height: 150px;
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

  .side-right > div {
    width: 90px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }

  .side-right > div > img {
    width: 80px;
    height: 80px;
    margin: 5px;
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
