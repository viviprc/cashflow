<template>
  <v-container>
    <v-row justify="center">
      <v-date-picker v-model="date"></v-date-picker>
    </v-row>

    <SalesTable :sales="currentDateSales" />

    <v-card class="my-2">
      <v-card-title>Venta Total Diaria {{ date }} </v-card-title>
      <v-card-title>${{ dateTotal }}</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SalesTable from '../components/SalesTable'
import { toInternationalFormat } from '../helpers/date'

export default {
  name: 'Sales_history',
  components: {
    SalesTable,
  },
  data() {
    return {
      date: toInternationalFormat(new Date()),
      cleanup: () => {},
    }
  },
  mounted() {
    this.getSales({ date: this.date, forceUpdate: true })
  },
  computed: {
    ...mapState('Sales', ['sales']),
    currentDateSales() {
      return this.sales[this.date] || []
    },
    dateTotal() {
      return this.currentDateSales.reduce(
        (acumulado, actual) => acumulado + actual.data.total,
        0
      )
    },
  },
  methods: {
    ...mapActions('Sales', ['getSales']),
  },
  watch: {
    date(dateValue) {
      this.getSales({ date: dateValue })
    },
  },
}
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
