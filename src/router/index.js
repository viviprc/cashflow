import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sales_history/:id',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
  },
  {
    path: '/sales_history',
    name: 'Sales_history',
    component: () => import('../views/Sales_history.vue'),
  },
  {
    path: '/inventory',
    name: 'Inventory',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Inventory.vue')
  },
  {
    path: '/sale',
    name: 'Sale',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Sale.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router