import firebase from 'firebase/app'
import 'firebase/firestore'
import { getDayTimeRange } from '../../helpers/date'

export default {
  namespaced: true,
  state: {
    sales: {},
  },
  getters: {
    getSalesByDate: (state) => (date) => state.sales[date],
  },
  mutations: {
    GET_SALES(state, { sales, date }) {
      state.sales = { ...state.sales, [date]: sales }
    },
  },
  actions: {
    getSales({ commit, getters }, { date, forceUpdate = false }) {
      if (getters.getSalesByDate(date) && !forceUpdate) return

      const [floor, ceil] = getDayTimeRange(date)

      firebase
        .firestore()
        .collection('sales')
        .where('date', '>=', floor)
        .where('date', '<=', ceil)
        .get()
        .then((snapshot) => {
          let sales = []

          snapshot.forEach((s) => {
            sales.push({
              id: s.id,
              data: s.data(),
            })
          })
          commit('GET_SALES', { sales, date })
        })
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
}
