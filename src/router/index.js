import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/loginReg/login.vue'
import reg from '../components/loginReg/reg.vue'
import loginReg from '../components/loginReg/loginReg.vue'
import failure from '../components/error/error.vue'
// import musichead from '../components/header/musichead.vue'
import myMusic from '../components/myMusic/myMusic.vue'
import musicCenter from '../components/musicCenter/musicCenter.vue'
import soclai from '../components/soclai/soclai.vue'
import index from '../components/index/index.vue'
import search from '../components/search/search.vue'
import searchBody from '../components/search/searchBody.vue'
import searchResult from '../components/searchResult/searchResult.vue'
import hotSinger from '../components/search/hotSinger.vue'
import singerHomepage from '../components/search/singerHomepage.vue'
import recommendPlaylist from '../components/musicCenter/recommendPlaylist.vue'
import discuss from '../components/discuss/discuss.vue'
import musicInfo from '../components/musicInfo/musicInfo.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/reg',
      component: reg
    },
    {
      path: '/loginReg',
      component: loginReg
    },
    {
      path: '/',  // 要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。
      name: 'index',
      component: index,
      children: [
        {
          path: '/error',
          component: failure
        },
        {path: '/myMusic', component: myMusic},
        {
          path: '/',
          name:'musicCenter',
          component: musicCenter,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: '/recommendPlaylist/:recommendId',
          component: recommendPlaylist,
          meta: {
            keepAlive: false // 不需要被缓存
          }
        },
        {path: '/soclai', component: soclai},
        {path:'/discuss/:keyWord',component:discuss},
        {path:'/musicInfo/:keyWord',component:musicInfo},
        {
          path: '/search',
          name:'search',
          component: search,
          children: [
            {
              path: '/search/:keyWord', // 跨页面传值 并渲染searchResult 父组建中必须有router-view
              component: searchResult
            },
            {
              path: '/search',
              component: searchBody
            },
            {
              path: '/hotSinger',
              name:'hotSinger',
              component: hotSinger,
              children: [
                {
                  path: '/hotSinger/:id',
                  component: singerHomepage,
                  meta: {
                    keepAlive: false // 不需要被缓存
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
