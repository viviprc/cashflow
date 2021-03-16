<template>
  <!-- Tabla de ventas -->
  <v-data-table
    :headers="headers"
    :items="parsedSales"
    :search="search"
    :items-per-page="-1"
    hide-default-footer
    class="sales-history--table elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="sales-history--table-title"
          >Historial de Ventas</v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="d-flex ml-3" @click="goToDetail(item)">
        mdi-eye-plus
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import parseDate from '../helpers/date'

export default {
  name: 'SalesTable',
  data: () => ({
    search: '',
    dialog: false,
    headers: [
      {
        text: 'Fecha',
        align: 'start',
        value: 'data.date',
      },
      { text: 'Modo de pago', value: 'data.type' },
      { text: 'Total', value: 'data.total' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    currentSales: [],
  }),
  props: ['sales'],
  watch: {
    sales(newSales) {
      this.currentSales = [...newSales].sort(
        (a, b) => new Date(a.data.date) - new Date(b.data.date)
      )
    },
  },
  computed: {
    parsedSales() {
      return this.currentSales.map((s) => ({
        ...s,
        data: {
          ...s.data,
          date: parseDate(s.data.date),
        },
      }))
    },
  },
  methods: {
    goToDetail(item) {
      this.$router.push(`sales_history/${item.id}`)
    },
  },
}
</script>

<style lang="scss">
.sales-history--table {
  .sales-history--table-title {
    font-weight: 500;
  }
}
</style>
