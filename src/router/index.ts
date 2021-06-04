import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/application',
    name: 'Application',
    component: () => import(/* webpackChunkName: "Application" */ '../views/Application.vue')
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: () => import(/* webpackChunkName: "Application" */ '../views/Exercises.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
