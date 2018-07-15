<template>
  <div class="main-container">
    <div class="left">
      <vue-markdown class="markdown" v-if="contact.desc !== ''" style="font-family: qingkebenyue">{{contact.desc}}</vue-markdown>
      <div class="photos">
        <div v-for="w in workers">
          <img :src="w.img_url" alt="" @click="selectWorker = w;uploadPicDialog = true">
          <h2>{{w.name}}</h2>
          <h3>{{w.identity}}</h3>
          <h4>{{w.email}}</h4>
        </div>
      </div>
    </div>
    <div class="right">
      <h3 style="padding-left: 15px; color: red">SHANGHAI 上海</h3>
      <div class="contacts">
        <div>
          <strong>电话:</strong>
          <p>{{contact.phone}}</p>
        </div>
        <div>
          <strong>传真:</strong>
          <p>{{contact.fax}}</p>
        </div>
      </div>
      <div class="location">
        <p>{{contact.address}}</p>
      </div>
      <div class="links">
        <a :href="contact.link" target="_blank" style="cursor: pointer">{{contact.link}}</a>
      </div>
      <div class="map">
        <img src="../../static/img/location.png" alt="">
      </div>
      <h3 style="padding-left: 15px; color: red">LONDON 伦敦</h3>
      <div class="contacts">
        <div>
          <strong>电话:</strong>
          <p>021-63232306(SH)</p>
        </div>
        <div>
          <strong>邮箱:</strong>
          <p>INDO@REGEN.ORG.CN</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import VueMarkdown from '../../node_modules/vue-markdown'
  import {getAllWorkers, getContact} from '../service/getData'
  require('../../node_modules/github-markdown-css/github-markdown.css')

  export default {
    data () {
      return {
        title: '联系我们',
        contact: {
          phone: '',
          fax: '',
          link: '',
          desc: '',
          address: ''
        },
        addWorkerDialog: false,
        editWorkerDialog: false,
        uploadPicDialog: false,
        deleteDialog: false,
        editContactDialog: false,
        selectWorker: {
          id: '',
          name: '',
          email: '',
          identity: '',
          rank: 0
        },
        worker: {
          img: '',
          name: '',
          email: '',
          identity: '',
          rank: 0
        },
        uploadProcess: 0,
        photos: [
          {
            name: 'John Shegda',
            desc: 'President, Photography and Art Directors',
            email: 'xxxxxx@gmail.com',
            imgUrl: '../static/img/img1.jpg'
          },
          {
            name: 'John Shegda',
            desc: 'President, Photography and Art Directors',
            email: 'xxxxxx@gmail.com',
            imgUrl: '../static/img/img2.jpg'
          },
          {
            name: 'John Shegda',
            desc: 'President, Photography and Art Directors',
            email: 'xxxxxx@gmail.com',
            imgUrl: '../static/img/img1.jpg'
          },
          {
            name: 'John Shegda',
            desc: 'President, Photography and Art Directors',
            email: 'xxxxxx@gmail.com',
            imgUrl: '../static/img/img2.jpg'
          },
          {
            name: 'John Shegda',
            desc: 'President, Photography and Art Directors',
            email: 'xxxxxx@gmail.com',
            imgUrl: '../static/img/img1.jpg'
          },
          {
            name: 'John Shegda',
            desc: 'President, Photography and Art Directors',
            email: 'xxxxxx@gmail.com',
            imgUrl: '../static/img/img2.jpg'
          }
        ],
        workers: [
          {
            id: '',
            name: '',
            identity: '',
            email: '',
            img_url: '',
            rank: 0
          }
        ]
      }
    },
    components: {
      VueMarkdown
    },
    methods: {
      async initData () {
        getContact().then(res => {
          console.log(res)
          this.contact = res.msg
        }).catch(err => {
          console.log(err)
        })
        getAllWorkers(0, 10000).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.workers = res.msg.workers
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted () {
      document.title = this.title
      this.initData()
    }
  }
</script>

<style scoped>

  @font-face {
    font-family: qingkebenyue;
    src: url(../assets/fonts/FZLTHJW.ttf);
  }

  @font-face {
    font-family: 'Helvetica Neue Thin';
    src: url(../assets/fonts/HelveticaNeueLt.ttf);
  }

  .main-container {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    width: 90%;
    height: 700px;
    align-items: flex-start;
    margin: 60px auto;
  }

  /* left */
  .left {
    width: 75%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
    margin-right: 8%;
  }

  .markdown p {
    font-size: 1.5em;
    text-indent: 2em;
  }

  .photos {
    margin-top: 60px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .photos > div {
    width: 250px;
  }

  .photos img {
    height: 100px;
    width: auto;
    cursor: pointer;
    transition: .5s;
  }

  .photos img:hover {
    transform: scale(1.1, 1.1);
  }

  .photos h2 {
    font-size: 1.5em;
  }

  .photos h3 {
    font-size: 1.0em;
    font-style: italic;
  }

  .photos h4 {
    font-size: 0.8em;
  }

  /* right */
  .right {
    width: 30%;
    border-left: 1px solid gray;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }

  .contacts > div {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
  }

  .contacts > div > strong {
    flex-grow: 2;
    font-size: 1.6em;
    padding-left: 15px;
    margin-top: 3px;
  }

  .contacts > div > p {
    flex-grow: 1;
    font-size: 1.4em;
    text-align: right;
    padding-right: 4%;
  }

  .location {
    margin-top: 20px;
    padding-left: 5px;
    font-size: 1.5em;
    font-family: 'Helvetica Neue Thin';
  }

  .location > p {
    color: #989FBF;
    text-align: center;
  }

  .links {
    margin-top: 30px;
    padding-left: 5px;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .links > a {
    text-decoration: none;
    color: black;
    font-size: 1.2em;
    margin: 0 auto;
    width: 100%;
    text-align: center;
  }

  .links > div {
    margin: 20px auto 20px auto;
  }

  .links > div > img{
    width: 30px;
    margin-left: 20px;
    cursor: pointer;
  }

  .map > img {
    max-width: 300px;
    margin-left: 25px;
  }

  @media screen and (max-width: 835px){
    .links > a {
      font-size: 0.5em;
    }

    .photos  img {
      width: 400px;
      height: auto;
    }

    .photos h2 {
      font-size: 1.8em;
    }

    .photos h3 {
      font-size: 1.6em;
      font-style: italic;
    }

    .photos h4 {
      font-size: 1.2em;
    }
  }

  @media (max-device-width: 835px) {
    .links > a {
      font-size: 0.5em;
    }

    .photos > div {
      width: 300px;
    }

    .photos  img {
      width: 450px;
      height: auto;
    }

    .photos h2 {
      font-size: 1.8em;
    }

    .photos h3 {
      font-size: 1.6em;
      font-style: italic;
    }

    .photos h4 {
      font-size: 1.2em;
    }
  }

</style>
