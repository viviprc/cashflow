<template>
  <v-container>
      <h2 class="text-center mt-3">Resumen de venta</h2>
    <v-row>
      <v-col sm="4">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>Fecha</v-list-item-subtitle>
            <v-list-item-title>{{parseDate(currentSale.data.date)}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col sm="4">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>Medio de pago</v-list-item-subtitle>
            <v-list-item-title>{{currentSale.data.type}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col sm="4">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>Total</v-list-item-subtitle>
            <v-list-item-title>${{currentSale.data.total}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-simple-table class="mt-8">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Sku</th>
            <th class="text-left">Nombre producto</th>
            <th class="text-left">Cantidad</th>
            <th class="text-left">Precio/unidad</th>
            <th class="text-left">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in currentSale.data.products" :key="item.data.name">
            <td>{{ item.data.sku }}</td>
            <td>{{ item.data.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.data.price }}</td>
            <td>{{ item.quantity * item.data.price }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
import parseDate from '../helpers/date'
import {mapState} from 'vuex'
export default {
  name: "Detail",
  computed:{
    ...mapState(['sales']),
    currentSale(){
      return this.sales.find((sale) => sale.id === this.$route.params.id )
    }
  },
  methods:{
    parseDate
  }
 
};
</script>