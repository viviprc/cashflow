<template>
  <!-- Carrusel de productos, vista Login -->
  <div id="app">
    <v-carousel :show-arrows="false" cycle height="100%" hide-delimiters>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  name: 'Carousel',
  data() {
    return {
      items: [
        {
          src:
            'https://trucoslondres.com/wp-content/uploads/2017/04/Sin-nombre.png',
        },
        {
          src: 'https://www.yolito.cl/Regular_Adds/longPictures/ferre1big.jpg',
        },
        {
          src:
            'https://www.madera21.cl/wp-content/uploads/2020/04/pine-timber-pinesawmills-co-nz.jpg?x81539',
        },
      ],
    }
  },
}
</script>
