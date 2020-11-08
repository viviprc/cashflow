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
        :items="products"
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
                          v-model="editedItem.categoria"
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
                          v-model="editedItem.marca"
                          label="Marca"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.precio"
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
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
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
      { text: "Categoria", value: "categoria" },
      { text: "Sku", value: "sku" },
      { text: "Stock", value: "stock" },
      { text: "Marca", value: "marca" },
      { text: "Precio", value: "precio" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      sku: 0,
      stock: 0,
      marca: 0,
      precio: 0,
    },
    defaultItem: {
      name: "",
      sku: 0,
      stock: 0,
      marca: 0,
      precio: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Agregar producto" : "Editar Producto";
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

  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.products = [
        {
          categoria: "Pinturas",
          name: "MARTILLO STHT51391-40",
          sku: 159,
          stock: 50,
          marca: "STANLEY",
          precio: 8290,
        },
        {
          categoria: "Pinturas",
          name: "ESMALTE AL AGUA PREMIUM SATINADO AZUL LASHA",
          sku: 237,
          stock: 23,
          marca: "KOLOR",
          precio: 20990,
        },
        {
          categoria: "Pinturas",
          name: 'SET DE PUNTAS IMPACTO #2x2" 5P',
          sku: 262,
          stock: 60,
          marca: "UBERMANN",
          precio: 2890,
        },
        {
          categoria: "Pinturas",
          name: "MONOMANDO FLEXIBLE PARA LAVAPLATOS NEGRO",
          sku: 305,
          stock: 15,
          marca: "SENSI DACQUA",
          precio: 29990,
        },
        {
          categoria: "Pinturas",
          name: "2 x 2 x 3,20 M PINO DIMENSIONADO VERDE",
          sku: 356,
          stock: 50,
          marca: "GENERICO",
          precio: 1210,
        },
        {
          categoria: "Pinturas",
          name: "1 x 6 x 3,20 M PINO DIMENSIONADO VERDE",
          sku: 375,
          stock: 32,
          marca: "GENERICO",
          precio: 2290,
        },
        {
          categoria: "Pinturas",
          name: "PLAFON LED 31 CM 12 W",
          sku: 392,
          stock: 10,
          marca: "JUST HOME COLLECTION",
          precio: 18990,
        },
        {
          categoria: "Pinturas",
          name: "ASIENTO WC REDONDO PLASTICO BLANCO",
          sku: 408,
          stock: 36,
          marca: "FANALOZA",
          precio: 12490,
        },
        {
          categoria: "Pinturas",
          name: "CERRADURA DORMITORIO BOLA BRONCE ENVEJECIDO FX",
          sku: 452,
          stock: 32,
          marca: "FIXSER",
          precio: 9990,
        },
        {
          categoria: "Pinturas",
          name: "ADHESIVO CERAMICO EN POLVO STANDARD 25 KG",
          sku: 518,
          stock: 48,
          marca: "BEKRON",
          precio: 2490,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.products.splice(this.editedIndex, 1);
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
      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        this.products.push(this.editedItem);
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