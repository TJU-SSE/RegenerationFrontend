<template>
  <div>
    <div>
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in imgs" :key="index">
           <div @click="goToDesignerDetail($event,item.id)" class="slide-cover">
            <div class="text" data-swiper-parallax="-300">
              <div>
                <img :src="item.img_url">
              </div>
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
          autoplay: 4000,
          autoplayDisableOnInteraction: false
        }
      }
    },
    methods: {
      goToDesignerDetail: function (event, designerId) {
        console.log('goToDesignerDetail', designerId)
        this.$router.push({name: 'designerPro', params: {designerId: designerId}})
      }
    },
    props: ['imgs']
  }
</script>

<style scoped="">
  .swiper-wrapper > div{
    height: 500px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #000;
  }

  .text {
    color: white;
  }

  .text > div {
    text-align: center;
  }

  .text h1{
    font-weight: bolder;
    font-size: 3em;
  }
  .text p{
    font-weight: bold;
    font-size: 1.5em;
  }

  .swiper-button-prev {
    background-image: url("../../../static/icon/left-arrow.svg") !important;
  }

  .swiper-button-next {
    background-image: url("../../../static/icon/right-arrow.svg") !important;
  }

  @media screen and (min-width: 1500px){
    .swiper-wrapper > div{
      height: 900px;
    }
  }

  .slide-cover{
    margin-right: 5%;
    margin-left: 5%;
    height: 90%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
