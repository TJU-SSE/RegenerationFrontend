<template>
  <div class="my-footer">
    <!-- <el-row> -->
      <el-col :span="12">
        <div class="makecenter">
          <el-col :span="4"><p> </p></el-col>
          <el-col :span="16">
                <div>
                <el-row><p> </p></el-row>
                <el-row><p> </p></el-row>
                <el-row><p> </p></el-row>
                <div class="contract">
                  <el-col :span="4"><p> </p></el-col>
                  <el-col :span="16">
                  <el-row><p> </p></el-row>
                  <el-row><p> </p></el-row>
                  <el-row><p> </p></el-row>
                  <el-row><p class="info">Tel:+86 63232306</p></el-row>
                  <el-row><p class="info"> </p></el-row>
                  <el-row><p class="info">Add:</p></el-row>
                  <el-row><p class="info">Bldg7, No.224 NanchangRd.,</p></el-row>
                  <el-row><p class="info">Huangpu District, Shanghai</p></el-row>
                  <el-row><p class="info"></p></el-row>
                  <el-row><p class="info">Flourin Court, Charterhouse</p></el-row>
                  <el-row><p class="info">Suqare, London EC1M 6EX(UK)</p></el-row>
                  </el-col>
                  <el-col :span="4"><p> </p></el-col>
                </div>
                </div>
          </el-col>
        <el-col :span="4"><p> </p></el-col>
        </div>
      </el-col>
        <el-col :span="12">
          <!-- <el-col :span="4"><p> </p></el-col> -->
          <!-- <el-col :span="16"> -->
              <el-row><p> </p></el-row>
              <el-row><p> </p></el-row>
              <el-row><p> </p></el-row>
              <el-row><p> </p></el-row>
              <el-row><p> </p></el-row>
              <div class="follow">
                <el-col :span="4"><p> </p></el-col>
                <el-col :span="16">
                  <div>
                      <el-row><p> </p></el-row>
                      <el-row><p> </p></el-row>
                      <el-row>
                        <div class="regname">
                          <el-col :span="7"><p class="pfollow">Follow</p></el-col>
                          <el-col :span="16"><div class="reglogo brand">REGENERATION</div></el-col>            
                        </div>
                      </el-row>
                      <el-row><p></p></el-row>
                      <el-row>
                        <div class="regname">
                            <el-col :span="5"></el-col>
                            <el-col :span="14">
                                <div class="social-icon">
                                  <img src="../../static/icon/ins.svg" alt="ins" class="icon">
                                  <img src="../../static/icon/wechat.svg" alt="微信" class="icon">
                                  <img src="../../static/icon/weibo.svg" alt="新浪微博" class="icon">
                                  <img src="../../static/icon/qq.svg" alt="QQ" class="icon">
                                </div>
                            </el-col>
                            <el-col :span="5"></el-col>
                        </div>
                      </el-row>
                  </div>
                </el-col>
                <el-col :span="4"><p> </p></el-col>
              </div>
          <!-- </el-col> -->
          <!-- <el-col :span="4"><p> </p></el-col> -->
        </el-col>
    <!-- </el-row> -->
    <!-- <img src="../../static/img/regeneration主页logo-01.png" alt="logo">
    <p class="first-line">RENGERATION.CN © REGEN. INC. ALL RIGHTS RESERVED.</p>
    <p class="second-line">REGENERATION IS OPERATED BY REGEN INC.</p> -->
  </div>
</template>

<script>
  export default {
    name: 'footer',
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>

  @font-face {
    font-family: 'qingkebenyue';
    src:url(../assets/fonts/FZQKBYSJW.ttf);
  }

  .my-footer {
    height: 350px;
    width: 100%;
    background: url('../../static/img/footer.jpg');
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-around;
    min-width: 1080pt;
    /* align-items: center; */
  }

  .first-line {
    margin-top: 10px;
  }

  .second-line {
    margin-top: -8px;
  }

  .my-footer > img {
    margin-top: 30px;
    height: 60px;
  }

  .my-footer p {
    color: white;
    /* font-size: 1.3em; */
    font-family: 'Bernard';
    letter-spacing: 2px;
  }
  .contract{
    background: rgb(53, 1, 1);
    width: 400px;
    height: 250px;
    /* align-items: center;
    justify-content: center; */
  }
  .follow{
    background: rgb(53, 1, 1);
    width: 480px;
    height: 150px;
  }
  .regname{
    display: flex;
    flex-direction: row;
  }
  .reglogo{
    display: flex;
    height: 30px;
    justify-content: space-between;
    font-family: Bernard;
    color: #e60013;
    font-size: 30px;
    letter-spacing: 5px;
  }
  .brand img {
    width: 100%;
    /* height: 50%; */
  }
  .pfollow{
    font-size: 28px;
    /* width: 30px;
    height: 30px; */
  }
  .reddiv{
    color: rgb(153, 13, 13);
    background:rgb(153, 13, 13)
  }
  .greendiv{
    color: rgb(42, 134, 72);
    background: rgb(42, 134, 72);
  }
  .bluediv{
    color: rgb(101, 120, 233);
    background:rgb(101, 120, 233);
  }
  .browndiv{
    color: #673A1B;
    background:#673A1B;
  }
  .makecenter{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .info {
    font-size: 15px;
    font-family: Bernard;
  }
  .reglogo brand {
    font-size: 28px;
  }
  .social-icon > img {
    padding: 10px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  .icon{
    background-color: aliceblue;
  }
</style>
