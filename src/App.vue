<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Login from "./views/Login";
import Inventory from "./views/Inventory";
import Sale from "./views/Sale";
import Sales_history from "./views/Sales_history"

export default {
  name: "App",
  components: {
    Navbar,
    Login,
    Inventory,
    Sale,
    Sales_history
  },

  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
h2 {
  font-family: "Ubuntu", sans-serif;
}
</style>
