<template>
  <div>
    <div  style="height: 500px">
      <!-- swiper2 Thumbs -->
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs" id="thumb">
        <div style="color: white; font-size: 1.5em; top: -125px; position: relative;">{{designerName}}</div>
        <swiper-slide :style="{'background-image': 'url(' + img.img_url + ')'}" v-for="img in imgs"></swiper-slide>
      </swiper>
      <!-- swiper1 -->
      <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
        <swiper-slide :style="{'background-image': 'url(' + img.img_url + ')'}" v-for="img in imgs">
          <div class="label">{{designerName}}</div>
        </swiper-slide>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
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
          spaceBetween: 10
        },
        swiperOptionThumbs: {
          notNextTick: true,
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true,
          direction: 'vertical'
        }
      }
    },
    props: ['designerName', 'imgs'],
    mounted () {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.params.control = swiperThumbs
      swiperThumbs.params.control = swiperTop
    }
  }
</script>

<style scoped>

  .swiper-container {
    background-color: #000;
  }
  .swiper-slide {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .gallery-top {
    height: 100%!important;
    width: 80%;
    float: left;
  }
  .gallery-thumbs {
    height: 100%!important;
    width: 20%;
    box-sizing: border-box;
    padding: 10px 0;
    float: left;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 200px;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
  element.style {
     transform: translate3d(-829px, 0px, 0px);
     transition-duration: 0ms;
 }
 .swiper-container-android .swiper-slide, .swiper-wrapper {
     -webkit-transform: translateZ(0);
     transform: translateZ(0);
 }

  .label {
    position: relative;
    right: -75%;
    top: 25px;
    color: #333;
    background-color: hsla(0,0%,77%,.5);
    margin: 0;
    padding: 0 .5em;
    height: 2em;
    line-height: 2em;
    font-size: 1.2em;
    font-weight: 700;
    border-radius: 1px;
    letter-spacing: .3px;
    cursor: pointer;
    transition: 0.5s;
  }

  .label:hover {
    background-color: gray;
  }
</style>
