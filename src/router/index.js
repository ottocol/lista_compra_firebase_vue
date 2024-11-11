import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import ListaCompra from '@/components/ListaCompra.vue';
import About from '@/components/About.vue';
import { auth } from '@/config/firebaseConfig';

// Definición de rutas
//cada ruta tiene asociado un path en la URL, un nombre simbólico y un componente a mostrar
const routes = [
  //en este caso si el usuario intenta ir a "/" lo mandamos a la lista de la compra
  {
    path: '/',
    redirect: {name:"Lista"}
  },
  //si la URL es "/lista", queremos mostrar el componente ListaCompra
  {
    path: '/lista',
    name: 'Lista',
    component: ListaCompra,
    //en el campo meta podemos guardar propiedades arbitrarias inventadas por nosotros
    //en este caso indicamos que el componente requiere autenticación
    //lo usamos en el beforeEach (más abajo)
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

// Crear el router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard de navegación para verificar autenticación
// este método se llama automáticamente antes de cualquier cambio de ruta
// "to" es la ruta a la que queremos ir, "from" de la que venimos
router.beforeEach((to, from) => {
  const user = auth.currentUser;  

  //si en el campo "meta" la propiedad requiresAuth es true 
  //y no hay usuario de Firebase autenticado saltamos a login
  if (to.meta.requiresAuth && !user) {
    return {name: 'Login'};
  }
});

export default router;