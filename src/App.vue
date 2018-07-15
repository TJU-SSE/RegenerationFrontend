<template>
  <div id="app" :class="[designerBugFix ? 'active':'']">
    <router-view name="headerBar"></router-view>
    <router-view name="mainPage"></router-view>
    <myFooter></myFooter>
  </div>
</template>

<script>
  import myFooter from './views/footer.vue'
  export default {
    name: 'app',
    data () {
      return {
        designerBugFix: false
      }
    },
    components: {
      myFooter
    },
    watch: {
      $route () {
        if (this.$route.name === 'designerHome') {
//          this.designerBugFix = true
        } else {
          this.designerBugFix = false
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  #app.active {
    width: 110%;
  }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p,
  blockquote, pre, a, abbr, acronym, address, big,
  cite, code, del, dfn, em, font, img,
  ins, kbd, q, s, samp, small, strike,
  strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  center, u, b, i {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-weight: normal;
    font-style: normal;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline
  }
  body {
    line-height: 1
  }
  :focus {
    outline: 0
  }
  ol, ul {
    list-style: none
  }
  table {
    border-collapse: collapse;
    border-spacing: 0
  }
  blockquote:before, blockquote:after, q:before, q:after {
    content: ''
  }
  blockquote, q {
    quotes: "" ""
  }
  input, textarea {
    margin: 0;
    padding: 0
  }
  hr {
    margin: 0;
    padding: 0;
    border: 0;
    color: #000;
    background-color: #000;
    height: 1px
  }
</style>
