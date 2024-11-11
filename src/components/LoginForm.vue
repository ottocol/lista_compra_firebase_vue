<script setup>
    import { reactive } from 'vue';
    import { login } from '@/services/authService';

    let estado = reactive({email:"", password:""})

    async function do_login(){
        try {
            await login(estado.email, estado.password)
        }
        catch(error) {
            alert(error.message)
        }
    }
</script>

<template>
    <form id="login-form" @submit.prevent="do_login" >
        <h2>Iniciar sesión</h2>
        <label for="email">Correo electrónico:</label>
        <input type="email" name="email" v-model="estado.email" required>
        
        <label for="password">Contraseña:</label>
        <input type="password" name="password" v-model="estado.password" required>
        
        <button type="submit">Iniciar sesión</button>
    </form>
    <!-- un enlace gestionado por el router -->
    <RouterLink to="/about">
        Acerca de la app
    </RouterLink>  
</template>