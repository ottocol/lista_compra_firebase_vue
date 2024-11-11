<script setup>
  //import Contador from './components/Contador.vue';
  import ListaCompra from '@/components/ListaCompra.vue';
  import LoginForm from './components/LoginForm.vue';
  import { auth } from './config/firebaseConfig';
  import { ref } from 'vue';
  import { RouterLink, RouterView, useRouter } from 'vue-router';


  let hay_login = ref(false)
  const router = useRouter()

  auth.onAuthStateChanged((user)=>{
     hay_login.value = (user!=null)
     console.log("on auth state changed ", user)
     if (hay_login.value) {
      router.push('/');
    } else {
      router.push('/login');
    }
  })

</script>

<template>
  <!-- mostrar "lo que diga el router" para la ruta actual -->
  <RouterView />
</template>