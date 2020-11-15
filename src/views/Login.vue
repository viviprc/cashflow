<template>
  <v-container class="d-flex justify-center">
    <Carousel style="position: absolute" />
    <v-overlay :value="overlay" :z-index="zIndex"></v-overlay>
    <v-card elevation="1" outlined width="400" class="mt-13 pa-8">
      <v-card-title>Ingresa a tu cuenta</v-card-title>
      <v-form ref="form" lazy-validation class="pa-3">
        <v-text-field v-model="email" label="E-mail"></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          name="input-10-2"
          label="Visible"
          hint="At least 8 characters"
          value=""
          class="input-group--focused"
          @click:append="show2 = !show2"
        ></v-text-field>

        <div class="text-center">
          <v-btn color="success" class="mt-5" @click="login">
            Iniciar sesión
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/auth'
import Carousel from "../components/Carousel";
export default {
  name: "Login",
  components: {
    Carousel,
  },
  data() {
    return {
      email: "",
      password: "",
      show2: true,
      overlay: true,
      zIndex: 0,
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (accept) => {
            this.$router.push("Inventory");
          },
          (reject) => alert('error')
        );
    },
  },
};
</script>
