import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    sales:[]
  },
  mutations: {
    GET_PRODUCTS(state, products) {
      state.products = products
    },
    ADD_PRODUCT(state, payload) {
      state.products.push(payload);
      console.log(payload)
    },
    GET_SALES(state, sales){
      state.sales = sales
    }
  },
  actions: {
    getProducts({
      commit
    }) {
      firebase.firestore().collection('products').onSnapshot((snapshot) => {
        let products = []
        snapshot.forEach((p) => {
          products.push({
            id: p.id,
            data: p.data()
          });
        })
        commit('GET_PRODUCTS', products)
      })
    },
    getSales({
      commit
    }) {
      firebase.firestore().collection('sales').onSnapshot((snapshot) => {
        let sales = []
        snapshot.forEach((s) => {
          sales.push({
            id: s.id,
            data: s.data()
          });
        })
        commit('GET_SALES', sales)
      })
    },
    addProduct({
      commit
    }, product) {
      firebase.firestore().collection('products').add(product),
        commit('ADD_PRODUCT', product)
    },
    removeProduct({
      commit
    }, id) {
      firebase.firestore().collection('products').doc(id).delete()
    },
    updateProduct({
      commit
    }, payload) {
      firebase.firestore().collection('products').doc(payload.id).update(payload.data)
    },
    addSale({
      commit
    }, payload) {
      const batch = firebase.firestore().batch()
      payload.products.forEach(product => {
        const productRef = firebase.firestore().collection('products').doc(product.id)
        batch.update(productRef, {
          stock: product.data.stock - product.quantity
        })
      })
      batch.commit()
      firebase.firestore().collection('sales').add({
        date: Date.now(),
        ...payload
      })
    }
  },
  modules: {}
})

// {
//   category: "Pinturas",
//   name: "MARTILLO STHT51391-40",
//   sku: 159,
//   stock: 50,
//   trademark: "STANLEY",
//   price: 8290,
// },
// {
//   category: "Pinturas",
//   name: "ESMALTE AL AGUA PREMIUM SATINADO AZUL LASHA",
//   sku: 237,
//   stock: 23,
//   trademark: "KOLOR",
//   price: 20990,
// },
// {
//   category: "Pinturas",
//   name: 'SET DE PUNTAS IMPACTO #2x2" 5P',
//   sku: 262,
//   stock: 60,
//   trademark: "UBERMANN",
//   price: 2890,
// },
// {
//   category: "Pinturas",
//   name: "MONOMANDO FLEXIBLE PARA LAVAPLATOS NEGRO",
//   sku: 305,
//   stock: 15,
//   trademark: "SENSI DACQUA",
//   price: 29990,
// },
// {
//   category: "Pinturas",
//   name: "2 x 2 x 3,20 M PINO DIMENSIONADO VERDE",
//   sku: 356,
//   stock: 50,
//   trademark: "GENERICO",
//   price: 1210,
// },
// {
//   category: "Pinturas",
//   name: "1 x 6 x 3,20 M PINO DIMENSIONADO VERDE",
//   sku: 375,
//   stock: 32,
//   trademark: "GENERICO",
//   price: 2290,
// },
// {
//   category: "Pinturas",
//   name: "PLAFON LED 31 CM 12 W",
//   sku: 392,
//   stock: 10,
//   trademark: "JUST HOME COLLECTION",
//   price: 18990,
// },
// {
//   category: "Pinturas",
//   name: "ASIENTO WC REDONDO PLASTICO BLANCO",
//   sku: 408,
//   stock: 36,
//   trademark: "FANALOZA",
//   price: 12490,
// },
// {
//   category: "Pinturas",
//   name: "CERRADURA DORMITORIO BOLA BRONCE ENVEJECIDO FX",
//   sku: 452,
//   stock: 32,
//   trademark: "FIXSER",
//   price: 9990,
// },
// {
//   category: "Pinturas",
//   name: "ADHESIVO CERAMICO EN POLVO STANDARD 25 KG",
//   sku: 518,
//   stock: 48,
//   trademark: "BEKRON",
//   price: 2490,
// },