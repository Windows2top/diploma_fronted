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
import Cookies from 'js-cookie';
export default {
    data() {
        return {
            formData: {
                email: '',
                password: ''
            },
            validationErrors: {},
        }
    },
    methods: {
        submitForm() {
            this.$axios.get('https://api.arch-pc.ru/sanctum/csrf-cookie')
            .then(() => {
                const token = Cookies.get('XSRF-TOKEN');
                this.$axios.post('https://api.arch-pc.ru/login', {
                    'email': this.formData.email,
                    'password': this.formData.password
                }, {
                    headers: {
                        'X-XSRF-TOKEN': decodeURIComponent(token)
                    }
                })
                .then(response => {
                    localStorage.setItem('sanctum_token', response.data.token);
                    this.$router.push('/');
                })
                .catch(error => {
                    this.validationErrors = error.response.data.errors;
                    console.log(error);
                })
            })
            .catch(error => {
                console.log(error);
            });
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