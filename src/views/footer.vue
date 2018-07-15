<template>
  <div class="my-footer">
    <img src="../../static/img/regeneration主页logo-01.png" alt="logo">
    <p class="first-line">RENGERATION.CN © REGEN. INC. ALL RIGHTS RESERVED.</p>
    <p class="second-line">REGENERATION IS OPERATED BY REGEN INC.</p>
  </div>
</template>

<script>
  export default {
    name: 'footer',
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>

  @font-face {
    font-family: 'qingkebenyue';
    src:url(../assets/fonts/FZQKBYSJW.ttf);
  }

  .my-footer {
    height: 180px;
    width: 100%;
    background: linear-gradient(70deg, RGBA(50, 53, 64, 1.00) 70%, RGBA(50, 53, 64, 1.00));
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    align-items: center;
  }

  .first-line {
    margin-top: 10px;
  }

  .second-line {
    margin-top: -8px;
  }

  .my-footer > img {
    margin-top: 30px;
    height: 60px;
  }

  .my-footer p {
    color: white;
    font-size: 1.3em;
    font-family: 'qingkebenyue';
  }
</style>
