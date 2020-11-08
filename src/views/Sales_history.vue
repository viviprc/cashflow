<template>
<v-container>
  <h2 class="text-center pa-3">Historial de ventas</h2>
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Fecha</th>
          <th class="text-left">Modo de pago</th>
          <th class="text-left">N° Documento</th>
          <th class="text-left">Total</th>
          <th class="text-left">Detalle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sales" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.pay }}</td>
          <td>{{ item.document }}</td>
          <td>{{ item.sum }}</td>
           <td><router-link :to="`sales_history/${item.id}`"><v-icon>mdi-magnify</v-icon></router-link> </td>
          
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <div>
    <v-divider></v-divider>
    <h3 class="text-right pa-15">TOTAL: 44870</h3>
  
  </div>

</v-container>
</template>
<script>
export default {
  data() {
    return {
      sales: [
        {
          id: 1,
          date: '08 - 11 - 2020, 12:40',
          pay: "Transbank",
          document: '100200',
          sum: 23880,
        },
        {
          id: 2,
          date: '08 - 11 - 2020, 13:22',
          pay: "Efectivo",
          document: '100201',
          sum: 20990,
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.container{
  color: #616161;
}
  
</style>