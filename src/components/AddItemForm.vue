<script setup>
   import { ref } from 'vue';
   let emit = defineEmits(["add_item"])

   let nombre = ref("") 
   function do_add() {
        emit("add_item", nombre.value)
   }
</script>

<template>
  <input type="text" v-model="nombre">
  <button @click="do_add">Añadir</button>
</template>