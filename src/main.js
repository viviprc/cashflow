import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app'


var firebaseConfig = {
  apiKey: "AIzaSyDIIvhLZUShhpKYQOPJ3RLgXbNdFrzXmdU",
  authDomain: "cashflow-1ba5a.firebaseapp.com",
  databaseURL: "https://cashflow-1ba5a.firebaseio.com",
  projectId: "cashflow-1ba5a",
  storageBucket: "cashflow-1ba5a.appspot.com",
  messagingSenderId: "889248759721",
  appId: "1:889248759721:web:02216daa0c02b4fb864eb8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(async function (user) {
  if (user) {
    await store.dispatch('init')
  }

  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})

Vue.config.productionTip = false