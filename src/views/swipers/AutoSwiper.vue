<template>
  <div>
    <div>
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in imgs" :style="{'background-image': 'url('+ item.cover_img.toString() +')','cursor': 'pointer', 'background-size': 'cover'}" :key="index">
          <div style="height: 100%; width: 100%" @click="toShow(item)"></div>
          <div class="text" data-swiper-parallax="-300">
            <div style="font-family: Bernard">
              <h1>{{item.title}}</h1>
              <p>{{item.writer}}</p>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          paginationClickable: true,
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: 2500,
          autoplayDisableOnInteraction: false
        }
      }
    },
    props: ['imgs'],
    methods: {
      toShow (item) {
        this.$router.push({name: 'newsDetail', params: {newsId: item.newsId}})
      }
    }
  }
</script>

<style scoped>

  @font-face {
    font-family: 'Helvetica Neue Thin';
    src: url(../../assets/fonts/HelveticaNeueLt.ttf);
  }

  .swiper-wrapper > div{
    height: 750px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #000;
  }

  .text {
    position: absolute;
    bottom: 0;
    padding-bottom: 60px;
    width: 100%;
    color: rgb(255, 255, 255);
    opacity: 0.7;
    background: black;
    background-color: black;
  }

  .text > div {
    text-align: center;
  }

  .swiper-button-prev {
    background-image: url("../../../static/icon/left-arrow.svg") !important;
  }

  .swiper-button-next {
    background-image: url("../../../static/icon/right-arrow.svg") !important;
  }

  .swiper-containter {
    font-size: .8em;
    position: absolute;
    bottom: -3%;
    background-color: #000;
    width: 100%;
    height: 33%;
    opacity: .7;
  }

  @media screen and (min-width: 1500px){
    .swiper-wrapper > div{
      height: 900px;
    }
  }

</style>
