<template>
  <v-container fluid class="contenedor">
    <v-row justify="center">
      <!-- Modal de venta finalizada -->
      <v-dialog v-model="dialog" max-width="350">
        <v-card>
          <v-card-title> ¡Venta realizada exitosamente! </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn id="cerrar" color="green darken-1" text @click="resetSale">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row>
      <!-- Columna izquierda, muestras productos agregados a la venta -->
      <v-col
        id="col-one"
        cols="12"
        sm="7"
        class="d-flex justify-end align-stretch flex-wrap pr-10"
      >
        <div class="col-one">
          <h3 class="text-center py-3">Nueva Venta</h3>

          <!-- Tabla de ventas -->
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
                <tr v-for="(item, index) in sale" :key="getKey(item)">
                  <td>{{ item.data.name }}</td>
                  <td>
                    <v-text-field
                      :value="item.quantity"
                      @input="(qty) => changeQuantity(qty, index)"
                      solo
                      filled
                      dense
                    ></v-text-field>
                  </td>
                  <td>{{ item.data.price }}</td>
                  <td class="subtotal">
                    {{ parseInt(item.data.price, 10) * item.quantity }}
                  </td>
                  <td>
                    <v-icon @click="eliminateProduct(index)">mdi-delete</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>

        <div class="flex-column justify-end">
          <h4 id="totalSale" class="text-right ma-3">Total ${{ saleTotal }}</h4>
          <v-select
            :items="['Efectivo', 'Transbank']"
            v-model="saleType"
          ></v-select>
          <v-dialog v-model="dialog2" max-width="500">
            <!-- Prueba -->
            <v-card>
              <v-card-title>
                <span>Agregar producto a la venta</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="addProductManually.data.name"
                        label="Nombre"
                        id="nombreProducto"
                      ></v-text-field>
                      <v-text-field
                        v-model="addProductManually.data.sku"
                        label="Sku"
                        id="skuProducto"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="addProductManually.data.quantity"
                        label="Quantity"
                        id="quantityProducto"
                      ></v-text-field>
                      <v-text-field
                        v-model="addProductManually.data.price"
                        label="Price"
                        id="priceProducto"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn id="cancelar" color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn
                  id="guardar"
                  color="blue darken-1"
                  text
                  @click="addManuallyToSale"
                >
                  Agregar
                </v-btn>
              </v-card-actions>
            </v-card>
            <!-- Prueba -->
          </v-dialog>

          <v-btn
            id="agregar"
            color="warning"
            class="ma-2"
            small
            @click.stop="dialog2 = true"
            >Agregar</v-btn
          >

          <v-btn
            id="finalizar"
            color="success"
            class="ma-2"
            small
            @click="saleFinish"
            >Finalizar</v-btn
          >
          <v-btn color="error" class="ma-2" small @click="saleCancel"
            >Cancelar</v-btn
          >
        </div>
      </v-col>
      <v-divider class="mx-4" vertical></v-divider>
      <!-- Columna derecha, muestra el buscador y productos encontrados. -->
      <v-col id="col-two" cols="12" sm="4" class="justify-end">
        <!-- Buscador de productos -->
        <div class="search">
          <v-textarea
            append-icon="mdi-magnify"
            class="mx-2"
            id="buscarProducto"
            label="Buscar..."
            v-model="textFilter"
            rows="1"
            flat
          ></v-textarea>
        </div>
        <div>
          <template>
            <!-- Tabla de productos de la busqueda -->
            <v-simple-table id="tablaBusqueda">
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
                    :key="getKey(item)"
                    @click="select(item)"
                  >
                    <td>{{ item.data.name }}</td>
                    <td>{{ item.data.price }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>
          <!-- Lista con el detalle del producto seleccionado -->
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
                <v-list-item-title id="productName">{{
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
                  class="mr-15"
                  hide-details="auto"
                  v-model="selectedQuantity"
                  solo
                  filled
                  dense
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>

            <div class="text-right ma-5 pt-10">
              <v-btn
                id="agregarProducto"
                color="success"
                class="ma-2"
                x-small
                @click="addToSale"
                >Agregar</v-btn
              >
              <v-btn
                id="cancelarProducto"
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
      dialog: false,
      search: "",
      selectedQuantity: 1,
      editQuantity: this.selectedQuantity,
      selectedProduct: null,
      sale: [],
      filterArray: [],
      saleType: "Efectivo",
      dialog2: false,
      addProductManually: {
        data: {
          name: "",
          sku: "10000",
          quantity: 1,
          price: "",
          trademark: "Generico",
        },
      },
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    ...mapActions(["getProducts", "addSale"]),
    getKey(item) {
      return `${item.data.name}${item.data.sku}`;
    },
    select(item) {
      this.selectedProduct = item;
    },
    addToSale() {
      const quantity = parseInt(this.selectedQuantity, 10);
      this.sale.push({ ...this.selectedProduct, quantity });
      this.search = "";
      this.selectedProduct = "";
      this.filterArray = [];
    },
    addManuallyToSale() {
      this.sale.push({
        data: {
          ...this.addProductManually.data,
          price: parseInt(this.addProductManually.data.price),
        },
        quantity: parseInt(this.addProductManually.data.quantity),
      });
      this.close();
    },
    eliminateProduct(index) {
      this.sale.splice(index, 1);
    },
    saleCancel() {
      this.sale = [];
    },
    saleFinish() {
      (this.dialog = true),
        this.addSale({
          type: this.saleType,
          products: this.sale,
          total: this.saleTotal,
        });
    },
    resetSale() {
      (this.dialog = false),
        (this.search = ""),
        (this.selectedProduct = ""),
        (this.filterArray = []),
        (this.sale = []);
    },
    changeQuantity(quantity, index) {
      const validQuantity = quantity === "" ? "0" : quantity;
      this.sale[index].quantity = parseInt(validQuantity);
    },
    close() {
      this.dialog2 = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  computed: {
    ...mapState(["products"]),
    textFilter: {
      get() {
        return this.search;
      },
      set(value) {
        value = value.toUpperCase();
        const terms = value.split(" ");

        this.filterArray = value
          ? this.products.filter(
              (p) =>
                terms.reduce(
                  (isMatch, term) => isMatch && p.data.name.includes(term),
                  true
                ) || p.data.sku.toString().indexOf(value) !== -1
            )
          : [];
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
.v-text-field.v-text-field--solo .v-input__control input {
  width: 30px;
}
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  width: 40px;
}
@media (max-width: 600px) {
  #col-one {
    order: 2;
  }
  #col-two {
    order: 1;
  }
}
</style>