<template>
  <v-container fluid class="contenedor">
    <v-row>
      <v-col
        id="col-one"
        cols="12"
        sm="7"
        class="d-flex justify-end align-content-space-around flex-wrap pr-10"
      >
        <div class="col-one">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nombre producto</th>
                  <th class="text-left">Cantidad</th>
                  <th class="text-left">Precio/unidad</th>
                  <th class="text-left">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in products" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.cantidad }}</td>
                  <td>{{ item.pu }}</td>
                  <td>{{ item.subtotal }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
        <div class="flex-column justify-end">
          <h4 class="text-right ma-3">Total $44870</h4>
          <v-btn color="success" class="ma-2" small>Finalizar</v-btn>
          <v-btn color="error" class="ma-2" small>Cancelar</v-btn>
        </div>
      </v-col>
      <v-divider class="mx-4" vertical></v-divider>
      <v-col id="col-two" cols="12" sm="4" class="justify-end">
        <div class="search">
          <v-textarea
            append-icon="mdi-magnify"
            class="mx-2"
            label="plaf"
            rows="1"
            flat
          ></v-textarea>
        </div>
        <div>
          <v-list class="pl-10" dense>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>sku</v-list-item-subtitle>
                <v-list-item-title>392</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Nombre producto</v-list-item-subtitle>
                <v-list-item-title>PLAFON LED 31 CM 12 W</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Marca</v-list-item-subtitle>
                <v-list-item-title>JUST HOME COLLECTION</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Precio</v-list-item-subtitle>
                <v-list-item-title>$18990</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Cantidad</v-list-item-subtitle>
                <v-text-field
                :value= '1'
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
              </v-list-item-content>
            </v-list-item>

            <div class="text-right ma-5 pt-10">
              
              <v-btn color="success" class="ma-2" x-small>Agregar</v-btn>
              <v-btn color="error" class="ma-2" x-small>Cancelar</v-btn>
            </div>
          </v-list>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Sale",
  data() {
    return {
      products: [
        {
          categoria: "Pinturas",
          name: "ESMALTE AL AGUA PREMIUM SATINADO AZUL LASHA",
          cantidad: 2,
          stock: 23,
          marca: "KOLOR",
          pu: 20990,
          subtotal: 41980,
        },
        {
          categoria: "Pinturas",
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
<style lang="scss">
//  .col-one{
//      border-bottom: 1px solid;
//  }
@media (max-width: 600px) {
  #col-one {
    order: 2;
  }
  #col-two {
    order: 1;
  }
}
</style>