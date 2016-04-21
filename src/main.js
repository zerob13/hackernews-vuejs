import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsItemView from './components/newsitemview.vue'
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.debug = process.env.NODE_ENV !== 'production'
Vue.use(VueRouter)
Vue.use(infiniteScroll)
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
  }
})
router.redirect({
  '*': '/new'
})
router.start(App, '#app')
