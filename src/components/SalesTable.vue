<template>
  <v-container>
    <v-card>
      <v-card-title>
        <!-- Buscador -->
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <!-- Tabla de ventas -->
      <v-data-table
        :headers="headers"
        :items="parsedSales"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Historial de Ventas</v-toolbar-title>
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
    </v-card>
    <v-card class="my-2" v-if="isSearchValid">
      <v-card-title>Venta Total Diaria {{ search }} </v-card-title>
      <v-card-title>${{ dateTotal }}</v-card-title>
    </v-card>
    <!-- <div v-if="isSearchValid">
      <p>{{ dateTotal }}</p>
    </div> -->
  </v-container>
</template>
<script>
import ParseDate from '../helpers/date'
import { mapState, mapActions } from 'vuex'

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
  }),

  computed: {
    ...mapState(['sales']),
    orderSales() {
      return this.sales.sort(function (a, b) {
        a = new Date(a.data.date)
        b = new Date(b.data.date)
        return a > b ? -1 : a < b ? 1 : 0
      })
    },

    parsedSales() {
      return this.orderSales.map((s) => ({
        ...s,
        data: {
          ...s.data,
          date: ParseDate(s.data.date),
        },
      }))
    },
    isSearchValid() {
      return /\d{1,2}\/\d{2}\/\d{4}/.test(this.search)
    },
    dateTotal() {
      return this.isSearchValid
        ? this.parsedSales.reduce(
            (acumulado, actual) => acumulado + actual.data.total,
            0
          )
        : null
    },
  },
  methods: {
    ...mapActions(['removeSale']),
    ParseDate,
    goToDetail(item) {
      this.$router.push(`sales_history/${item.id}`)
    },
  },
}
</script>
