<template>
  <div>
    <div>
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
          <img :src="slide.img_url" :alt="slide.desc">
          <div class="text">
            <p>{{ slide.desc }}</p>
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
          slidesPerView: 3,
          centeredSlides: true,
          paginationClickable: true,
          spaceBetween: 30
        }
      }
    },
    props: ['swiperSlides'],
    mounted () {
    },
    methods: {
    }
  }
</script>

<style scoped>
  .swiper-container {
    background-color: #FFF;
  }

  .append-buttons {
    text-align: center;
    margin-top: 20px;
  }
  .append-buttons a {
    display: inline-block;
    margin: 0 10px;
  }

  .swiper-wrapper > div {
    width: auto !important;
  }

  .swiper-slide img {
    height: 250px;
    width: auto !important;
  }

  .text {
    position: absolute;
    bottom: -3%;
    background-color: black;
    width: 100%;
    height: 33%;
    opacity: 0.7;
  }

  .text p {
    color: white;
    position: relative;
    margin: 20px;
    font-size: 1.5em;
  }

  .swiper-button-prev {
    background-image: url("../../../static/icon/left-arrow.svg") !important;
  }

  .swiper-button-next {
    background-image: url("../../../static/icon/right-arrow.svg") !important;
  }

</style>
