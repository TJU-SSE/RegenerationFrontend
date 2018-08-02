<template>
  <div class="main-container">
    <div class="left">
      <vue-markdown class="markdown" v-if="contact.desc !== ''" style="font-family: CH">{{contact.desc}}</vue-markdown>
      <div class="photos">
        <div v-for="w in workers" v-bind:key="w.id">
          <img :src="w.img_url" alt="" @click="selectWorker = w;uploadPicDialog = true">
          <h2>{{w.name}}</h2>
          <h3>{{w.identity}}</h3>
          <h4>{{w.email}}</h4>
        </div>
      </div>
      <div class="visitorMessage" valign="right">
        <h2>Please leave your contact detail here for cooperation or work opportunity</h2>
        <div style="width: 80%">
          <el-form label-position="top" label-width="80px" :model="contactForm" ref="contactForm">
            <el-form-item label="Name:">
              <el-input v-model="contactForm.name"></el-input>
            </el-form-item>
            <el-form-item label="E-mail:" prop="mail">
              <el-input v-model="contactForm.mail"></el-input>
            </el-form-item>
            <el-form-item label="Leave Your Message Here:">
              <el-input type="textarea" v-model="contactForm.content"></el-input>
            </el-form-item>
          </el-form>
          <button @click="submit('contactForm')">SUBMIT</button>
        </div>
      </div>
    </div>
    <div class="right">
      <h3 class="city">| SHANGHAI |</h3>
      <div class="map">
        <iframe width='400' height='450' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='http://f.amap.com/5J74C_0715iY8'></iframe>
      </div>
      <div class="contacts">
        <div>
          <p>Tel: +86 63232306</p>
        </div>
        <div>
          <p>Add:</p>
        </div>
        <div>
          <p>{{contact.address}}</p>
        </div>
      </div>
      <h3 class="city">| LONDON |</h3>
      <div class="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155.1613737864298!2d-0.09867483611529332!3d51.52088464416027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b56bb5bfb43%3A0xfc22c89f43faecfc!2sFlorin+Court!5e0!3m2!1szh-CN!2sus!4v1531817952877" width='400' height='450' frameborder='0' scrolling='no' marginheight='0' marginwidth='0'></iframe>
      </div>
      <div class="contacts">
        <div>
          <p>Flourin Court, Charterhouse Square, London EC1M 6EX(UK)</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import VueMarkdown from '../../node_modules/vue-markdown'
  import {getAllWorkers, getContact, sendContact} from '../service/getData'
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
        contactForm: {
          name: '',
          mail: '',
          content: ''
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
      },
      submit (formName) {
        const {name: varificationCode, mail: email, content} = this.contactForm
        sendContact(
          {
            varificationCode,
            email,
            content
          }
        ).then(res => {
          console.log(res)
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

  @font-face {
    font-family: 'Bernard';
    src: url(../assets/fonts/Bernard.ttf);
  }

  @font-face {
    font-family: 'Tw';
    src: url(../assets/fonts/Tw.ttf);
  }

  .main-container {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    width: 90%;
    height: auto;
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
    font-family: Barnard;
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

  .visitorMessage{
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-align-content: center;
    align-content: flex-end;
    font-family: "bernard", CH
  }

  .visitorMessage h2{
    font-family: Bernard, CH;
    font-size: 1.8em;
    color:#c31820
  }

  .visitorMessage h3{
    font-size: 1.5em;
  }

  .visitorMessage button{
    padding-right: 0px;
    margin-top: 20px;
    float: right;
    height: 50px;
    width: 150px;
    font-size: 1.9em;
    background-color: #2c0206;
    color: #c3181f;
    border: none;
  }

  /* right */
  .right {
    width: 30%;
    border-left: 1px solid gray;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    font-family: Tw, CH;
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
    text-align: left;
    padding-left: 15px;
  }

  .location {
    margin-top: 20px;
    padding-left: 5px;
    font-size: 1.0em;
    font-family: 'Helvetica Neue Thin';
  }

  .location > p {
    color: #000000;
    text-align: center;
  }

  .location > strong {
    flex-grow: 2;
    font-size: 1.6em;
    padding-left: 15px;
    margin-top: 3px;
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

  .city {
    font-size: 28px;
    color: #c5181f;
    padding-left: 130px;
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

<style>
  .el-form-item__label {
    color: black !important;
    padding: 0 0 0px !important;
    font-size: 20px !important;
  }
</style>
