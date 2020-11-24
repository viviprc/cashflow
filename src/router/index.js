import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import Users from '../store/users'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: 'Sale'
  },
  {
    path: '*',
    redirect: 'Sale'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sales_history/:id',
    name: 'Detail',
    component: () => import( /* webpackChunkName: "sales_history_detail" */ '../views/Detail.vue'),
    props: true,
    meta: {
      admin: true,
      seller: true
    }

  },
  {
    path: '/sales_history',
    name: 'Sales_history',
    component: () => import( /* webpackChunkName: "sales_history" */ '../views/Sales_history.vue'),
    meta: {
      admin: true,
      seller: true
    }
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import( /* webpackChunkName: "inventory" */ '../views/Inventory.vue'),
    meta: {
      admin: true,
      seller: true
    }
  },
  {
    path: '/sale',
    name: 'Sale',
    component: () => import( /* webpackChunkName: "sale" */ '../views/Sale.vue'),
    meta: {
      admin: true,
      seller: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import( /* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: {
      admin: true,
      seller:true
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
  const dbUser = Users.state.users.find(u => u.data.uid === user.uid);
  // const dataUser = dbUser.data.role;

  // const role = dbUser ? dbUser.data.role : ''
  let authRequired = to.matched.some(route => route.meta.admin);
  // let sellerPermission = to.matched.some(route => route.meta.seller);

  console.log(dbUser)
  if (!user && authRequired) {
    next('/login');
  } else if (dbUser && !authRequired) {
    next('/sale');
  } else {
    next()
  }
});

// router.beforeEach((to, from, next) => {
//   // let user = firebase.auth().currentUser;
//   const dbUser = Users.state.users.find(u => u.data.uid === user.uid)
//   const role = dbUser ? dbUser.data.role : ''
//   // let authRequired = to.matched.some(route => route.meta.tolog);
//   let sellerPermission = to.matched.some(route => route.meta.seller);

//   if (role === seller && sellerPermission) {
//     next('/sale');
//   } else if (role === seller && !adminPermission) {
//     next('/sale');
//   } else {
//     next()
//   }
// });


export default router