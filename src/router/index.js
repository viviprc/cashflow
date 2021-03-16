import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import Users from '../store/users'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'Sale',
  },
  {
    path: '*',
    redirect: 'Sale',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/sales_history/:id',
    name: 'Detail',
    component: () =>
      import(
        /* webpackChunkName: "sales_history_detail" */ '../views/Detail.vue'
      ),
    props: true,
    meta: {
      seller: true,
      login: true,
    },
  },
  {
    path: '/sales_history',
    name: 'Sales_history',
    component: () =>
      import(
        /* webpackChunkName: "sales_history" */ '../views/Sales_history.vue'
      ),
    meta: {
      seller: true,
      login: true,
    },
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () =>
      import(/* webpackChunkName: "inventory" */ '../views/Inventory.vue'),
    meta: {
      login: true,
    },
  },
  {
    path: '/sale',
    name: 'Sale',
    component: () => import(/* webpackChunkName: "sale" */ '../views/Sale.vue'),
    meta: {
      seller: true,
      login: true,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () =>
      import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: {
      login: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser
  const dbUser = user
    ? Users.state.users.find((u) => u.data.uid === user.uid)
    : null
  const role = dbUser ? dbUser.data.role : ''
  const authRequired = to.matched.some((route) => route.meta.login)
  const sellerPermission = to.matched.some((route) => route.meta.seller)

  if (!user && authRequired) {
    next('Login')
  } else if (!user) {
    next()
  } else if (user && role == 'admin') {
    next()
  } else if (user && role == 'seller' && sellerPermission) {
    next()
  } else {
    next(false)
  }
})

export default router
