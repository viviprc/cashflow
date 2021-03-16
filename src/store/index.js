import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import Users from './users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    sales: [],
  },
  mutations: {
    GET_PRODUCTS(state, products) {
      state.products = products
    },
    ADD_PRODUCT(state, payload) {
      state.products.push(payload)
    },
    GET_SALES(state, sales) {
      state.sales = sales
    },
  },
  actions: {
    init({ dispatch }) {
      return dispatch('Users/getInitialUsers')
    },
    getProducts({ commit }) {
      firebase
        .firestore()
        .collection('products')
        .onSnapshot((snapshot) => {
          let products = []
          snapshot.forEach((p) => {
            products.push({
              id: p.id,
              data: p.data(),
            })
          })
          commit('GET_PRODUCTS', products)
        })
    },
    getSales({ commit }) {
      firebase
        .firestore()
        .collection('sales')
        .onSnapshot((snapshot) => {
          let sales = []
          snapshot.forEach((s) => {
            sales.push({
              id: s.id,
              data: s.data(),
            })
          })
          commit('GET_SALES', sales)
        })
    },
    addProduct({ commit }, product) {
      firebase.firestore().collection('products').add(product),
        commit('ADD_PRODUCT', product)
    },
    removeProduct({ commit }, id) {
      firebase.firestore().collection('products').doc(id).delete()
    },
    updateProduct({ commit }, payload) {
      firebase
        .firestore()
        .collection('products')
        .doc(payload.id)
        .update(payload.data)
    },
    removeSale({ commit }, id) {
      firebase.firestore().collection('sales').doc(id).delete()
    },
    addSale({ commit }, payload) {
      const batch = firebase.firestore().batch()
      payload.products.forEach((product) => {
        if (!product.id) {
          return
        }
        const productRef = firebase
          .firestore()
          .collection('products')
          .doc(product.id)
        batch.update(productRef, {
          stock: product.data.stock - product.quantity,
        })
      })
      batch.commit()
      firebase
        .firestore()
        .collection('sales')
        .add({
          date: Date.now(),
          ...payload,
        })
    },
  },
  modules: {
    Users,
  },
})
