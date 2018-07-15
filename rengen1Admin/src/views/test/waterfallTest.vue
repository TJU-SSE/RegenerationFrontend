<template>
  <div>
    <p>{{msg}}</p>
    <waterfall
      :line="line"
      :line-gap="200"
      :min-line-gap="180"
      :max-line-gap="220"
      :watch="items"
      @reflowed="reflowed"
      ref="waterfall"
    >
      <!-- each component is wrapped by a waterfall slot -->
      <WaterfallSlot
        v-for="(item, index) in items"
        :width="item.width"
        :height="item.height"
        :order="index"
        :key="item.index"
        move-class="item-move"
      >
        <div class="item" :style="item.style" :index="item.index"></div>
      </WaterfallSlot>
    </waterfall>
  </div>
</template>

<script>
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  import ItemFactory from '../../utils/ItemFactory'

  export default {
    name: 'waterfallTest',
    data () {
      return {
        msg: 'This is waterfall test page',
        title: 'waterfall test',

        line: 'h',
        items: ItemFactory.get(100),
        isBusy: false
      }
    },
    methods: {
      addItems: function () {
        if (!this.isBusy && this.items.length < 500) {
          this.isBusy = true
          this.items.push.apply(this.items, ItemFactory.get(50))
        }
      },
      shuffle: function () {
        this.items.sort(function () {
          return Math.random() - 0.5
        })
      },
      reflowed: function () {
        this.isBusy = false
      }

    },
    mounted () {
      document.title = this.title
      let context = this
      document.body.addEventListener('click', function () {
        context.shuffle()
      }, false)
      window.addEventListener('scroll', function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop + window.innerHeight >= document.body.clientHeight) {
          context.addItems()
        }
      })
    },
    components: {
      Waterfall,
      WaterfallSlot
    }
  }

</script>

<style scoped>
  .item {
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    font-size: 1.2em;
  }
</style>
