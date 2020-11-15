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
                  <th class="text-left">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in sale" :key="item.data.name">
                  <td>{{ item.data.name }}</td>
                  <td><v-text-field :value="item.quantity" @input="(qty) => changeQuantity(qty, index)"></v-text-field></td>
                  <td>{{ item.data.price }}</td>
                  <td>{{ parseInt(item.data.price, 10) * item.quantity }}</td>
                  <td><v-icon @click="eliminateProduct(index)">mdi-delete</v-icon></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
        <div class="flex-column justify-end">
          <h4 class="text-right ma-3">Total ${{saleTotal}}</h4>
          <v-select :items="['Efectivo', 'Transbank']" v-model="saleType"></v-select>
          <v-btn color="success" class="ma-2" small @click="saleFinish">Finalizar</v-btn>
          <v-btn color="error" class="ma-2" small @click="saleCancel">Cancelar</v-btn>
        </div>
      </v-col>
      <v-divider class="mx-4" vertical></v-divider>
      <v-col id="col-two" cols="12" sm="4" class="justify-end">
        <div class="search">
          <v-textarea
            append-icon="mdi-magnify"
            class="mx-2"
            label="Buscar..."
            v-model="textFilter"
            rows="1"
            flat
          ></v-textarea>
        </div>
        <div>
          <template>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Nombre</th>
                    <th class="text-left">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in filterArray"
                    :key="item.data.name"
                    @click="select(item)"
                  >
                    <td>{{ item.data.name }}</td>
                    <td>{{ item.data.price }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>

          <v-list v-if="selectedProduct" class="pl-10" dense>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>sku</v-list-item-subtitle>
                <v-list-item-title>{{
                  selectedProduct.data.sku
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Nombre producto</v-list-item-subtitle>
                <v-list-item-title>{{
                  selectedProduct.data.name
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Marca</v-list-item-subtitle>
                <v-list-item-title>{{
                  selectedProduct.data.trademark
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Precio</v-list-item-subtitle>
                <v-list-item-title>{{
                  selectedProduct.data.price
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-subtitle>Cantidad</v-list-item-subtitle>
                <v-text-field
                  hide-details="auto"
                  v-model="selectedQuantity"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>

            <div class="text-right ma-5 pt-10">
              <v-btn color="success" class="ma-2" x-small @click="addToSale"
                >Agregar</v-btn
              >
              <v-btn
                color="error"
                class="ma-2"
                x-small
                @click="selectedProduct = null"
                >Cancelar</v-btn
              >
            </div>
          </v-list>
        </div></v-col
      ></v-row
    ></v-container
  >
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Sale",
  data() {
    return {
      search: "",
      selectedQuantity: 1,
      editQuantity: this.selectedQuantity,
      selectedProduct: null,
      sale: [],
      filterArray: [],
      saleType: 'Efectivo',
      // products: [
      //   {
      //     categoria: "Pinturas",
      //     name: "ESMALTE AL AGUA PREMIUM SATINADO AZUL LASHA",
      //     cantidad: 2,
      //     stock: 23,
      //     marca: "KOLOR",
      //     pu: 20990,
      //     subtotal: 41980,
      //   },
      //   {
      //     categoria: "Pinturas",
      //     name: 'SET DE PUNTAS IMPACTO #2x2" 5P',
      //     cantidad: 1,
      //     stock: 60,
      //     marca: "UBERMANN",
      //     pu: 2890,
      //     subtotal: 2890,
      //   },
      // ],
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    ...mapActions(["getProducts", "addSale"]),
    select(item) {
      this.selectedProduct = item;
    },
    addToSale() {
      const quantity = parseInt(this.selectedQuantity, 10);
      this.sale.push({ ...this.selectedProduct, quantity }); 
    },
    eliminateProduct(index){
      this.sale.splice(index, 1)
    },
    saleCancel(){
      this.sale = []
    },
    saleFinish(){
      this.addSale({type:this.saleType, products: this.sale, total: this.saleTotal})
    },
    changeQuantity(quantity, index){
      const validQuantity = quantity === '' ? '0' : quantity
      this.sale[index].quantity = parseInt(validQuantity)
    }
  },
  computed: {
    ...mapState(["products"]),
    textFilter: {
      get() {
        return this.search;
      },
      set(value) {
        value = value.toUpperCase();
        this.filterArray = this.products.filter(
          (p) =>
            p.data.name.indexOf(value) !== -1 ||
            p.data.sku.indexOf(value) !== -1
        );
        this.search = value;
      },
    },
    saleTotal() {
      return this.sale.reduce(
        (acumulado, actual) => acumulado + actual.data.price * actual.quantity,
        0
      );
    },
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