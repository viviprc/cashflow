<template>
  <v-container class="sales-history">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header class="sales-history--title">
          Fecha seleccionada: {{ formattedDate }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row justify="center">
            <v-date-picker v-model="date"></v-date-picker
          ></v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-card class="my-2">
      <v-card-title>Venta total: ${{ dateTotal }}</v-card-title>
    </v-card>

    <SalesTable :sales="currentDateSales" />
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
    formattedDate() {
      return this.date.split('-').reverse().join('/')
    },
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
.sales-history {
  .sales-history--title {
    font-size: 20px;
    font-weight: 500;
    padding: 16px;
  }
}
</style>
