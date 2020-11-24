<template>
   <v-container>
     <SalesTable />
  </v-container>
</template>
<script>
import SalesTable from '../components/SalesTable'
import parseDate from '../helpers/date'
import { mapState, mapActions } from "vuex";
export default {
  name:'Sales_history',
  components:{
    SalesTable

  },
  data(){
    return{
      search:'',
      headers: [
          {
            text: 'Fecha',
            align: 'start',
            sortable: true,
            value: 'data.date',
          },
          { text: 'Modo de pago', value: 'data.type' },
          { text: 'Total', value: 'data.total' },
          { text: 'Detalle', value: 'mdi-eye-plus' },
        ],
    }
  },
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
.historialList{
  a {
    text-decoration: none;
  }
}
</style>