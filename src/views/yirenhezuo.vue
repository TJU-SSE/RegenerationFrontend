<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :title="length">
            <div class="imgList">
              <el-row>
                <el-col :span="4" v-for="o in 15" :key="o" class="imgList"><img :src="corpList[0].abrImg" class="imgAbr"></el-col>
              </el-row>
            </div>
        </el-collapse-item>
    </el-collapse>  

    <div>
    <p class="para">2018</p>
    <HR class="hr"></HR>
    <el-row v-for="o in 5" :key="o">
      <el-col :span="5"><img :src="corpList[0].abrImg" class="imgAbr"></el-col>
      <el-col :span="19">
        <h3 class="title">{{corpList[0].title}}</h3>
        <div class="intro">
          <p>{{corpList[0].name}}</p>
          <p>{{corpList[0].published}}</p>
          <p>{{corpList[0].photographer}}</p>
        </div>
      </el-col>
    </el-row>

    <p class="para">2017</p>
    <HR class="hr"></HR>
    <el-row v-for="o in 5" :key="o">
      <el-col :span="5"><img :src="corpList[1].abrImg" class="imgAbr"></el-col>
      <el-col :span="19">
        <h3 class="title">{{corpList[1].title}}</h3>
        <div class="intro">
          <p>{{corpList[1].name}}</p>
          <p>{{corpList[1].published}}</p>
          <p>{{corpList[1].photographer}}</p>
        </div>
      </el-col>
    </el-row>
    </div>
  </div>    
</template>

<script>
  export default {
    data () {
      return {
        corpList: [
          {
            title: 'BRITISH VOGUE 2018 COVER',
            name: 'British Vogue (Magazine Cover)',
            published: 'Feb 2018',
            photographer: 'Peter Lindbergh',
            abrImg: '../static/img/logo.png'
          },
          {
            title: 'BRITISH VOGUE 2017 COVER',
            name: 'British Vogue (Magazine Cover)',
            published: 'Feb 2017',
            photographer: 'Peter Lindbergh',
            abrImg: '../static/img/logo.png'
          }
        ],
        length: 'TYPE ALL (446)'
      }
    }
  }
</script>

<style>
  .el-collapse-item__header {
    background-color: #d61518 !important;
    color: white;
    text-align: center;
    border-bottom: 1px solid black !important;
  }

  .el-collapse {
    border: 1px solid black !important;
  }

  .el-collapse-item__content {
    background-color: black;
    color: white;
    border: 0px solid black !important;
  }

  .el-collapse-item__wrap {
    border: 0px !important;
  }

  .el-collapse-item__arrow {
    float: unset !important;
  }

  .imgAbr {
    width: 60%;
    height: 100%;
    padding: 5px;
    margin: 5px;
  }

  .para {
    padding-top: 50px;
    padding-bottom: 0px;
    margin-bottom: 0px;
  }

  hr {
    margin-top: 0px !important;
    border-top: 1px solid black !important;
  }

  .title {
    font-size: 13.5px;
    color: white;
  }

  .intro {
    margin: 0 0 0px;
    line-height: 5px;
  }

</style>
