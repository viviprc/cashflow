import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export default {
    namespaced: true,
    state: {
        users: [],

    },
    getters: {

    },
    mutations: {
        ADD_USER(state, user) {
            state.users.push(user)
        },
        GET_USERS(state, users) {
            state.users = users
        }
    },
    actions: {

        addUser({
            commit
        }, user) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((resp) => {
                    const userWithId = {
                        ...user,
                        uid: resp.user.uid
                    }
                    firebase.firestore().collection('users').add(userWithId),
                        commit('ADD_USER', userWithId)
                })
        },
        getInitialUsers({
            commit
        }) {
            return firebase.firestore().collection('users').get().then(doc => {
                let users = []
                doc.forEach((u) => {
                    users.push({
                        id: u.id,
                        data: u.data()
                    });
                })
                commit('GET_USERS', users)

            })
        },
        getUsers({
            commit
        }) {
            return firebase.firestore().collection('users').onSnapshot((snapshot) => {
                let users = []
                snapshot.forEach((u) => {
                    users.push({
                        id: u.id,
                        data: u.data()
                    });
                })
                commit('GET_USERS', users)
            })
        },
        updateUser({
            commit
        }, payload) {
            firebase.firestore().collection('users').doc(payload.id).update(payload.data)
        },
    },

}