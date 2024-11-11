<script setup>
  //import Contador from './components/Contador.vue';
  import ListaCompra from '@/components/ListaCompra.vue';
  import LoginForm from './components/LoginForm.vue';
  import { auth } from './config/firebaseConfig';
  import { ref } from 'vue';

  let hay_login = ref(false)
  auth.onAuthStateChanged((user)=>{
     hay_login.value = (user!=null)
     console.log("on auth state changed ", user)
  })

</script>

<template>
  <login-form v-if="!hay_login"/>
  <lista-compra v-else/>
</template>