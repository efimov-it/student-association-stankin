import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WPPage from '../components/wp-page.vue'
import WPNews from '../views/news.vue'

Vue.use(VueRouter)

  let routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/page/:id',
    name: 'WPPage',
    component: WPPage
  },
  {
    path: '/news/:id',
    name: 'WPNews',
    component: WPNews
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router