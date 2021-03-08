import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Favorite from '../views/Favorite.vue'
import ViewBook from '../views/ViewBook.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: false
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: Favorite,
    props: false
  },
  {
    path: '/viewbook/:bookid',
      name: 'viewbook',
      component: ViewBook,
      prop: false
  }

]

const router = new VueRouter({
  routes
})

export default router
