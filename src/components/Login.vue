<template>
    <main class="h-screen flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
        <div class="text-center mb-6">
          <router-link to="/">
            <img src="../assets/logo/logo.svg" alt="logo" class="mx-auto mb-4" />
          </router-link>
          <h1 class="text-3xl font-semibold text-green-400">АВТОРИЗАЦИЯ</h1>
        </div>
        
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <input
              type="email"
              v-model="formData.email"
              name="email"
              placeholder="ПОЧТА"
              required
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
  
          <div class="mb-4">
            <input
              type="password"
              v-model="formData.password"
              name="password"
              placeholder="ПАРОЛЬ"
              required
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
  
          <button
            type="submit"
            class="w-full mb-2 main-btn bg-green-400 text-white"
          >
            Войти
          </button>
          <router-link to="/registration" class="underline">Зарегистрироваться</router-link>
  
          <ul v-if="validationErrors.email" class="mt-4 text-red-600">
            <li v-for="(err, index) in validationErrors.email" :key="index">{{ err }}</li>
          </ul>
        </form>
      </div>
    </main>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      validationErrors: {}
    }
  },
  methods: {
    submitForm() {
      const userStore = useUserStore()
      
      this.validationErrors = {}
      
      userStore.login(this.formData.email, this.formData.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          if (error.response?.data?.errors) {
            this.validationErrors = error.response.data.errors
          }
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}
</style>