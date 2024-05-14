<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { useLoggedStore } from '@/stores/logged'

const logged = useLoggedStore()

function logout() {
  const store = useLoggedStore()
  store.logout()
}

</script>
<template>
  <nav v-if="logged.isAuthenticated()" class="navbar navbar-expand-lg border-bottom">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">E-SUS Fake</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/medicamentos" class="nav-link">Medicamentos</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/fornecedores" class="nav-link">Fornecedores</RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <p class="me-3">Olá, {{ logged.user?.username }}, Perfil {{ logged.user?.profile }}</p>
          </li>
          <li>
            <button class="btn btn-small btn-danger" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <main class="p-4">
    <RouterView />
  </main>
</template>
