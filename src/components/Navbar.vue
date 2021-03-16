<template>
  <v-container fluid class="navbar">
    <!-- Navbar -->
    <v-app-bar app dark color="blue darken-4">
      <v-app-bar-nav-icon
        id="Menu"
        v-if="authenticated"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <h4>CASHFLOW</h4></v-app-bar
    >
    <v-sheet height="100%" class="overflow-hidden" style="position: relative">
      <v-container class="fill-height">
        <v-row align="center" justify="center"> </v-row>
      </v-container>
      <!-- Sidebar -->
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ userName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list class="sideBar" v-if="authenticated" dense>
          <router-link to="/inventory">
            <v-list-item id="Inventory">
              <v-list-item-icon>
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Inventario</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/sale">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-cart</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Vender</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/sales_history">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-timetable</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Historial de ventas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link to="/admin">
            <v-list-item id="Admin">
              <v-list-item-icon>
                <v-icon>mdi-account-cog</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Administrar usuarios</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <v-list-item id="Logout" @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-account-arrow-right-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: 'Navbar',
  data() {
    return {
      drawer: null,
      user: '',
    }
  },
  computed: {
    ...mapState('Users', ['users']),
    userName() {
      const user = this.users.find((u) => u.data.email === this.user)
      return user ? user.data.name : ''
    },
    authenticated() {
      return !!this.user
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user ? user.email : ''
    })
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('login')
        })
    },
  },
}
</script>
<style lang="scss">
div.navbar {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 0;
}
.sideBar {
  a {
    text-decoration: none;
  }
}
</style>
