import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import Users from './users'
import Sales from './sales'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
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
  },
  modules: {
    Users,
    Sales,
  },
})
