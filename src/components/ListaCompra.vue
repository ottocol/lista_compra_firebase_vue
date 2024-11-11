<script setup>
   import { logout } from '@/services/authService';
   import { reactive } from 'vue';
   import AddItemForm from './AddItemForm.vue';
   import { addItem, getItems, deleteItem, setItemComprado } from '@/repositories/listaRepository';
   import { onMounted } from 'vue';
   import Lista from './Lista.vue';

   let estado = reactive({items:[]})
   
   onMounted(async function() {
        estado.items = await getItems()
   })

   async function do_logout() {
      await logout()
   }

   async function do_add_item(nombre) {
    try {
        let obj = await addItem(nombre)
        estado.items.push(obj)
    }
    catch(error) {
        alert(error.message)
    }

   }

   async function do_delete(id) {
        //backend
        await deleteItem(id)
        //frontend
        let pos = estado.items.findIndex((i)=>i.id==id)
        if (pos>-1) {
            estado.items.splice(pos,1)
        }

   }

   async function do_switch(id) {
      let obj = estado.items.find((item)=>item.id==id)
      if (obj) {
        let nuevo = !obj.comprado
        //backend
        await setItemComprado(id, nuevo)
        //frontend
        obj.comprado = nuevo
      }
   }


</script>

<template>
    <h2>Lista de la compra</h2>
    <add-item-form @add_item="do_add_item"/>
    <lista :items="estado.items" @delete_item="do_delete" @switch_item="do_switch"/>
    <button @click="do_logout">Salir</button>
</template>