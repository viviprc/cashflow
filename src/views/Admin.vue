<template>
  <v-container>
    <!-- Tabla de usuarios -->
    <v-data-table :headers="headers" :items="usersTable" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn id="agregarUsuario" color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Agregar usuario
              </v-btn>
            </template>
            <!-- Card para editar rol de usuarios -->
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text >
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        id="nombreUsuario"
                        v-model="editedItem.name"
                        label="Nombre"
                        :disabled="editedIndex > -1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        id="emailUsuario"
                        v-model="editedItem.email"
                        label="E-mail"
                        :disabled="editedIndex > -1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="editedIndex === -1">
                      <v-text-field
                        id="claveUsuario"
                        v-model="editedItem.password"
                        label="Contraseña"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-select id="rolUsuario" :items="items" v-model="editedItem.role" label="Roles"></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn id="guardarUsuario" color="blue darken-1" text @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Admin",
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      items: ["seller", "admin", "none"],
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Email", value: "email" },
        { text: "Rol", value: "role" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        password: '',
        role: '',
      },
      defaultItem: {
        name: '',
        email: '',
        password: '',
        role: '',
      },
    };
  },

  computed: {
    ...mapState("Users", ["users"]),
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Usuario" : "Editar Usuario";
    },
    usersTable() {
      return this.users.map((u) => u.data);
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
    ...mapActions("Users", ["addUser", "updateUser"]),

    editItem(item) {
      this.editedIndex = this.usersTable.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        const idUser = this.users[this.editedIndex].id;
        this.updateUser({ id: idUser, data: this.editedItem });
      } else {
        this.addUser(this.editedItem);
      }
      this.close();
    },
  },
};
</script>