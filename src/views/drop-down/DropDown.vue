<template>
  <div class="drop-down" @mouseleave="removeDrop">
    <button @click="down"><strong>{{desc}}</strong></button>
    <ul :class="[dropFlag ? 'active': '']" id="drop">
      <li v-for="(item, index) in opts" :key="index" v-if="item.head.length > 0">
        <ul>
          <li class="list-item list-header">{{item.head}}</li>
          <li v-for="(show, index) in item.items" :key="index" class="list-item"><router-link :to="{ name: 'show', params: { showId: show.id }}">{{show.name}}</router-link></li>
          <hr>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dropFlag: false
      }
    },
    props: ['opts', 'desc'],
    methods: {
      down (e) {
        this.dropFlag = !this.dropFlag
      },
      removeDrop (e) {
        if (this.dropFlag) {
          this.dropFlag = false
        }
      }
    }
  }
</script>

<style scoped>
  .drop-down {
    background-color: white;
    width: 25%;
    height: 40px;
  }

  a {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  button {
    padding: 4px;
    border: none;
    width: 90%;
    background-color: white;
    font-size: 1.5em;
  }

  ul {
    background-color: white;
  }

  i {
    float: right;
    margin: 15px 5px 15px 0;
  }

  #drop {
    display: none;
    position: absolute;
    border: 1px solid darkgray;
    width:100%;
    height: 300px;
    overflow-y: auto;
  }

  #drop.active {
    display: block;
    border-top: 1px solid;
  }

  li {
    text-align: left;
    padding: 5px;
  }

  .list-header {
    margin: 3px 0;
    font-weight: bold;
    color:#cc141e;
  }

  .list-item {
    width: 100%;
    letter-spacing: .1em;
    color: #cc141e;
    font-family: "FranklinGothic", Helvetica, sans-serif;
  }

  a {
    color: black;
    padding-left: 2px;
    text-decoration: none !important;
  }

  hr {
    margin: -3px;
  }

  @media screen and (max-width: 1250px){
    .drop-down {
      width: 20%;
    }

    button {
      font-size: 0.5em;
    }
  }

  @media (min-device-width: 320px) and (max-device-width: 568px){
    .drop-down {
      width: 30%;
    }

    button {
      font-size: 0.6em;
    }
  }

  /* For ipad pro */
  @media (min-device-width: 568px) and (max-device-width: 1100px) {
    .drop-down {
      width: 30%;
    }

    button {
      font-size: 0.6em;
    }
  }

</style>
