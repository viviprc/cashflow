<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="parsedSales"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Historial de Ventas</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Quieres eliminar definitivamente esta venta de tu
                  historial?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
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
          <v-icon small class="mr-8" @click="goToDetail(item)">
            mdi-eye-plus
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
import ParseDate from "../helpers/date";
import { mapState, mapActions } from "vuex";

export default {
  name: "SalesTable",
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Fecha",
        align: "start",
        sortable: true,
        value: "data.date",
      },
      { text: "Modo de pago", value: "data.type" },
      { text: "Total", value: "data.total" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    ...mapState(["sales"]),
    parsedSales() {
      return this.sales.map((s) => ({
        ...s,
        data: {
          ...s.data, 
          date: ParseDate(s.data.date)
        }
      }));
    },
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    ...mapActions(["removeSale"]),
    ParseDate,

    deleteItem(item) {
      this.editedIndex = this.sales.indexOf(item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const id = this.sales[this.editedIndex].id;
      this.removeSale(id);
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    goToDetail(item) {
      this.$router.push(`sales_history/${item.id}`);
    },
  },
};
</script>