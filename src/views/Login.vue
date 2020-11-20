<template>
  <v-container class="d-flex justify-center">
    <Carousel style="position: absolute" />
    <v-overlay :value="overlay" :z-index="zIndex"></v-overlay>
    <v-card elevation="1" outlined width="400" class="mt-13 pa-8">
      <!-- Formulario para loguearse -->
      <v-card-title>Ingresa a tu cuenta</v-card-title>
      <v-form ref="form" lazy-validation class="pa-3">
        <v-text-field v-model="email" label="E-mail"></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Normal with hint text"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
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
import "firebase/auth";
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
      show1: false,
      overlay: true,
      zIndex: 0,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `El email y contraseña que ingresaste no coinciden`,
      },
    };
  },
  computed:{
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (accept) => {
            this.$router.push("Sale");
          },
          (reject) => alert("error")
        );
    },
  },
};
</script>
