import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.config.debug = process.env.NODE_ENV !== 'production'
Vue.use(VueRouter)
const router = new VueRouter()
const App = Vue.extend(require('./app.vue'))
router.map({
  '/home': {
    name: 'homepage',
    component: App //TODO: template use app as component
  },
  '/new': {
    name: 'newest',
    component: App //TODO: template use app as component
  },

  '/comments': {
    name: 'comments',
    component: App //TODO: template use app as component
  },
  '/show': {
    name: 'show',
    component: App //TODO: template use app as component
  },
  '/ask': {
    name: 'ask',
    component: App //TODO: template use app as component
  },
  '/job': {
    name: 'job',
    component: App //TODO: template use app as component
  }
})
router.redirect({
  '*': '/home'
})
router.start(App, '#app')
