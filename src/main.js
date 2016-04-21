import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsItemView from './components/newsitemview.vue'
import NewsItemDetailView from './components/newsitemdetail.vue'
import UserView from './components/userview.vue'
import infiniteScroll from 'vue-infinite-scroll'
import {
  domain,
  showDomain,
  showInfo,
  fromNow
} from './filters.js'


Vue.config.debug = process.env.NODE_ENV !== 'production'
Vue.config.silent = !Vue.config.debug
Vue.use(VueRouter)
Vue.use(infiniteScroll)
Vue.filter('fromNow', fromNow)
Vue.filter('domain', domain)
Vue.filter('showDomain', showDomain)
Vue.filter('showInfo', showInfo)
const router = new VueRouter()
const App = Vue.extend(require('./app.vue'))
router.map({
  '/new': {
    name: 'new',
    component: NewsItemView
  },

  '/top': {
    name: 'top',
    component: NewsItemView
  },
  '/show': {
    name: 'show',
    component: NewsItemView
  },
  '/ask': {
    name: 'ask',
    component: NewsItemView
  },
  '/job': {
    name: 'job',
    component: NewsItemView
  },
  '/item/:id': {
    name: 'item',
    component: NewsItemDetailView
  },
  '/user/:id': {
    name: 'user',
    component: UserView
  }
})
router.redirect({
  '*': '/new'
})
router.start(App, '#app')
