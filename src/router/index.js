import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Inventory from '../views/Inventory.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [{
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
    component: () => import(/* webpackChunkName: "sales_history_detail" */ '../views/Detail.vue'),
    meta: {
      login: true
    }

  },
  {
    path: '/sales_history',
    name: 'Sales_history',
    component: () => import(/* webpackChunkName: "sales_history" */ '../views/Sales_history.vue'),
    meta: {
      login: true
    }
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import(/* webpackChunkName: "inventory" */ '../views/Inventory.vue'),
    meta: {
      login: true
    }
  },
  {
    path: '/sale',
    name: 'Sale',
    component: () => import( /* webpackChunkName: "sale" */ '../views/Sale.vue'),
    meta: {
      login: true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser;
  let authRequired = to.matched.some(route => route.meta.login);
  if (!user && authRequired) {
    next('Login');
  } else {
    next();
  }
});

export default router