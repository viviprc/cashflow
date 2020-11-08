<template>
  <v-container class="d-flex justify-center">
    <Carousel style="position:absolute"/>
     <v-overlay :value="overlay" :z-index="zIndex"></v-overlay>
    <v-card elevation="1" outlined width="400" class="mt-13 pa-8">
        <v-card-title>Ingresa a tu cuenta</v-card-title>
      <v-form ref="form" lazy-validation class="pa-3">
        <v-text-field
          label="E-mail"
        ></v-text-field>
        <v-text-field
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            name="input-10-1"
            label="Contraseña"
            hint="At least 8 characters"
            counter
          ></v-text-field>
          <div class="text-center">
              <v-btn
          color="success"
          class="mt-5"
          
        >
          Iniciar sesión
        </v-btn>
          </div>


        

      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import Carousel from '../components/Carousel'
export default {
  name: "Login",
  components:{
    Carousel
  }, data(){
    return{
      overlay: true,
      zIndex: 0
    }
  }
};
</script>
