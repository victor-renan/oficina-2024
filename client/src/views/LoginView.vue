<script setup>
import { ref } from 'vue'
import api from '@/api'
import { useLoggedStore } from '@/stores/logged'

const credentials = ref({
    username: null,
    password: null
})

const logged = useLoggedStore()

async function login() {
    const { username, password } = credentials.value
    if (!username || !password) {
        alert("Credenciais faltando!")
        return
    }
    api.post('/auth/login/', { username, password })
        .then((res) => {
            const { token, payload } = res.data
            logged.login(token, payload)
        }).catch((err) => {
            alert(err.response.data)
        })
}

</script>

<template>
    <div class="container-sm">
        <form class="form" @submit.prevent="login">
            <h1>E-SUS Fake Login</h1>
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input v-model="credentials.username" class="form-control" id="username"
                    placeholder="Digite o username">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Email address</label>
                <input v-model="credentials.password" type="password" class="form-control" id="password"
                    placeholder="Digite a senha">
            </div>
            <button class="btn btn-primary" type="submit">Efetuar Login</button>
        </form>
    </div>
</template>