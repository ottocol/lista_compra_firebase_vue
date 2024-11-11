<script setup>
   import {ref} from "vue"
   let props = defineProps(["inicial"])

   let valor = ref(props.inicial)
   function incrementar() {
    valor.value++
    console.log(valor.value)
   }
</script>

<template>
    <h1>{{ valor }}</h1>
    <button @click="incrementar">Incrementar</button>
</template>

