<template>
  <div>
    <div style="height: 555px">  
      <!-- swiper1 -->
      <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
        <swiper-slide :style="{'background-image': 'url(' + img.img_url + ')'}" v-for="(img, index) in imgs" :key="index">
          <div class="label" style="font-size: 1.3em; font-weight: 500; font-family: one">{{designer.name}}</div>
          <br>
          <div class="label" v-if="season === '2'" style="font-size: 1.3em; font-weight: 500; font-family: one">AW {{year}}</div>
          <div class="label" v-if="season === '1'" style="font-size: 1.3em; font-weight: 500; font-family: one">SS {{Number.parseInt(year) + 1}}</div>
          <br>
          <div class="label" style="font-size: 1.5em; font-weight: 700; font-family: two">{{designer.designer.name}}</div>
        </swiper-slide>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      </swiper>
    </div>
    <div>
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
        <swiper-slide :style="{'background-image': 'url(' + img.img_url + ')'}" v-for="(img, index) in imgs" :key="index">
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        swiperOptionTop: {
          notNextTick: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 10,
          slidesPerView: 1
        },
        swiperOptionThumbs: {
          notNextTick: true,
          centeredSlides: true,
          spaceBetween: 10,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true,
          direction: 'horizontal'
        }
      }
    },
    props: ['designer', 'imgs', 'year', 'season'],
    mounted () {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.params.control = swiperThumbs
      console.log(swiperThumbs)
      swiperThumbs.params.control = swiperTop
      console.log(swiperTop)
    }
  }
</script>

<style scoped>

  @font-face {
    font-family: one;
    src: url(../../assets/fonts/RealMadrid2009-2010Font.ttf);
  }

  @font-face {
    font-family: two;
    src: url(../../assets/fonts/LYNNB.ttf);
  }

  .swiper-container {
    background-color: #2c0206;
  }

  .swiper-slide {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .gallery-top {
    height: 100%!important;
    width: 100%;
    float: right;
  }
  .gallery-thumbs {
    height: 100%!important;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 0;
    float: right;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 125px;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }

  .label {
    position: relative;
    right: -80%;
    top: 25px;
    color: white;
    margin: 0;
    padding: 0 .5em;
    height: 2em;
    line-height: 2em;
    border-radius: 1px;
    letter-spacing: .3px;
    cursor: pointer;
    transition: 0.5s;
  }

  .label:hover {
    background-color: gray;
  }


  


element.style {
    transform: translate3d(-829px, 0px, 0px);
    transition-duration: 0ms;
}
.swiper-container-android .swiper-slide, .swiper-wrapper {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
}


</style>
