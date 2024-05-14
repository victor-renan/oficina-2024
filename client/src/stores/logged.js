import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'
import { useRouter } from 'vue-router'

export const useLoggedStore = defineStore('logged', () => {
  const user = ref(JSON.parse(localStorage.getItem('logged')))

  const router = useRouter()

  function isAuthenticated() {
    return user.value != null
  }

  function login(token, payload) {
    user.value = payload

    localStorage.setItem('token', token)
    localStorage.setItem('logged', JSON.stringify(payload))
    router.replace({ path: '/' })
  }

  function logout() {
    user.value = null

    localStorage.removeItem('token')
    localStorage.removeItem('logged')
    router.replace({ path: '/login' })
  }

  async function isValid(username, password) {
    await api.post('/auth/verify', { token: localStorage.getItem('token') })
  }

  return { user, login, isAuthenticated, isValid, logout }
})
