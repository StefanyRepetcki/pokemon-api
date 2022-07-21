import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: () => import(/* webpackChunkName: "list" */ '../views/List.vue')
  },
  {
    path: '/description/:id',
    name: 'Description',
    component: () => import(/* webpackChunkName: "description" */ '../views/Description.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
