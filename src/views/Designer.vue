<template>
  <div class="designer-container">
    <DesignerSwiper :imgs="designers.slice(0, 5)"></DesignerSwiper>
    <div class="designer-wrap" v-for="designer in designers">
      <div class="designer-img-wrap">
        <img :src="designer.img_url"  @click="onImgClick($event,designer.id)">
      </div>
      <p class="designer-logo">
        <img :src="designer.title_img_url"  @click="onImgClick($event,designer.id)">
      </p>
    </div>
  </div>

</template>

<script>
  import {getAllDesigners} from '../service/getData'
  import DesignerSwiper from './swipers/DesignerSwiper.vue'
  export default {
    name: 'news',
    data () {
      return {
        title: 'DESIGNER',
        designers: []
      }
    },
    components: {
      DesignerSwiper
    },
    methods: {
      onImgClick (event, designerId) {
        this.$router.push({name: 'designerPro', params: {designerId: designerId}})
      }
    },
    mounted () {
      document.title = this.title
      getAllDesigners(0, 10000).then(res => {
        console.log(res)
        if (res.code === '0') {
          this.designers = res.msg.designers
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style scoped>
  .designer-container {
    width: 70%;
    margin: 0 auto;
  }

  .designer-wrap {
    display: flex;
  }

  .designer-img-wrap img, .designer-name span {
    cursor: pointer;
  }

  .designer-img-wrap {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
  }

  .designer-img-wrap img {
    margin: 10px 1%;
    height: 400px;
  }

  .designer-logo {
    width: 85%;
    position: relative;
    font-size: 3em;
  }
  .designer-logo img {
    position: relative;
    margin: 7% 1%;
    height: 250px;
    max-width: 90%;
    cursor: pointer;
  }
</style>
