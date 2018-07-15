<template>
  <div >
    <h1>{{ msg }}</h1>
    <ul>
      <li><router-link :to="{ name: 'serverTest'}">Test Service</router-link></li>
      <li><router-link :to="{ name: 'waterfallTest'}">Test Waterfall</router-link></li>
      <li><router-link :to="{ name: 'waterfallTestWithImg'}">Test Waterfall With Img</router-link></li>
      <li><router-link :to="{ name: 'swiper'}">swiper</router-link></li>

      <li><router-link :to="{ name: 'news'}">news</router-link></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        msg: 'REGEN TEST'
      }
    },
    mounted () {
      console.log('index', this.$route.name)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
