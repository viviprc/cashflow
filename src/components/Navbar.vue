<template>
  <v-container fluid class="navbar">
            <v-app-bar app dark color="blue darken-4">
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <h4>CASHFLOW</h4></v-app-bar
        >
        <v-sheet
          height="100%"
          class="overflow-hidden"
          style="position: relative"
        >
          <v-container class="fill-height">
            <v-row align="center" justify="center"> </v-row>
          </v-container>

          <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Usuario</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item v-for="item in items" :key="item.title" @click="goTo(item.to)" link>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-sheet>

  </v-container>
</template>
<script>
import firebase from 'firebase'
export default {
  name: "Navbar",
  data() {
    return {
      drawer: null,
      items: [
        { title: "Iniciar sesión", icon: "mdi-login-variant", to:'login'},
        { title: "Inventario", icon: "mdi-format-list-bulleted", to:'inventory' },
        { title: "Vender", icon: "mdi-cart", to:'sale' },
        { title: "Historial de ventas", icon: "mdi-timetable", to:'sales_history' },
        { title: "Cerrar sesión", icon: "mdi-account-arrow-right-outline", to:'logout' },
      ],
    };
  },
  methods:{
    goTo(path){
      const fullpath = `/${path}`;
      if(path == 'logout'){
        this.logout()

      }else if(this.$router.history.current.path !== fullpath){
        this.$router.push(fullpath)
      }
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$router.push("login"));
    },
  }
};
</script>
<style lang="scss">
div.navbar{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 0;
}
 
</style>