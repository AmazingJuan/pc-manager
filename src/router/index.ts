// Own imports
import LoginView from '@views/LoginView.vue'

// Third-Party Imports
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: LoginView,
    meta: { title: 'PC Manager', subtitle: 'Gestion de Equipos TI' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
