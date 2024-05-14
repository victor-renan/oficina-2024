import { createRouter, createWebHistory } from 'vue-router'
import { useLoggedStore } from '@/stores/logged'

const router = createRouter({
  linkActiveClass: 'text-primary',
  linkExactActiveClass: 'text-primary',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    },
  ],
})

router.beforeEach((to, from, next) => {
  const logged = useLoggedStore()
  if (to.name != 'login' && !logged.isAuthenticated()) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
