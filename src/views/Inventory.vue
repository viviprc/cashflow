<template>
  <div>
    <ProductTable />
  </div>
</template>
<script>
import ProductTable from "../components/ProductTable";
import {mapActions} from 'vuex'
export default {
  name: "Inventory",
  components: {
    ProductTable,
  },
  created(){
    this.getProducts()
  },
  methods:{
    ...mapActions(['getProducts'])
  }
};
</script>