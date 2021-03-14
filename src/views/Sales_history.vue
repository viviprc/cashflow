<template>
  <v-container>
    <SalesTable />
  </v-container>
</template>
<script>
import SalesTable from "../components/SalesTable";
import { mapActions } from "vuex";
export default {
  name: "Sales_history",
  components: {
    SalesTable,
  },
  created() {
    this.getSales();
  },
  methods: {
    ...mapActions(["getSales"]),
  },
};
</script>
<style lang="scss">
.container {
  color: #616161;
}
.historialList {
  a {
    text-decoration: none;
  }
}
</style>