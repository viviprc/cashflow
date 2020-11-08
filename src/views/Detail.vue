<template>
  <v-container>
      <h2 class="text-center mt-3">Resumen de venta</h2>
    <v-row>
      <v-col sm="3">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>Fecha</v-list-item-subtitle>
            <v-list-item-title>08-11-2020 16:42</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col sm="3">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>Medio de pago</v-list-item-subtitle>
            <v-list-item-title>Transbank</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col sm="3">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>N° de documento</v-list-item-subtitle>
            <v-list-item-title>10201</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col sm="3">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>Total</v-list-item-subtitle>
            <v-list-item-title>$44870</v-list-item-title>
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
          <tr v-for="item in products" :key="item.name">
            <td>{{ item.sku }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.cantidad }}</td>
            <td>{{ item.pu }}</td>
            <td>{{ item.subtotal }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
export default {
  name: "Detail",
  data() {
    return {
      products: [
        {
          categoria: "Pinturas",
          sku: 231,
          name: "ESMALTE AL AGUA PREMIUM SATINADO AZUL LASHA",
          cantidad: 2,
          stock: 23,
          marca: "KOLOR",
          pu: 20990,
          subtotal: 41980,
        },
        {
          categoria: "Pinturas",
          sku: 232,
          name: 'SET DE PUNTAS IMPACTO #2x2" 5P',
          cantidad: 1,
          stock: 60,
          marca: "UBERMANN",
          pu: 2890,
          subtotal: 2890,
        },
      ],
    };
  },
};
</script>