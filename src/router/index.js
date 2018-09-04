import Vue from 'vue'
import Router from 'vue-router'

import ServiceTest from '@/views/test/serviceTest'
import WaterfallTest from '@/views/test/waterfallTest'
import WaterfallWithImg from '@/views/test/waterfallTestWithImg'
import Swiper from '@/views/Swiper.vue'

import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Runway from '@/views/Runway.vue'

import HeaderBar from '@/views/HeaderBar'
import HomeHeaderBar from '@/views/HomeHeaderBar'
import News from '@/views/News'
import NewsDetail from '@/views/NewsDetail'
import Contact from '@/views/Contact'

import Designer from '@/views/Designer'
import DesignerDetail from '@/views/DesignerDetail'
import DesignerPro from '@/views/DesignerPro'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      components: {
        headerBar: null,
        mainPage: Login
      }
    },
    {
      path: '/swiper-demo',
      name: 'swiper',
      components: {
        headerBar: HeaderBar,
        mainPage: Swiper
      }
    },
    {
      path: '/test/service',
      name: 'serverTest',
      components: {
        headerBar: HeaderBar,
        mainPage: ServiceTest
      }
    },
    {
      path: '/test/waterfall',
      name: 'waterfallTest',
      components: {
        headerBar: HeaderBar,
        mainPage: WaterfallTest
      }
    },
    {
      path: '/test/waterfallWithImg',
      name: 'waterfallTestWithImg',
      component: WaterfallWithImg
    },
    {
      path: '/home',
      name: 'Home',
      components: {
        headerBar: HomeHeaderBar,
        mainPage: Home
      }
    },
    {
      path: '/news',
      name: 'news',
      components: {
        headerBar: HeaderBar,
        mainPage: News
      },
      curPathName: 'news'
    },
    {
      path: '/news/:newsId',
      name: 'newsDetail',
      components: {
        headerBar: HeaderBar,
        mainPage: NewsDetail
      }
    },
    {
      path: '/runway',
      name: 'runway',
      components: {
        headerBar: HeaderBar,
        mainPage: Runway
      },
      curPathName: 'runway'
    },
    {
      path: '/contact',
      name: 'contact',
      components: {
        headerBar: HeaderBar,
        mainPage: Contact
      }
    },
    {
      path: '/designer',
      name: 'designerHome',
      components: {
        headerBar: HeaderBar,
        mainPage: Designer
      }
    },
    {
      path: '/runway/:showId',
      name: 'show',
      components: {
        headerBar: HeaderBar,
        mainPage: DesignerDetail
      }
    },
    {
      path: '/designer/:designerId',
      name: 'designerPro',
      components: {
        headerBar: HeaderBar,
        mainPage: DesignerPro
      }
    }
  ]
})

export default router
