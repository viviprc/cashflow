<template>
  <div class="productTable">
    <div class="search">
      <v-card-title class="d-flex justify-center mx-13">
        Buscador
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
          class="pb-10"
        ></v-text-field>
      </v-card-title>
    </div>
    <v-divider></v-divider>
    <!-- incicio de tabla -->
    <v-container>
      <v-data-table
        dense
        :headers="headers"
        :items="tableProducts"
        :search="search"
        sort-by="stock"
        class="elevation-1 mt-5"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Inventario</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <!-- Boton para agregar producto -->
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  AGREGAR PRODUCTO
                </v-btn>
                <!-- Fin botón para agregar producto -->
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Nombre"
                        ></v-text-field>
                        <v-text-field
                          v-model="editedItem.category"
                          label="Categoria"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.sku"
                          label="Sku"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.stock"
                          label="Stock"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.trademark"
                          label="Marca"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.price"
                          label="Precio"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Estás seguro de eliminar este producto?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ProducTable",
  data() {
    return {
      search: "",
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Nombre Producto",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Categoria", value: "category" },
        { text: "Sku", value: "sku" },
        { text: "Stock", value: "stock" },
        { text: "Marca", value: "trademark" },
        { text: "Precio", value: "price" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        sku: 0,
        stock: 0,
        trademark: 0,
        price: 0,
      },
      defaultItem: {
        name: "",
        sku: 0,
        stock: 0,
        trademark: 0,
        price: 0,
      },
    };
  },

  computed: {
    ...mapState(["products"]),
    formTitle() {
      return this.editedIndex === -1 ? "Agregar producto" : "Editar Producto";
    },
    tableProducts() {
      return this.products.map((p) => p.data);
    },
    productId() {
      return this.products.map((p) => p.id);
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    ...mapActions([
      "getProducts",
      "addProduct",
      "removeProduct",
      "updateProduct",
    ]),

    editItem(item) {
      this.editedIndex = this.tableProducts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.tableProducts.indexOf(item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const id = this.products[this.editedIndex].id;
      this.removeProduct(id);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      const parsedItem = {
        ...this.editedItem,
        price: parseInt(this.editedItem.price, 10),
        stock: parseInt(this.editedItem.stock, 10),
      };
      if (this.editedIndex > -1) {
        const idProduct = this.products[this.editedIndex].id;
        this.updateProduct({ id: idProduct, data: this.parsedItem });
      } else {
        this.addProduct(this.parsedItem);
      }
      this.close();
    },
  },
};
</script>
<style lang="scss">
.productTable {
  background-color: #f4f7f9;
}
.search {
  background-color: white;
  -webkit-box-shadow: rgba(0, 0, 0, 0.15) 0 1px 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  color: #616161;
}
</style>