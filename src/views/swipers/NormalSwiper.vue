<template>
  <div>
    <div>
      <!-- swiper -->
      <swiper :options="swiperOption" class="gallery-top">
        <swiper-slide style="background-image:url(http://hk.anteprima.com/upload/img/1380.jpg)"></swiper-slide>
        <swiper-slide style="background-image:url(http://img.fzengine.com/best/200810/200810311036081.jpg)"></swiper-slide>
        <swiper-slide style="background-image:url(http://cache.leonardparis.com/wp-content/uploads/Thumbnail_Defile_AutumnWinter2017.jpg)"></swiper-slide>
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
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 30
        }
      }
    }
  }
</script>

<style scoped>
  .swiper-wrapper > div{
    height: 450px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #000;
  }
</style>
