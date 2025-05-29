<template>
    <main class="h-screen flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
        <div class="text-center mb-6">
          <router-link to="/">
            <img src="../assets/logo/logo.svg" alt="logo" class="mx-auto mb-4" />
          </router-link>
          <h1 class="text-3xl font-semibold text-green-400">РЕГИСТРАЦИЯ</h1>
        </div>
        
        <form @submit.prevent="submitForm">
          <input
            type="text"
            v-model="formData.name"
            name="name"
            placeholder="ИМЯ"
            required
            class="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        <ul v-if="validationErrors.name" class="mt-4 text-red-500">
          <li v-for="(err, index) in validationErrors.name" :key="index">{{ err }}</li>
        </ul>

          <input
            type="email"
            v-model="formData.email"
            name="email"
            placeholder="ПОЧТА"
            required
            class="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        <ul v-if="validationErrors.email" class="mt-4 text-red-500">
          <li v-for="(err, index) in validationErrors.email" :key="index">{{ err }}</li>
        </ul>

          <input
            type="password"
            v-model="formData.password"
            name="password"
            placeholder="ПАРОЛЬ"
            required
            class="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            v-model="formData.password_confirmation"
            name="password_confirmation"
            placeholder="ПОВТОРИТЕ ПАРОЛЬ"
            required
            class="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <ul v-if="validationErrors.password" class="mt-4 text-red-500">
            <li v-for="(err, index) in validationErrors.password" :key="index">{{ err }}</li>
          </ul>
  
          <div class="mb-4">
            <label for="roles" class="block text-lg font-medium text-gray-700">Выберите роль</label>
            <select
              id="roles"
              v-model="formData.role"
              name="role"
              required
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="student">Ученик</option>
              <option value="teacher">Учитель</option>
            </select>
          </div>
  
          <button
            type="submit"
            class="w-full mb-2 main-btn bg-green-400 text-white"
          >
            Зарегистрироваться
          </button>
          <router-link to="/login" class="underline">Войти</router-link>
  
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
                name: '',
                email: '',
                role: 'student',
                password: '',
                password_confirmation:''
            },
            validationErrors: {}
        }
    },
    methods: {
        submitForm() {
            this.$axios.get('/sanctum/csrf-cookie')
            .then(() => {
                const token = Cookies.get('XSRF-TOKEN');
                this.$axios.post('/registration', {
                    'name': this.formData.name,
                    'email': this.formData.email,
                    'role': this.formData.role,
                    'password': this.formData.password,
                    'password_confirmation': this.formData.password_confirmation
                }, {
                    headers: {
                        'X-XSRF-TOKEN': decodeURIComponent(token)
                    }
                })
                .then(response => {
                    console.log(response);
                    this.$router.push('/');
                    
                })
                .catch(error => {
                    console.log(error);
                    this.validationErrors = error.response.data.errors;
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

form {
  max-width: 400px;
  margin: 0 auto;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>