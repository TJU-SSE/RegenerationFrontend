<template>
  <div id="main-div">
    <p>{{msg}}</p>
    <waterfall
      :line="items.line"
      :line-gap="items.lineGap"
      :min-line-gap="items.minLineGap"
      :max-line-gap="items.maxLineGap"
      :watch="items.data"
      ref="waterfall"
    >
      <!-- each component is wrapped by a waterfall slot -->
      <WaterfallSlot
        v-for="(item, index) in items.data"
        :width="item.width"
        :height="item.height"
        :order="index"
        :key="item.index"
      >
        <img class="item" :src="item.imgUrl" :index="item.index">
      </WaterfallSlot>
    </waterfall>
  </div>
</template>

<script>
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

  export default {
    name: 'waterfallTestWithImg',
    components: {
      Waterfall,
      WaterfallSlot
    },
    data () {
      return {
        msg: 'This is waterfall test with img page',
        title: 'waterfall test with img',
        items: {
          minLineGap: 100,
          maxLineGap: 400,
          lineGap: 380,
          line: 'h',
          data: []
        }
      }
    },
    methods: {
      addItems: function (itemCount) {
        let curHeight = 300
        let context = this
        for (let i = 1; i <= itemCount; i++) {
          let imgUrl = '../../static/img/img' + i + '.jpg'

          let image = new Image()
          image.onload = function () {
            context.items.data.push({
              index: i,
              width: image.width / image.height * curHeight,
              height: curHeight,
              imgUrl: imgUrl
            })
          }
          image.src = imgUrl
        }
        console.log(this.items)
      }
    },
    created () {
      this.addItems(8)
    },
    mounted () {
      document.title = this.title
    }
  }

</script>

<style scoped>
  .item {
    position: absolute;
    width: 95%;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    font-size: 1.2em;
  }
</style>
