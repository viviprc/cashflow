<template>
  <v-container>
    <h2 class="text-center pa-3">Historial de ventas</h2>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Fecha</th>
            <th class="text-left">Modo de pago</th>
            <th class="text-left">Total</th>
            <th class="text-left">Detalle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sales" :key="item.id">
            <td>{{ parseDate(item.data.date) }}</td>
            <td>{{ item.data.type }}</td>
            <td>{{ item.data.total }}</td>
            <td>
              <router-link :to="`sales_history/${item.id}`"
                ><v-icon>mdi-magnify</v-icon></router-link
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div>
      <v-divider></v-divider>
      <h3 class="text-right pa-15">TOTAL:$ {{totalAmount}}</h3>
    </div>
  </v-container>
</template>
<script>
import parseDate from '../helpers/date'
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["sales"]),
    totalAmount() {
      return this.sales.reduce(
        (acumulado, actual) => acumulado + actual.data.total,
        0
      );
    },
  },
  created() {
    this.getSales();
  },
  methods: {
    ...mapActions(["getSales"]),
    parseDate
  },
};
</script>
<style lang="scss">
.container {
  color: #616161;
}
</style>