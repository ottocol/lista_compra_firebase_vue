<script setup>
  import {computed} from 'vue'

  let props = defineProps(["id", "nombre", "comprado", "uid"])
  defineEmits(["delete_item", "switch_item"])
  let estilo = computed(()=>props.comprado?"tachado":"")
</script>

<template>
    <!-- también vale :class="{tachado:comprado}"-->
    <span :class="estilo" @click="$emit('switch_item', id)">{{ nombre }} </span>
    <button @click="$emit('delete_item', id)">Eliminar</button>
</template>

<style scoped>
    .tachado {
        text-decoration: line-through;
        color: lightgrey;
    }
</style>