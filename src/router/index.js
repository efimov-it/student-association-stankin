import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/'
import NewsList from '../views/news-list/';
import WPPage from '../components/wp/page/'
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
    path: '/news/',
    name: 'NewsList',
    component: NewsList
  },
  {
    path: '/news/:id',
    name: 'WPNews',
    component: WPNews
  },
  {
    path: '/category/:id',
    name: 'CategoryList',
    component: NewsList
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router