<template>
  <div>
    <div>
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
          <img :src="slide.img_url" style="cursor: pointer" :alt="slide.desc" @click="toShow(slide)">
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
      console.log(this.swiperSlides)
    },
    methods: {
      toShow (s) {
        this.$router.push({name: 'show', params: {showId: s.id}})
        this.$emit('toShow')
      }
    }
  }
</script>

<style scoped>
  .swiper-container {
    background-color: #FFF;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    z-index: 1;
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
    height: 300px;
    /* width: auto !important; */
  }

  .text {
    font-size: .8em;
    position: absolute;
    bottom: -3%;
    background-color: #000;
    width: 100%;
    height: 33%;
    opacity: .7;
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
