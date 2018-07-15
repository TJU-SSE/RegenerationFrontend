<template>
  <div class="main-container">
    <transition name="slide-fade">
      <div class="login-form" v-if="!register && show">
        <div class="username">
          <input type="text" placeholder="账号" v-model="username" autofocus>
          <i class="fa fa-user-circle"></i>
        </div>
        <div class="password">
          <input type="password" v-model="password" placeholder="密码" @keyup.enter="onSubmit">
          <i class="fa fa-arrow-right"></i>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <h2 v-if="show">RENGENATION <span>v1.0</span></h2>
    </transition>
  </div>
</template>

<script>

  import {Login} from '../service/getData'

  export default {
    data () {
      return {
        title: '登录',
        id: '',
        username: '',
        password: '',
        repassword: '',
        show: false,
        register: false,
        text: '注册'
      }
    },
    watch: {
      register: function (val) {
        if (val === true) {
          this.text = '登录'
        } else {
          this.text = '注册'
        }
      }
    },
    methods: {
      onSubmit () {
        if (!this.register) {
          if (this.username === '') {
            this.$message({
              message: '请输入用户名',
              type: 'warning'
            })
            return
          }
          if (this.password === '') {
            this.$message({
              message: '请输入密码',
              type: 'warning'
            })
            return
          }
          Login(this.username, this.password).then(res => {
            if (res.code === '0') {
              this.$session.start()
              this.$session.set('Auth', this.id)
              this.$router.push('/home')
            } else if (res.err === 'Login error') {
              this.$message({
                message: '账户名或密码错误',
                type: 'error'
              })
            }
          }).catch(e => {
            console.log(e)
            this.$message({
              message: '网络故障',
              type: 'error'
            })
          })
        }
      }
    },
    mounted () {
      document.title = this.title
      document.body.style.height = '100%'
      this.show = true
    }
  }
</script>

<style scoped>
  /* animation */
  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(30px);
    opacity: 0;
  }

  .slide-up-enter-active {
    transition: all .5s ease;
  }
  .slide-up-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-up-enter, .slide-up-leave-active {
    transform: translateY(30px);
    opacity: 0;
  }

  /* main */
  .main-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../../static/img/loginBg.jpg") no-repeat center center fixed;
    background-size: cover;
    -webkit-background–size: cover;
  }

  /* login form */
  .login-form {
    position: absolute;
    width: 300px;
    height: 120px;
    left: 9%;
    bottom: 50%;
    background-color: black;
    border-radius: 10px;
    opacity: 0.8;
  }

  .register-form {
    position: absolute;
    width: 300px;
    height: 180px;
    left: 9%;
    bottom: 50%;
    background-color: black;
    border-radius: 10px;
    opacity: 0.8;
  }

  .username {
    width: 100%;
    margin: 6px;
    margin-left: 10px;
    padding-top: 5px;
  }

  .username input {
    font-size: 0.8em;
    width: 90%;
    height: 35px;
    color: white;
    background: none;
    border: transparent;
  }

  .username i {
    position: absolute;
    color: white;
    transform: scale(1.3, 1.3);
    margin-top: 8px;
    margin-left: -15px;
  }

  .username input:focus {
    font-size: 0.9em;
  }

  .password {
    width: 100%;
    margin: 4px;
    margin-top: 26px;
    margin-left: 10px;
  }

  .password input {
    font-size: 0.8em;
    text-indent: 5px;
    width: 80%;
    height: 30px;
    color: white;
    background: none;
    border-radius: 5px;
    border: 2px solid white;
  }

  .password input:focus {
    font-size: 0.9em;
  }

  .password i {
    position: absolute;
    color: white;
    margin-top: 8px;
    margin-left: 10px;
  }

  h2 {
    font-size: 2.0em;
    position: fixed;
    bottom: 40px;
    left: 9%;
    color: white;
    font-family: Chalkboard, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  h2 > span {
    opacity: 0.6;
    font-size: 0.5em;
  }

  a {
    color: white;
    position: fixed;
    bottom: 45%;
    left: 9%;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
