<template>
  <div>
    <button type="button" class="btn btn-default">test</button>
    <a>
      <i class="fa fa-chevron-circle-left fa-2x" aria-hidden="true"></i>
    </a>
    <p>{{ msg }}</p>
    <div>
      <p>Here</p>
    </div>
  </div>
</template>

<script>

  import MapService from '../../service/mapService'

  export default {
    name: 'serviceTest',
    data () {
      return {
        msg: 'This is service test page',
        title: 'service test'
      }
    },
    methods: {
      getData: async function () {
        let responseBody = await MapService.getLayer(this)
        if (responseBody.code === 200) {
          this.msg = responseBody.data
        } else if (responseBody.code === 100) {
          this.msg = responseBody.exception
        }
      }
    },
    mounted () {
      document.title = this.title
      this.getData()
    }
//    mounted: async function () {
//      document.title = this.title
//      await this.getData()
//    }
  }
</script>

<style scoped>

</style>
